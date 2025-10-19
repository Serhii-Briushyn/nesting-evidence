export class AppError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "AppError";
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

export class ScanParseError extends Error {
  constructor(public code: string, message?: string) {
    super(message ?? code);
    this.name = "ScanParseError";
  }
}
