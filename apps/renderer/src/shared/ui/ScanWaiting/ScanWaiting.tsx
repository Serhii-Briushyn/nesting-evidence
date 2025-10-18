import styles from "./ScanWaiting.module.css";

type Props = {
  title: string;
};

export const ScanWaiting = ({ title }: Props) => {
  return (
    <div className={styles.wrap}>
      <p className={styles.title}>{title}</p>

      <div className={styles.scanner}>
        <div className={styles.line} />
      </div>
    </div>
  );
};
