import styles from "../NestingPage.module.css";

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
        onChange={(e) => onChange(e.target.value)}
      />
      <div className={styles.actions}>
        <button className={styles.btn} onClick={onNext} disabled={nextDisabled}>
          Ďalej
          <svg className={styles.icon_right}>
            <use href="../../../shared/icons/arrow-right.svg" />
          </svg>
        </button>
      </div>
    </section>
  );
}
