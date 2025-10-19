import Dexie, { type Table } from "dexie";

import type { NestingRecord } from "@shared/types/nesting";

class AppDB extends Dexie {
  records!: Table<NestingRecord, string>;
  constructor() {
    super("nesting-evidence");
    this.version(1).stores({
      records: "id, date, nestingId, createdAt",
    });
  }
}
export const db = new AppDB();
