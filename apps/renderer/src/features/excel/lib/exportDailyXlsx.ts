import ExcelJS from "exceljs";

import type { NestingRecord } from "@shared/types/nesting";

function materialCells(x: NestingRecord["material"]) {
  return [
    x.materialId,
    x.steelGrade,
    x.treatmentCode,
    x.sourceNestingId ?? "",
    x.thickness,
    x.width,
    x.length,
  ];
}

function leftoverCells(x: NestingRecord["leftovers"][number]) {
  return [
    x.materialId,
    x.steelGrade,
    x.treatmentCode,
    x.sourceNestingId ?? "",
    x.thickness,
    x.width,
    x.length,
  ];
}

function buildHeader(maxLeftovers: number) {
  const base = [
    "Dátum",
    "Nesting #",
    "Kód položky",
    "Oceľ",
    "Spracovanie",
    "Priradeny nesting",
    "Hrúbka",
    "Šírka",
    "Dĺžka",
  ];

  const oneBlock = [
    "Kód položky",
    "Oceľ",
    "Spracovanie",
    "Priradeny nesting",
    "Hrúbka",
    "Šírka",
    "Dĺžka",
  ];
  const header = [...base];

  for (let i = 0; i < maxLeftovers; i++) {
    header.push(...oneBlock);
  }
  return header;
}

function colorHeader(ws: ExcelJS.Worksheet) {
  const headerRow = ws.getRow(1);
  headerRow.eachCell((cell, colNumber) => {
    const isBlue = colNumber >= 1 && colNumber <= 9;
    cell.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: isBlue ? "FF99CCFF" : "FFFFFF99" },
    };

    ws.views = [{ state: "frozen", ySplit: 1 }];
    ws.columns.forEach((col) => {
      col.alignment = { horizontal: "left" };
    });
  });
}

export async function exportDailyXlsx(date: string, items: NestingRecord[]) {
  const wb = new ExcelJS.Workbook();
  const ws = wb.addWorksheet("Nesting");

  const maxLeftovers = items.reduce(
    (m, r) => Math.max(m, r.leftovers.length),
    0
  );

  const header = buildHeader(maxLeftovers);
  ws.columns = header.map((h) => ({ header: h, width: 14 }));
  ws.getRow(1).font = { bold: true };
  colorHeader(ws);

  for (const rec of items) {
    const row: (string | number | Date)[] = [];
    const jsDate = new Date(`${rec.date}T00:00:00`);
    row.push(jsDate);
    row.push(rec.nestingId);
    row.push(...materialCells(rec.material));

    for (const lo of rec.leftovers) {
      row.push(...leftoverCells(lo));
    }
    const needed = maxLeftovers - rec.leftovers.length;
    for (let i = 0; i < needed; i++) row.push(...["", "", "", "", "", "", ""]);

    ws.addRow(row);
  }

  const buffer = await wb.xlsx.writeBuffer();
  const blob = new Blob([buffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });

  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = `nesting_${date}.xlsx`;
  a.click();

  URL.revokeObjectURL(a.href);
}
