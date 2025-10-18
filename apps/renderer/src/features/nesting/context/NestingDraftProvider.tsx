import { useState, type PropsWithChildren } from "react";

import { NestingDraftContext } from "./NestingDraftContext";

import type { ScanParsed } from "@features/nesting/types/scan";

export function NestingDraftProvider({ children }: PropsWithChildren) {
  const [step, setStep] = useState(0);
  const [nestingNumber, setNestingNumber] = useState("");
  const [material, setMaterial] = useState<ScanParsed | null>(null);
  const [leftovers, setLeftovers] = useState<ScanParsed[]>([]);

  const reset = () => {
    setStep(0);
    setNestingNumber("");
    setMaterial(null);
    setLeftovers([]);
  };

  return (
    <NestingDraftContext.Provider
      value={{
        step,
        nestingNumber,
        material,
        leftovers,
        setStep,
        setNestingNumber,
        setMaterial,
        setLeftovers,
        reset,
      }}
    >
      {children}
    </NestingDraftContext.Provider>
  );
}
