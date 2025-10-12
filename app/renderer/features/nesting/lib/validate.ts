import { AppError } from "./errors";
import { MSG_ENTER_NESTING, MSG_MISSING_MATERIAL } from "./messages";

import type { ScanParsed } from "../types/scan";

export function validateBeforeSave(
  nesting: string,
  material: ScanParsed | null
) {
  if (!nesting || !nesting.trim()) throw new AppError(MSG_ENTER_NESTING);
  if (!material) throw new AppError(MSG_MISSING_MATERIAL);
}

export const normalizeNestingNumber = (s: string) =>
  String(Number(String(s).replace(/\D+/g, "")));
