export class ApiError {
  status: number;
  message: string;

  constructor(message, status) {
    this.message = message;
    this.status = status;
  }

  toString(): string {
    return this.message;
  }
}
