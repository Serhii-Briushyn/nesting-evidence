import type { ScanParsed } from "@features/nesting/types/scan";

export type NestingRecord = {
  id: string;
  date: string;
  nestingNumber: string;
  material: ScanParsed;
  leftovers: ScanParsed[];
  createdAt: number;
};
