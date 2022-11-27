import Client from "./structures/Client";

export default class Main {
  public client = new Client();

  start() {
    return this.client.start();
  }
}

new Main().start();
