import { ScanParseError } from "./errors";
import { MSG_BAD_CODE, MSG_4_5, MSG_NO_DIMS } from "./messages";

import type { ScanParsed } from "../types/scan";

export const DIM_REGEX = /^(\d+)\s*[x×X]\s*(\d+)\s*[x×X]\s*(\d+)$/;

export const CTRL_CHARS_RE = /\p{Cc}/gu;

export const MATERIAL_ID_REGEX = /^(\d{4})(FHM|LHM)(\d{4})$/;

export const getLast4 = (id: string) =>
  MATERIAL_ID_REGEX.exec(id.trim())?.[3] ?? null;
export const getHM = (id: string) =>
  MATERIAL_ID_REGEX.exec(id.trim())?.[2] ?? null;

export const normalizeLine = (s: string) => s.replace(CTRL_CHARS_RE, "").trim();

export const isDimensionLine = (s: string) => DIM_REGEX.test(normalizeLine(s));

export function isMaterialIdLine(s: string): boolean {
  const v = normalizeLine(s);
  return MATERIAL_ID_REGEX.test(v);
}

export const parseDimensions = (s: string) => {
  const m = DIM_REGEX.exec(normalizeLine(s));
  if (!m) {
    throw new ScanParseError(MSG_NO_DIMS);
  }
  return {
    thickness: Number(m[1]),
    width: Number(m[2]),
    length: Number(m[3]),
  };
};

export function parseScanLines(linesInput: string[] | string): ScanParsed {
  const lines = (
    Array.isArray(linesInput) ? linesInput : linesInput.split(/\r?\n/)
  )
    .map(normalizeLine)
    .filter(Boolean);

  if (lines.length < 4 || lines.length > 5) {
    throw new ScanParseError(MSG_4_5);
  }

  const [materialId, steelLine, treatmentCode, maybeFourth] = lines;
  const dimsLine = lines[lines.length - 1];

  if (!isMaterialIdLine(materialId)) {
    throw new ScanParseError(MSG_BAD_CODE);
  }
  if (!isDimensionLine(dimsLine)) {
    throw new ScanParseError(MSG_NO_DIMS);
  }

  const { thickness, width, length } = parseDimensions(dimsLine);
  const steelGrade = steelLine.replace(",", ".");
  const sourceNestingNumber = lines.length === 5 ? maybeFourth : null;

  return {
    materialId,
    steelGrade,
    treatmentCode,
    sourceNestingNumber,
    thickness,
    width,
    length,
  };
}
