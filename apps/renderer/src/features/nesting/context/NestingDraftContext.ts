import { createContext, type Dispatch, type SetStateAction } from "react";

import type { ScanParsed } from "@features/nesting/types/scan";

export type NestingDraftCtx = {
  step: number;
  nestingNumber: string;
  material: ScanParsed | null;
  leftovers: ScanParsed[];
  setStep: Dispatch<SetStateAction<number>>;
  setNestingNumber: Dispatch<SetStateAction<string>>;
  setMaterial: Dispatch<SetStateAction<ScanParsed | null>>;
  setLeftovers: Dispatch<SetStateAction<ScanParsed[]>>;
  reset: () => void;
};

export const NestingDraftContext = createContext<NestingDraftCtx | null>(null);
