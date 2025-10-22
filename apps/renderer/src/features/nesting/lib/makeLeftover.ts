import type { Leftover } from "@features/nesting/types/leftover";
import type { ScanParsed } from "@features/nesting/types/scan";

export const makeLeftover = (p: ScanParsed): Leftover => ({
  ...p,
  id:
    typeof crypto?.randomUUID === "function"
      ? crypto.randomUUID()
      : `${Date.now()}-${Math.random().toString(16).slice(2)}`,
});
