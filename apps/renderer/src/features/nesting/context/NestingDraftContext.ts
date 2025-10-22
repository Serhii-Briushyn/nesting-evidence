import { createContext, type Dispatch, type SetStateAction } from "react";

import type { ScanParsed } from "@features/nesting/types/scan";
import type { Leftover } from "@features/nesting/types/leftover";

export type NestingDraftCtx = {
  step: number;
  nestingId: string;
  material: ScanParsed | null;
  leftovers: Leftover[];
  setStep: Dispatch<SetStateAction<number>>;
  setNestingId: Dispatch<SetStateAction<string>>;
  setMaterial: Dispatch<SetStateAction<ScanParsed | null>>;
  setLeftovers: Dispatch<SetStateAction<Leftover[]>>;
  reset: () => void;
};

export const NestingDraftContext = createContext<NestingDraftCtx | null>(null);
