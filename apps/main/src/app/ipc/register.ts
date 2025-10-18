import { dialog, ipcMain } from "electron";
import { promises as fs } from "node:fs";

export function registerIpcHandlers() {
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
        if (data instanceof Uint8Array) buf = Buffer.from(data);
        else if (data instanceof ArrayBuffer)
          buf = Buffer.from(new Uint8Array(data));
        else if (Array.isArray(data)) buf = Buffer.from(Uint8Array.from(data));
        else throw new Error("Unsupported data type for save-bytes");

        await fs.writeFile(filePath, buf);
        return { saved: true, path: filePath };
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : String(err);
        return { saved: false, path: null, error: message };
      }
    }
  );
}
