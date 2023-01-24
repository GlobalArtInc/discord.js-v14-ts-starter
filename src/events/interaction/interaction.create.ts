import { CommandInteractionOptionResolver } from 'discord.js';
import { client } from '../../main';
import { i18nService } from '../../services/i18n.service';
import { Event } from '../../structures/event';
import { CommanDataType, ExtendedInteraction } from '../../typings/Command';

export default new Event('interactionCreate', async (interaction) => {
  // Chat Input Commands
  if (interaction.isCommand()) {
    await interaction.deferReply();
    const command = client.commands.get(interaction.commandName);

    if (!command) {
      return interaction.followUp('You have used a non existent command');
    }
    const i18n = new i18nService();
    await i18n.getLanguage(interaction);

    if (command?.only === CommanDataType.Guild) {
      return interaction.followUp({
        content: i18n.t('onlyForGuild'),
      });
    }
    command.run({
      args: interaction.options as CommandInteractionOptionResolver,
      client,
      interaction: interaction as ExtendedInteraction,
      i18n,
    });
  }
});
