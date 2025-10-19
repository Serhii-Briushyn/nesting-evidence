export type SaveBytesResult = {
  saved: boolean;
  path: string | null;
  error?: string;
};

export interface PreloadApi {
  saveBytes: (
    suggestedName: string,
    data: Uint8Array | ArrayBuffer | number[]
  ) => Promise<SaveBytesResult>;
}

export interface PreloadEnv {
  isDesktop: boolean;
}
