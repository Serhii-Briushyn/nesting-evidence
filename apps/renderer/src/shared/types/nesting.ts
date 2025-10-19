import type { ScanParsed } from "@features/nesting/types/scan";

export type NestingRecord = {
  id: string;
  date: string;
  nestingId: string;
  material: ScanParsed;
  leftovers: ScanParsed[];
  createdAt: number;
};
