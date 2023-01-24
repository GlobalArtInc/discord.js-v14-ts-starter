import * as dotenv from 'dotenv'; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
import { ExtendedClient } from './structures/client';
dotenv.config();
export const client = new ExtendedClient();

process.on('unhandledRejection', (err) => {
  console.log(err);
});
process.on('uncaughtException', (err) => {
  console.log(err);
});

client.start();
