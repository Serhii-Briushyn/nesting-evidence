export class AppError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "AppError";
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
export class ScanParseError extends AppError {
  constructor(message: string) {
    super(message);
    this.name = "ScanParseError";
  }
}
