import { useEffect, useState } from "react";

import { db } from "@shared/db";
import { ymd } from "@shared/utils/date";
import { exportDailyXlsx } from "@features/excel/lib/exportDailyXlsx";

import styles from "./ArchivePage.module.css";
import { Toolbar } from "./components/Toolbar";
import { RecordList } from "./components/RecordList";

import type { NestingRecord } from "@shared/types/nesting";

export const ArchivePage = () => {
  const [date, setDate] = useState(ymd());
  const [items, setItems] = useState<NestingRecord[]>([]);

  useEffect(() => {
    let live = true;
    (async () => {
      const rows = await db.records
        .where("date")
        .equals(date)
        .reverse()
        .sortBy("createdAt");
      if (live) setItems(rows.reverse());
    })();
    return () => {
      live = false;
    };
  }, [date]);

  const handleDelete = async (id: string) => {
    await db.records.delete(id);
    setItems((prev) => prev.filter((r) => r.id !== id));
  };

  return (
    <main>
      <section className={styles.section}>
        <h1 className={styles.title}>Archív a export</h1>

        <Toolbar
          date={date}
          onChangeDate={setDate}
          onExport={() => exportDailyXlsx(date, items)}
          canExport={items.length > 0}
        />

        <h2 className={styles.subtitle}>
          Projekty za {date} ({items.length})
        </h2>

        <RecordList items={items} onDelete={handleDelete} />
      </section>
    </main>
  );
};
