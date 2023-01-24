import { Command } from '../../structures/command';

export default new Command({
  name: 'ping',
  description: 'Shows the ping of the bot.',
  run: async ({ client, interaction, i18n }) => {
    const clientPing = await interaction.followUp({
      content: `Ping: ${client.ws.ping} ms.`,
    });

    return await clientPing.edit({
      content: `Ping: ${client.ws.ping} ms. \nMessage Ping: ${
        clientPing.createdTimestamp - interaction.createdTimestamp
      } ms.`,
    });
  },
});
