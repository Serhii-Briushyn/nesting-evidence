import { app, BrowserWindow, shell, dialog, ipcMain } from "electron";
import * as path from "node:path";
import * as url from "node:url";
import { promises as fs } from "node:fs";

const isDev = !!process.env.VITE_DEV_SERVER_URL;

let win: BrowserWindow | null = null;

function createWindow() {
  win = new BrowserWindow({
    width: 1200,
    height: 800,
    minWidth: 1000,
    minHeight: 700,
    backgroundColor: "#111827",
    autoHideMenuBar: true,
    webPreferences: {
      contextIsolation: true,
      sandbox: true,
      nodeIntegration: false,
      webSecurity: true,
      preload: path.join(__dirname, "preload.js"),
    },
  });

  if (isDev) {
    win.loadURL(process.env.VITE_DEV_SERVER_URL!);
  } else {
    const indexHtml = path.join(__dirname, "../renderer/dist/index.html");
    win.loadFile(indexHtml);
  }

  win.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url);
    return { action: "deny" };
  });

  win.webContents.on("will-navigate", (e, targetUrl) => {
    const parsed = url.parse(targetUrl);
    const isLocalDev =
      isDev && targetUrl.startsWith(process.env.VITE_DEV_SERVER_URL!);
    const isFile = parsed.protocol === "file:";
    if (!isLocalDev && !isFile) {
      e.preventDefault();
      shell.openExternal(targetUrl);
    }
  });

  win.on("closed", () => (win = null));
}

const gotLock = app.requestSingleInstanceLock();
if (!gotLock) {
  app.quit();
} else {
  app.on("second-instance", () => {
    if (win) {
      if (win.isMinimized()) win.restore();
      win.focus();
    }
  });
}

app.whenReady().then(() => {
  ipcMain.handle(
    "save-bytes",
    async (
      _e,
      args: {
        suggestedName?: string;
        data: number[] | ArrayBuffer | Uint8Array;
      }
    ) => {
      try {
        const { suggestedName = "export.xlsx", data } = args ?? {};
        const { canceled, filePath } = await dialog.showSaveDialog({
          defaultPath: suggestedName,
          filters: [
            { name: "Excel", extensions: ["xlsx"] },
            { name: "All Files", extensions: ["*"] },
          ],
        });
        if (canceled || !filePath) return { saved: false, path: null };

        let buf: Buffer;
        if (data instanceof Uint8Array) {
          buf = Buffer.from(data);
        } else if (data instanceof ArrayBuffer) {
          buf = Buffer.from(new Uint8Array(data));
        } else if (Array.isArray(data)) {
          buf = Buffer.from(Uint8Array.from(data));
        } else {
          throw new Error("Unsupported data type for save-bytes");
        }

        await fs.writeFile(filePath, buf);
        return { saved: true, path: filePath };
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : String(err);
        return { saved: false, path: null, error: message };
      }
    }
  );

  createWindow();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
