import { ScanParseError } from "./errors";
import { MSG_INVALID_FIRST, MSG_LINES_4_5, MSG_MISSING_DIMS } from "./messages";

import type { ScanParsed } from "../types/scan";

export const DIM_REGEX = /^(\d+)\s*[x×X]\s*(\d+)\s*[x×X]\s*(\d+)$/;

export const CTRL_CHARS_RE = /\p{Cc}/gu;

export const MAT_ID_RE = /^(?=.{11}$)\d*(?:FHM|LHM)\d*$/;

export const normalizeLine = (s: string) => s.replace(CTRL_CHARS_RE, "").trim();

export const isDimensionLine = (s: string) => DIM_REGEX.test(normalizeLine(s));

export const isMaterialIdLine = (s: string) =>
  MAT_ID_RE.test(normalizeLine(s).toUpperCase());

export const parseDimensions = (s: string) => {
  const m = DIM_REGEX.exec(normalizeLine(s));
  if (!m) {
    throw new ScanParseError(MSG_MISSING_DIMS);
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
    throw new ScanParseError(MSG_LINES_4_5);
  }

  const [materialId, steelLine, treatmentCode, maybeFourth] = lines;
  const dimsLine = lines[lines.length - 1];

  if (!isMaterialIdLine(materialId)) {
    throw new ScanParseError(MSG_INVALID_FIRST);
  }
  if (!isDimensionLine(dimsLine)) {
    throw new ScanParseError(MSG_MISSING_DIMS);
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
