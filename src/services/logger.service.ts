export class LoggerService {
  private log(type: string, data: Record<string, unknown>) {
    console.log({ type, ...data });
  }

  public info(data: Record<string, unknown>) {
    this.log("info", data);
  }

  public interaction(data: Record<string, unknown>) {
    this.log("interaction", data);
  }

  public error(data: Record<string, unknown>) {
    this.log("error", data);
  }
}

export default new LoggerService();
