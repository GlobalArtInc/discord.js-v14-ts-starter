import { Event } from '../../structures/event';

export default new Event('ready', () => {
  console.log('Bot is online');
});
