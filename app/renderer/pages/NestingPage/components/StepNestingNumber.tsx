import { FaArrowRight } from "react-icons/fa6";

import styles from "../NestingPage.module.css";

import { normalizeNestingNumber } from "@features/nesting/lib/validate";

type Props = {
  value: string;
  onChange: (v: string) => void;
  inputRef: React.RefObject<HTMLInputElement | null>;
  onNext: () => void;
  nextDisabled: boolean;
};

export function StepNestingNumber({
  value,
  onChange,
  inputRef,
  onNext,
  nextDisabled,
}: Props) {
  return (
    <section className={styles.section}>
      <h2 className={styles.title}>Číslo nestingu</h2>
      <input
        ref={inputRef}
        className={styles.input}
        placeholder="Zadajte číslo nestingu"
        value={value}
        onChange={(e) =>
          onChange(normalizeNestingNumber(e.target.value).slice(0, 10))
        }
      />
      <div className={styles.actions}>
        <button className={styles.btn} onClick={onNext} disabled={nextDisabled}>
          Ďalej
          <FaArrowRight className={styles.icon_right} />
        </button>
      </div>
    </section>
  );
}
