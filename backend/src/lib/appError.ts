export class AppError extends Error {
  status: number;
  code: string;

  constructor(code: string, status: number = 400, message?: string) {
    super(message ?? code);
    this.code = code;
    this.status = status;
  }
}
