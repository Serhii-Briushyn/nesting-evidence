export const ymd = (d = new Date()) =>
  new Date(d.getTime() - d.getTimezoneOffset() * 60000)
    .toISOString()
    .slice(0, 10);

export function formatYMD(iso: string, sep: "." | "-" = "."): string {
  const [y, m, d] = iso.split("-");
  return `${d}${sep}${m}${sep}${y}`;
}

export function excelDateFromYMD(iso: string): Date {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d, 12, 0, 0));
}
