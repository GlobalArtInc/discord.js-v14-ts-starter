import { ClientEvents } from "discord.js";
import Client from "./Client";

/* --- BaseEvent --- */
interface IBaseEvent {
  event: string;
  // eslint-disable-next-line @typescript-eslint/ban-types
  run: Function;
  bindToEventEmitter(client: Client): void;
}

/* --- Client --- */
type ClientRunFunction<Ev extends keyof ClientEvents> = {
  (client: Client, ...args: ClientEvents[Ev]);
};

class ClientEvent<Ev extends keyof ClientEvents> implements IBaseEvent {
  readonly event: Ev;
  readonly run: ClientRunFunction<Ev>;

  constructor(event: Ev, run: ClientRunFunction<Ev>) {
    this.event = event;
    this.run = run;
  }

  bindToEventEmitter(client: Client) {
    client.on(this.event, this.run.bind(null, client));
  }
}

export { IBaseEvent, ClientEvent };
