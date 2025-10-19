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
      <div className={styles.toolbar_group}>
        <span className={styles.toolbar_text}>Dátum:</span>

        <input
          className={styles.toolbar_input}
          type="date"
          value={date}
          onChange={(e) => onChangeDate(e.target.value)}
        />
      </div>

      <button
        className={styles.btn_save}
        onClick={onExport}
        disabled={!canExport}
      >
        Stiahnuť XLSX
      </button>
    </div>
  );
};
