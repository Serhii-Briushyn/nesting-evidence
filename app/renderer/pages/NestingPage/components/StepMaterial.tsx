import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";

import { ScanCapture } from "@features/nesting/components/ScanCapture/ScanCapture";
import { showErrorToast } from "@shared/utils/showErrorToast";
import { ScanWaiting } from "@shared/components/ScanWaiting/ScanWaiting";

import styles from "../NestingPage.module.css";
import { MaterialTable } from "./MaterialTable";

import type { ScanParsed } from "@features/nesting/types/scan";
import type { ScanCaptureHandle } from "@features/nesting/components/ScanCapture/ScanCapture";

type Props = {
  scanRef: React.RefObject<ScanCaptureHandle | null>;
  material: ScanParsed | null;
  onParsed: (p: ScanParsed) => void;
  onRemove: () => void;
  onBack: () => void;
  onNext: () => void;
  nextDisabled: boolean;
};

export function StepMaterial({
  scanRef,
  material,
  onParsed,
  onRemove,
  onBack,
  onNext,
  nextDisabled,
}: Props) {
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
        <button className={styles.btn} onClick={onBack}>
          <FaArrowLeft className={styles.icon_left} />
          Späť
        </button>
        <button className={styles.btn} onClick={onNext} disabled={nextDisabled}>
          Ďalej
          <FaArrowRight className={styles.icon_right} />
        </button>
      </div>
    </section>
  );
}
