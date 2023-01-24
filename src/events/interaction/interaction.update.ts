import { Event } from '../../structures/event';

export default new Event('interactionCreate', async (interaction) => {
  // Rerun command when
  if (interaction.isButton() || interaction.isAnySelectMenu()) {
    //
  }
});
