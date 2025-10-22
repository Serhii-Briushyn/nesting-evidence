import { validateBeforeSave } from "../lib/validate";

import { db } from "@shared/db";
import { ymd } from "@shared/utils/date";

import type { ScanParsed } from "../types/scan";
import type { Leftover } from "../types/leftover";

const stripId = ({ id, ...rest }: Leftover): ScanParsed => rest;

export async function saveCurrentProject(
  rawNestingId: string,
  material: ScanParsed,
  leftovers: ReadonlyArray<Leftover>
) {
  validateBeforeSave(rawNestingId, material);

  const rec = {
    id: crypto.randomUUID(),
    date: ymd(),
    nestingId: rawNestingId.trim(),
    material,
    leftovers: leftovers.map(stripId),
    createdAt: Date.now(),
  };
  await db.records.add(rec);
  return rec.id;
}
