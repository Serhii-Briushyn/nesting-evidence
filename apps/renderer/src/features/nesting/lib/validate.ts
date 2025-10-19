import { AppError } from "./errors";
import { MSG_NEED_NUM, MSG_NO_MAT } from "./messages";

import type { ScanParsed } from "../types/scan";

export function validateBeforeSave(
  nesting: string,
  material: ScanParsed | null
) {
  const n = normalizeNestingId(nesting);
  if (!n) throw new AppError(MSG_NEED_NUM);
  if (!material) throw new AppError(MSG_NO_MAT);
}

export const normalizeNestingId = (s: string) =>
  String(s ?? "")
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, "");
