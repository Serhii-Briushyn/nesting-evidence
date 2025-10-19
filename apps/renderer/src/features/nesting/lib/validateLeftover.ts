import { AppError } from "./errors";
import {
  MSG_LAST4,
  MSG_NEED_ASSIGN,
  MSG_NUM_MISMATCH,
  MSG_ONLY_LHM,
} from "./messages";
import { normalizeNestingId } from "./validate";
import { getHM, getLast4 } from "./parse";

import type { ScanParsed } from "../types/scan";

export function validateLeftover(
  p: ScanParsed,
  materialId: string,
  nestingId: string
): void {
  if (getHM(p.materialId) !== "LHM") throw new AppError(MSG_ONLY_LHM);

  const a = getLast4(materialId);
  const b = getLast4(p.materialId);
  if (!a || !b || a !== b) throw new AppError(MSG_LAST4);

  if (!p.sourceNestingId?.trim()) throw new AppError(MSG_NEED_ASSIGN);

  const src = normalizeNestingId(p.sourceNestingId);
  const cur = normalizeNestingId(nestingId);
  if (!src || !cur || src !== cur) throw new AppError(MSG_NUM_MISMATCH);
}
