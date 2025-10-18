import { useContext } from "react";

import { NestingDraftContext } from "./NestingDraftContext";

export function useNestingDraft() {
  const ctx = useContext(NestingDraftContext);
  if (!ctx)
    throw new Error("useNestingDraft must be used within NestingDraftProvider");
  return ctx;
}
