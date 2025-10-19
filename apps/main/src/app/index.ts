import { app, BrowserWindow, dialog, shell } from "electron";
import { autoUpdater } from "electron-updater";
import path from "node:path";
import url from "node:url";

import { registerIpcHandlers } from "./ipc/register";

let win: BrowserWindow | null = null;
const isDev = !!process.env.VITE_DEV_SERVER_URL;

function createWindow() {
  win = new BrowserWindow({
    width: 1200,
    height: 800,
    minWidth: 1000,
    minHeight: 600,
    backgroundColor: "#111827",
    autoHideMenuBar: true,
    webPreferences: {
      contextIsolation: true,
      sandbox: true,
      nodeIntegration: false,
      webSecurity: true,
      preload: path.resolve(__dirname, "../../preload/dist/index.cjs"),
    },
  });

  if (isDev) {
    win.loadURL(process.env.VITE_DEV_SERVER_URL!);
  } else {
    const indexHtml = path.resolve(__dirname, "../../renderer/dist/index.html");
    win.loadURL(url.pathToFileURL(indexHtml).toString());
  }

  win.webContents.setWindowOpenHandler(({ url: target }) => {
    shell.openExternal(target);
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

function setupAutoUpdater() {
  autoUpdater.autoDownload = true;

  autoUpdater.on("checking-for-update", () => {
    console.log("[update] Checking for updates…");
  });

  autoUpdater.on("update-available", (info) => {
    console.log(`[update] Update available: ${info.version}`);
  });

  autoUpdater.on("update-not-available", (info) => {
    console.log(`[update] No updates. Current version: ${info.version}`);
  });

  autoUpdater.on("download-progress", (p) => {
    if (win) win.setProgressBar(p.percent / 100);
  });

  autoUpdater.on("error", (err) => {
    console.error("[update] Error:", err);
    dialog.showMessageBox({
      type: "error",
      title: "Update error",
      message: "Failed to check or download updates.",
      detail: String(err),
    });
    if (win) win.setProgressBar(-1);
  });

  autoUpdater.on("update-downloaded", async (info) => {
    if (win) win.setProgressBar(-1);
    const res = await dialog.showMessageBox({
      type: "info",
      buttons: ["Restart now", "Later"],
      defaultId: 0,
      cancelId: 1,
      title: "Update ready",
      message: `Version ${info.version} has been downloaded.`,
      detail: "Restart the app to install the update.",
    });
    if (res.response === 0) {
      autoUpdater.quitAndInstall();
    }
  });

  autoUpdater.checkForUpdatesAndNotify();
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
  registerIpcHandlers();
  createWindow();

  if (!isDev) {
    setupAutoUpdater();
  } else {
    console.log("[update] Skipped in dev mode");
  }
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
