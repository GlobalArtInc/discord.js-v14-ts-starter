import Client from "./structures/Client";
import dotenv from "dotenv";
import "reflect-metadata";
dotenv.config();

export default class Main {
  public client = new Client();

  start() {
    return this.client.start();
  }
}

new Main().start();
