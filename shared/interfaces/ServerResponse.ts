export class ServerResponse {
  message: string;
  status: number;

  constructor(message: string, status: number) {
    this.status = status;
    this.message = message;
  }
}
