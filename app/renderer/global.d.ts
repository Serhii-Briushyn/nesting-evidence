export {};

declare global {
  interface Window {
    env?: { isDesktop?: boolean };
    api?: {
      saveBytes: (
        suggestedName: string,
        data: Uint8Array | ArrayBuffer | number[]
      ) => Promise<{ saved: boolean; path: string | null; error?: string }>;
    };
  }
}
