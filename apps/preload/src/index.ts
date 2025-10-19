import { contextBridge, ipcRenderer } from "electron";
import type { PreloadApi, PreloadEnv } from "@ipc/preload-api";

const api: PreloadApi = {
  saveBytes: (suggestedName, data) =>
    ipcRenderer.invoke("save-bytes", { suggestedName, data }),
};

contextBridge.exposeInMainWorld("api", api);
contextBridge.exposeInMainWorld("env", {
  isDesktop: true,
} satisfies PreloadEnv);

declare global {
  interface Window {
    api: PreloadApi;
    env: Partial<PreloadEnv>;
  }
}
