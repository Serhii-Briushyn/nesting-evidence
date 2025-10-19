import type { ScanParsed } from "../types/scan";

export const keyOf = (p: ScanParsed) =>
  `${p.materialId}|${p.sourceNestingId ?? ""}|${p.thickness}x${p.width}x${
    p.length
  }`;
