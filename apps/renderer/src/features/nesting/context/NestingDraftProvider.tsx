import { useState, type PropsWithChildren } from "react";

import { NestingDraftContext } from "./NestingDraftContext";

import type { ScanParsed } from "@features/nesting/types/scan";
import type { Leftover } from "@features/nesting/types/leftover";

export function NestingDraftProvider({ children }: PropsWithChildren) {
  const [step, setStep] = useState(0);
  const [nestingId, setNestingId] = useState("");
  const [material, setMaterial] = useState<ScanParsed | null>(null);
  const [leftovers, setLeftovers] = useState<Leftover[]>([]);

  const reset = () => {
    setStep(0);
    setNestingId("");
    setMaterial(null);
    setLeftovers([]);
  };

  return (
    <NestingDraftContext.Provider
      value={{
        step,
        nestingId,
        material,
        leftovers,
        setStep,
        setNestingId,
        setMaterial,
        setLeftovers,
        reset,
      }}
    >
      {children}
    </NestingDraftContext.Provider>
  );
}
