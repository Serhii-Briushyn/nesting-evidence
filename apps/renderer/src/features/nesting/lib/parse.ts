import { ScanParseError } from "./errors";
import { MSG_BAD_CODE, MSG_4_5, MSG_NO_DIMS } from "./messages";

import type { ScanParsed } from "../types/scan";

export const MATERIAL_ID_REGEX = /^(\d{4})(FHM|LHM)(\d{4})$/;

export const DIM_REGEX =
  /^\s*([\d.,+\s]+)\s*[x×X]\s*([\d.,+\s]+)\s*[x×X]\s*([\d.,+\s]+)\s*$/;

export const CTRL_CHARS_RE = /\p{Cc}/gu;

export const normalizeLine = (s: string) => s.replace(CTRL_CHARS_RE, "").trim();

const normalizeDecimal = (s: string) => s.replace(/(?<=\d),(?=\d)/g, ".");

const normalizeDimToken = (s: string) =>
  normalizeDecimal(s.replace(/\s+/g, ""));

export function isMaterialIdLine(s: string): boolean {
  const v = normalizeLine(s);
  return MATERIAL_ID_REGEX.test(v);
}

export const isDimensionLine = (s: string) => DIM_REGEX.test(normalizeLine(s));

export const getLast4 = (id: string) =>
  MATERIAL_ID_REGEX.exec(id.trim())?.[3] ?? null;

export const getHM = (id: string) =>
  MATERIAL_ID_REGEX.exec(id.trim())?.[2] ?? null;

export const parseDimensions = (s: string) => {
  const v = normalizeLine(s);
  const m = DIM_REGEX.exec(v);
  if (!m) throw new ScanParseError(MSG_NO_DIMS);

  const thickness = normalizeDimToken(m[1]);
  const width = normalizeDimToken(m[2]);
  const length = normalizeDimToken(m[3]);

  if (!thickness || !width || !length) {
    throw new ScanParseError(MSG_NO_DIMS);
  }

  return { thickness, width, length };
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
  const sourceNestingId = lines.length === 5 ? maybeFourth : null;

  return {
    materialId,
    steelGrade,
    treatmentCode,
    sourceNestingId,
    thickness,
    width,
    length,
  };
}
