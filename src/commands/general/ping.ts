import { ActionRowBuilder, ButtonBuilder } from '@discordjs/builders';
import { ButtonStyle } from 'discord.js';
import { Command } from '../../structures/command';

export default new Command({
  name: 'ping',
  description: 'Shows the ping of the bot.',
  run: async ({ client, interaction, i18n }) => {
    const row = new ActionRowBuilder<ButtonBuilder>().addComponents(
      new ButtonBuilder()
        .setStyle(ButtonStyle.Secondary)
        .setCustomId(`${interaction.user.id}@ping@update`)
        .setLabel(`${i18n.t('update')}`),
    );
    const clientPing = await interaction.followUp({
      content: `Ping: ${client.ws.ping} ms.`,
      components: [row],
    });
    return await clientPing.edit({
      content: `Ping: ${client.ws.ping} ms. \nMessage Ping: ${
        clientPing.createdTimestamp - interaction.createdTimestamp
      } ms.`,
    });
  },
});
