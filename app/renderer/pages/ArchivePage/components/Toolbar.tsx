import React from "react";

import styles from "../ArchivePage.module.css";

type Props = {
  date: string;
  onChangeDate: (v: string) => void;
  onExport: () => void;
  canExport: boolean;
};

export const Toolbar: React.FC<Props> = ({
  date,
  onChangeDate,
  onExport,
  canExport,
}) => {
  return (
    <div className={styles.toolbar}>
      <div className={styles.t_wrap}>
        <span className={styles.t_span}>Dátum:</span>

        <input
          className={styles.input}
          type="date"
          value={date}
          onChange={(e) => onChangeDate(e.target.value)}
        />
      </div>

      <button className={styles.btn} onClick={onExport} disabled={!canExport}>
        Stiahnuť XLSX
      </button>
    </div>
  );
};
