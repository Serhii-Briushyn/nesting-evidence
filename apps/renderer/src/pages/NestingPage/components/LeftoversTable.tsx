import { keyOf } from "@features/nesting/lib/keyOf";

import { DeleteButton } from "@shared/ui/DeleteButton/DeleteButton";

import styles from "../NestingPage.module.css";

import type { ScanParsed } from "@features/nesting/types/scan";

type Props = {
  items: ScanParsed[];
  onRemove: (key: string) => void;
};

export const LeftoversTable = ({ items, onRemove }: Props) => {
  if (items.length === 0) return null;
  return (
    <div className={styles.table_wrap}>
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
                <td>{row.sourceNestingId ?? "—"}</td>
                <td>{row.thickness}</td>
                <td>{row.width}</td>
                <td>{row.length}</td>
                <td>
                  <DeleteButton onClick={() => onRemove(k)} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
