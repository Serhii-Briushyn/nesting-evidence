import { FaArrowRight } from "react-icons/fa6";

import styles from "../NestingPage.module.css";

import { normalizeNestingId } from "@features/nesting/lib/validate";

type Props = {
  value: string;
  onChange: (v: string) => void;
  inputRef: React.RefObject<HTMLInputElement | null>;
  onNext: () => void;
  nextDisabled: boolean;
};

export const StepNestingId = ({
  value,
  onChange,
  inputRef,
  onNext,
  nextDisabled,
}: Props) => {
  return (
    <section className={styles.section}>
      <h2 className={styles.title}>Číslo nestingu</h2>
      <input
        ref={inputRef}
        className={styles.input}
        placeholder="Zadajte číslo nestingu"
        value={value}
        onChange={(e) =>
          onChange(normalizeNestingId(e.target.value).slice(0, 10))
        }
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            if (!nextDisabled) onNext();
          }
        }}
      />
      <div className={styles.actions}>
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
