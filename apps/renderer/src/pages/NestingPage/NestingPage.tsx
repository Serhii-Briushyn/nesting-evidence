import { useMemo, useRef, useEffect } from "react";

import toast from "react-hot-toast";

import { useNestingHeader } from "@app/layouts/hooks/useNestingHeader";
import { showErrorToast } from "@shared/utils/showErrorToast";
import { normalizeNestingId } from "@features/nesting/lib/validate";
import { saveCurrentProject } from "@features/nesting/services/records";
import { AppError } from "@features/nesting/lib/errors";
import { MSG_SAVE_ERR } from "@features/nesting/lib/messages";
import { useNestingDraft } from "@features/nesting/context/useNestingDraft";
import { validateLeftover } from "@features/nesting/lib/validateLeftover";
import { makeLeftover } from "@features/nesting/lib/makeLeftover";

import { StepNestingId } from "./components/StepNestingId";
import { StepMaterial } from "./components/StepMaterial";
import { StepLeftovers } from "./components/StepLeftovers";

import type { ScanParsed } from "@features/nesting/types/scan";
import type { ScanCaptureHandle } from "@features/nesting/components/ScanCapture";

export const NestingPage = () => {
  const {
    step,
    setStep,
    nestingId,
    setNestingId,
    material,
    setMaterial,
    leftovers,
    setLeftovers,
    reset,
  } = useNestingDraft();

  useNestingHeader(nestingId);

  const nestingRef = useRef<HTMLInputElement | null>(null);
  const scanRef = useRef<ScanCaptureHandle | null>(null);

  useEffect(() => {
    (step === 0 ? nestingRef.current : scanRef.current)?.focus?.();
  }, [step]);

  const validators = useMemo(
    () => [
      () => normalizeNestingId(nestingId).length > 0,
      () => !!material,
      () => true,
    ],
    [nestingId, material]
  );

  const canNext = validators[step]();
  const canConfirm = !!material && nestingId.trim().length > 0;

  const next = () => canNext && setStep((s) => Math.min(s + 1, 2));
  const prev = () => setStep((s) => Math.max(s - 1, 0));

  const onParsedSingle = (p: ScanParsed) => setMaterial(p);

  const onParsedMulti = (p: ScanParsed) => {
    if (!material) return;
    try {
      validateLeftover(p, material, nestingId);
    } catch (e) {
      showErrorToast(e instanceof AppError ? e : new AppError(MSG_SAVE_ERR));
      return;
    }
    setLeftovers((prev) => [...prev, makeLeftover(p)]);
  };

  const removePrimary = () => {
    setMaterial(null);
    scanRef.current?.focus();
  };

  const removeLeftover = (id: string) => {
    setLeftovers((prev) => prev.filter((x) => x.id !== id));
    scanRef.current?.focus();
  };

  const onConfirm = async () => {
    if (!canConfirm) return;
    try {
      await saveCurrentProject(nestingId, material!, leftovers);
      toast.success("Uložené ✅");

      reset();
    } catch (e) {
      showErrorToast(e instanceof AppError ? e : new AppError(MSG_SAVE_ERR));
    }
  };

  return (
    <main>
      {step === 0 && (
        <StepNestingId
          value={nestingId}
          onChange={setNestingId}
          inputRef={nestingRef}
          onNext={next}
          nextDisabled={!canNext}
        />
      )}

      {step === 1 && (
        <StepMaterial
          scanRef={scanRef}
          material={material}
          onParsed={onParsedSingle}
          onRemove={removePrimary}
          onBack={prev}
          onNext={next}
          nextDisabled={!canNext}
        />
      )}

      {step === 2 && (
        <StepLeftovers
          scanRef={scanRef}
          items={leftovers}
          onParsed={onParsedMulti}
          onRemove={removeLeftover}
          onBack={prev}
          onConfirm={onConfirm}
          confirmDisabled={!canConfirm}
        />
      )}
    </main>
  );
};
