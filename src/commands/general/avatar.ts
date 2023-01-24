import { ClientUser, EmbedBuilder } from 'discord.js';
import { Command } from '../../structures/command';

export default new Command({
  name: 'avatar',
  description: 'Get user avatar',
  run: async ({ interaction, i18n }) => {
    const user =
      (interaction.options.getUser('member') as ClientUser) ?? interaction.user;
    const embed = new EmbedBuilder().setImage(
      user.avatarURL({ size: 4096 }) ?? user.defaultAvatarURL,
    );

    return interaction.followUp({
      content: i18n.t('userAvatar', {
        username: user.username,
      }),
      embeds: [embed],
    });
  },
});
