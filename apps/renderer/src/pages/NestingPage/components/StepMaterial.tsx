import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";

import { ScanCapture } from "@features/nesting/components/ScanCapture";
import { showErrorToast } from "@shared/utils/showErrorToast";
import { ScanWaiting } from "@shared/ui/ScanWaiting/ScanWaiting";

import styles from "../NestingPage.module.css";
import { MaterialTable } from "./MaterialTable";

import type { ScanParsed } from "@features/nesting/types/scan";
import type { ScanCaptureHandle } from "@features/nesting/components/ScanCapture";

type Props = {
  scanRef: React.RefObject<ScanCaptureHandle | null>;
  material: ScanParsed | null;
  onParsed: (p: ScanParsed) => void;
  onRemove: () => void;
  onBack: () => void;
  onNext: () => void;
  nextDisabled: boolean;
};

export const StepMaterial = ({
  scanRef,
  material,
  onParsed,
  onRemove,
  onBack,
  onNext,
  nextDisabled,
}: Props) => {
  return (
    <section
      className={`${styles.section} scan-scope`}
      tabIndex={-1}
      onClick={() => scanRef.current?.focus()}
      onFocus={() => scanRef.current?.focus()}
    >
      <h2 className={styles.title}>Materiál</h2>
      <ScanCapture ref={scanRef} onParsed={onParsed} onError={showErrorToast} />
      {material ? (
        <MaterialTable material={material} onRemove={onRemove} />
      ) : (
        <ScanWaiting title="Naskenujte material" />
      )}
      <div className={styles.actions}>
        <button className={`${styles.btn} ${styles.btn_prev}`} onClick={onBack}>
          <FaArrowLeft />
          Späť
        </button>
        <button
          className={`${styles.btn} ${styles.btn_next}`}
          onClick={onNext}
          disabled={nextDisabled}
        >
          Ďalej
          <FaArrowRight />
        </button>
      </div>
    </section>
  );
};
