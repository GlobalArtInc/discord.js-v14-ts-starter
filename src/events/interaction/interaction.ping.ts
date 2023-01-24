import { ActionRowBuilder, ButtonBuilder, ButtonStyle } from 'discord.js';
import { i18nService } from '../../services/i18n.service';
import { Event } from '../../structures/event';

export default new Event('interactionCreate', async (interaction) => {
  // Rerun command when
  if (interaction.isButton()) {
    const i18n = new i18nService();
    await i18n.getLanguage(interaction);
    const splitedCustomId = interaction.customId.split('@');
    const row = new ActionRowBuilder<ButtonBuilder>().addComponents(
      new ButtonBuilder()
        .setStyle(ButtonStyle.Secondary)
        .setCustomId(`${interaction.user.id}@ping@update`)
        .setLabel(`${i18n.t('update')}`),
    );
    if (
      splitedCustomId[0] === interaction.user.id &&
      splitedCustomId[1] === 'ping'
    ) {
      switch (splitedCustomId[2]) {
        case 'update':
          await interaction.update({
            content: `Ping: ${interaction.client.ws.ping} ms.`,
          });
          const timestamp = new Date().getTime();

          return interaction.followUp({
            content: `Ping: ${interaction.client.ws.ping} ms. \nMessage Ping: ${
              interaction.createdTimestamp - timestamp
            } ms.`,
            components: [row],
          });
      }
    }
  }
});
