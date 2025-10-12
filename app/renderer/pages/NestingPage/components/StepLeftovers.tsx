import { ScanCapture } from "@features/nesting/components/ScanCapture/ScanCapture";
import { showErrorToast } from "@shared/utils/showErrorToast";

import styles from "../NestingPage.module.css";
import { LeftoversTable } from "./LeftoversTable";

import type { ScanParsed } from "@features/nesting/types/scan";
import type { ScanCaptureHandle } from "@features/nesting/components/ScanCapture/ScanCapture";
import { ScanWaiting } from "@shared/components/ScanWaiting/ScanWaiting";

type Props = {
  scanRef: React.RefObject<ScanCaptureHandle | null>;
  items: ScanParsed[];
  onParsed: (p: ScanParsed) => void;
  onRemove: (key: string) => void;
  onBack: () => void;
  onConfirm: () => void;
  confirmDisabled: boolean;
};

export function StepLeftovers({
  scanRef,
  items,
  onParsed,
  onRemove,
  onBack,
  onConfirm,
  confirmDisabled,
}: Props) {
  return (
    <section
      className={`${styles.section} scan-scope`}
      tabIndex={-1}
      onClick={() => scanRef.current?.focus()}
      onFocus={() => scanRef.current?.focus()}
    >
      <h2 className={styles.title}>Leftover</h2>
      <ScanCapture ref={scanRef} onParsed={onParsed} onError={showErrorToast} />
      {items.length > 0 ? (
        <LeftoversTable items={items} onRemove={onRemove} />
      ) : (
        <ScanWaiting title="Naskenujte leftover" />
      )}
      <div className={styles.actions}>
        <button className={styles.btn} onClick={onBack}>
          <svg className={styles.icon_left}>
            <use href="../../../shared/icons/arrow-left.svg" />
          </svg>
          Späť
        </button>
        <button
          className={styles.btn}
          onClick={onConfirm}
          disabled={confirmDisabled}
        >
          {items.length === 0 ? "Uložiť bez leftovers" : "Uložiť"}
          <svg className={styles.icon_right}>
            <use href="../../../shared/icons/arrow-right.svg" />
          </svg>
        </button>
      </div>
    </section>
  );
}
