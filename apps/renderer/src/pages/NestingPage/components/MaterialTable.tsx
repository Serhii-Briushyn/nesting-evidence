import { DeleteButton } from "@shared/ui/DeleteButton/DeleteButton";

import styles from "../NestingPage.module.css";

import type { ScanParsed } from "@features/nesting/types/scan";

export const MaterialTable = ({
  material,
  onRemove,
}: {
  material: ScanParsed;
  onRemove: () => void;
}) => {
  return (
    <div className={styles.table_box}>
      <table className={styles.table}>
        <thead className={styles.thead}>
          <tr>
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
          <tr>
            <td>{material.materialId}</td>
            <td>{material.steelGrade}</td>
            <td>{material.treatmentCode}</td>
            <td>{material.sourceNestingId ?? "—"}</td>
            <td>{material.thickness}</td>
            <td>{material.width}</td>
            <td>{material.length}</td>
            <td>
              <DeleteButton onClick={onRemove} />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
