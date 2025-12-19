export class AppError extends Error {
  status: number;
  code: string;
  details?: any;

  constructor(code: string, status: number = 400, messageOrDetails?: string | any) {
    const isDetailsObject = typeof messageOrDetails === "object" && messageOrDetails !== null;

    super(isDetailsObject ? code : messageOrDetails ?? code);

    this.code = code;
    this.status = status;

    if (isDetailsObject) {
      this.details = messageOrDetails;
    }
  }
}
