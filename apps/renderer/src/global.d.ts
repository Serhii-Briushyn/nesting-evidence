import type { PreloadApi, PreloadEnv } from "@ipc/preload-api";

export {};
declare global {
  interface Window {
    api?: PreloadApi;
    env?: Partial<PreloadEnv>;
  }
}
