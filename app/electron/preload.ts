import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("env", { isDesktop: true });

contextBridge.exposeInMainWorld("api", {
  saveBytes: (
    suggestedName: string,
    data: Uint8Array | ArrayBuffer | number[]
  ) =>
    ipcRenderer.invoke("save-bytes", { suggestedName, data }) as Promise<{
      saved: boolean;
      path: string | null;
      error?: string;
    }>,
});
