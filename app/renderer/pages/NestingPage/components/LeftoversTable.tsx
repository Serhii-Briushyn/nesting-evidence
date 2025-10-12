import { keyOf } from "@features/nesting/lib/keyOf";

import styles from "../NestingPage.module.css";

import type { ScanParsed } from "@features/nesting/types/scan";

export function LeftoversTable({
  items,
  onRemove,
}: {
  items: ScanParsed[];
  onRemove: (key: string) => void;
}) {
  if (items.length === 0) return null;
  return (
    <div className={styles.table_box}>
      <table className={styles.table}>
        <thead className={styles.thead}>
          <tr>
            <th>#</th>
            <th>Kód položky</th>
            <th>Oceľ</th>
            <th>Spracovanie</th>
            <th>Priradeny nesting</th>
            <th>Hrúbka</th>
            <th>Šírka</th>
            <th>Dĺžka</th>
            <th></th>
          </tr>
        </thead>
        <tbody className={styles.tbody}>
          {items.map((row, i) => {
            const k = keyOf(row);
            return (
              <tr key={k}>
                <td>{i + 1}</td>
                <td>{row.materialId}</td>
                <td>{row.steelGrade}</td>
                <td>{row.treatmentCode}</td>
                <td>{row.sourceNestingNumber ?? "—"}</td>
                <td>{row.thickness}</td>
                <td>{row.width}</td>
                <td>{row.length}</td>
                <td>
                  <button
                    className={styles.btn_table}
                    onClick={() => onRemove(k)}
                  >
                    <svg>
                      <use href="../../../shared/icons/close-large-line.svg" />
                    </svg>
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
