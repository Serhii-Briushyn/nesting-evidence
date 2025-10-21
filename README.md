# 📦 Nesting Evidence — Desktop Application

**Nesting Evidence** is an offline desktop application designed for managing and tracking material nesting operations in production.  
Built with **React + Vite + Electron + Dexie + TypeScript**, it supports barcode scanners (Bluetooth/USB) and data export to **Excel (XLSX)**.

---

## 🚀 Main Features

| Category               | Description                                                                             |
| ---------------------- | --------------------------------------------------------------------------------------- |
| 🧾 Nesting Records     | Step-by-step creation of nesting projects: ID, main material, leftovers                 |
| 🔍 Scanner Integration | Scans material labels with automatic parsing and data validation                        |
| 💾 Local Database      | Stores all records locally using **IndexedDB (Dexie)** — fully offline                  |
| 📊 Archive             | View all records by date and export daily data                                          |
| 📁 XLSX Export         | Export data for a selected date with auto-generated filenames `nesting_YYYY-MM-DD.xlsx` |
| 🧠 Data Validation     | Detects duplicates, validates required fields, prevents incorrect input                 |
| ⚡ Electron            | Runs as a native desktop app with auto-updates                                          |
| 🌙 UI                  | Minimalist interface with focus control for scanner input                               |

---

## 🏗 Project Architecture

```
📦 NESTING-EVIDENCE
│
├── apps/
│   ├── main/                     # Electron Main Process (creates the app window, handles IPC and auto-updates)
│   │   ├── src/
│   │   │   └── app/
│   │   │       ├── ipc/
│   │   │       │    └── register.ts
│   │   │       └── index.ts
│   │   ├── tsconfig.json
│   │   └── vite.config.ts
│   │
│   ├── preload/                  # Preload Script (secure bridge between renderer and main process)
│   │   ├── src/
│   │   │   └── index.ts
│   │   ├── tsconfig.json
│   │   └── vite.config.ts
│   │
│   └── renderer/                 # Frontend (React + Vite)
│       ├── public/
│       │   ├── fonts/
│       │   └── icons/
│       ├── src/
│       │   ├── app/
│       │   │   ├── layouts/
│       │   │   │   ├── components/Header.tsx
│       │   │   │   ├── hooks/
│       │   │   │   │   ├── useHeaderExtra.ts
│       │   │   │   │   └── useNestingHeader.tsx
│       │   │   │   └── MainLayout.tsx
│       │   │   └── styles/
│       │   │       ├── fonts.css
│       │   │       ├── globals.css
│       │   │       └── vars.css
│       │   │
│       │   ├── features/
│       │   │   ├── excel/
│       │   │   │   └── lib/exportDailyXlsx.ts
│       │   │   └── nesting/
│       │   │       ├── components/
│       │   │       │   └── ScanCapture/ScanCapture.tsx
│       │   │       ├── context/
│       │   │       │   ├── NestingDraftContext.ts
│       │   │       │   ├── NestingDraftProvider.tsx
│       │   │       │   └── useNestingDraft.ts
│       │   │       ├── lib/
│       │   │       │   ├── errors.ts
│       │   │       │   ├── keyOf.ts
│       │   │       │   ├── messages.ts
│       │   │       │   ├── parse.ts
│       │   │       │   ├── validate.ts
│       │   │       │   └── validateLeftover.ts
│       │   │       ├── services/records.ts
│       │   │       └── types/scan.ts
│       │   │
│       │   ├── pages/
│       │   │   ├── HomePage.tsx
│       │   │   └── ArchivePage.tsx
│       │   │
│       │   ├── shared/
│       │   │   ├── db/
│       │   │   │   └── index.ts
│       │   │   ├── types/
│       │   │   │   └── nesting.ts
│       │   │   ├── ui/
│       │   │   │   ├── DeleteButton/DeleteButton.tsx
│       │   │   │   └── ScanWaiting/ScanWaiting.tsx
│       │   │   └── utils/
│       │   │       ├── date.ts
│       │   │       └── showErrorToast.ts
│       │   │
│       │   ├── App.tsx
│       │   ├── global.d.ts
│       │   └── main.tsx
│       │
│       ├── index.html
│       ├── tsconfig.json
│       └── vite.config.ts
│
├── packages/
│   └── ipc/
│       ├── src/
│       │   └── preload-api.ts
│       └── tsconfig.json
│
├── public/
│   └── icons/
│       ├── app.ico
│       ├── app.icns
│       └── app.png
│
├── release/                      # Builds (.exe) and auto-updates
│
├── .gitignore
├── eslint.config.mjs
├── package.json
├── package-lock.json
├── tsconfig.base.json
├── tsconfig.json
└── README.md
```

---

## 💽 Data Structures

```ts
type ScanParsed = {
  materialId: string;
  steelGrade: string;
  treatmentCode: string;
  sourceNestingId?: string;
  thickness: string;
  width: string;
  length: string;
};

type NestingRecord = {
  id: string;
  date: string;
  nestingId: string;
  material: ScanParsed;
  leftovers: ScanParsed[];
  createdAt: number;
};
```

---

## 🧠 Scanning Mechanism

Component `ScanCapture`:

```tsx
<ScanCapture ref={scanRef} onParsed={handleParsed} blurOnParsed />
```

- Listens for scanner keyboard input (Bluetooth/USB)
- Buffers scanned lines until a dimension line (TxWxL) is detected
- Parses lines with `parseScanLines()` from `lib/parse.ts`
- Passes the structured result to the parent component via `onParsed()`

---

## 🗃 IndexedDB (Dexie)

```ts
export const db = new Dexie("nesting-evidence");
db.version(1).stores({ records: "id, date, nestingId, createdAt" });

await db.records.add({
  id: crypto.randomUUID(),
  date: ymd(),
  nestingId,
  material,
  leftovers,
  createdAt: Date.now(),
});
```

---

## 📤 XLSX Export

File: `features/excel/lib/exportDailyXlsx.ts`  
Generates Excel file with all daily records.  
File name example: `nesting_2025-10-19.xlsx`

---

## 🧰 Tech Stack

| Category        | Technologies                  |
| --------------- | ----------------------------- |
| 🧠 Language     | TypeScript                    |
| ⚛️ Frontend     | React + Vite                  |
| 🖥 Desktop       | Electron                      |
| 💾 Database     | Dexie (IndexedDB)             |
| 📊 Export       | ExcelJS                       |
| 🎨 UI           | CSS Modules                   |
| 🧱 Architecture | Feature-based + Electron Apps |
| 🧩 Typing       | Strict TS + Partial / Record  |

---

## 📜 Scripts

| Command           | Description                                |
| ----------------- | ------------------------------------------ |
| `npm run dev`     | Start development mode                     |
| `npm run build`   | Build renderer                             |
| `npm run dist`    | Build desktop installer (.exe)             |
| `npm run release` | Publish GitHub release (GH_TOKEN required) |

---

## 👤 Author

**Serhii Briushyn** — Full Stack Developer  
📍 Slovakia  
💼 Internal production tool for **NMH s.r.o.**
