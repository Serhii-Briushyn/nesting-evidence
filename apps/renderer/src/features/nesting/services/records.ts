import { validateBeforeSave } from "../lib/validate";

import { db } from "@shared/db";
import { ymd } from "@shared/utils/date";

import type { ScanParsed } from "../types/scan";

export async function saveCurrentProject(
  rawNestingId: string,
  material: ScanParsed,
  leftovers: ScanParsed[]
) {
  validateBeforeSave(rawNestingId, material);

  const rec = {
    id: crypto.randomUUID(),
    date: ymd(),
    nestingId: rawNestingId.trim(),
    material,
    leftovers,
    createdAt: Date.now(),
  };
  await db.records.add(rec);
  return rec.id;
}
