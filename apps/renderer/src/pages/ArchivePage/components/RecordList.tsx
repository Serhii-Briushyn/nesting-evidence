import React from "react";

import styles from "../ArchivePage.module.css";
import { RecordItem } from "./RecordItem";

import type { NestingRecord } from "@shared/types/nesting";

type Props = { items: NestingRecord[]; onDelete: (id: string) => void };

export const RecordList: React.FC<Props> = ({ items, onDelete }) => {
  return (
    <div className={styles.table_wrap}>
      <table className={styles.table}>
        <thead className={styles.thead}>
          <tr>
            <th>#</th>
            <th>Číslo nestingu</th>
            <th>Materiál</th>
            <th>Leftovery</th>
            <th>Čas uloženia</th>
            <th></th>
          </tr>
        </thead>
        <tbody className={styles.tbody}>
          {items.length === 0 ? (
            <tr>
              <td colSpan={6} className={styles.empty}>
                Žiadny záznam.
              </td>
            </tr>
          ) : (
            items.map((item, idx) => (
              <RecordItem
                key={item.id}
                item={item}
                index={idx + 1}
                onDelete={onDelete}
              />
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};
