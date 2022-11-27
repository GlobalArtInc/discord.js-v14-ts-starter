import { ClientEvent } from "../../structures/Event";

export = new ClientEvent("ready", async (client) => {
  process.on("uncaughtException", function (error: any) {
    //
  });

  process.on("unhandledRejection", (error: any) => {
    //
  });
});
