import { CommandInteraction, SlashCommandBuilder } from "discord.js";
import UsersService from "../../services/users.service";
import Client from "../../structures/Client";
import { Command } from "../../structures/Command";

export = new Command(
  new SlashCommandBuilder().setName("get-users").setDescription("Get Users"),
  async (_client: Client, interaction: CommandInteraction) => {
    const users = await UsersService.getAllUsers();
    const arr = [];
    for (const user of users) {
      arr.push(`${user.id} | ${user.name}`);
    }
    await interaction.followUp({ content: `Fetched users\r\n${arr.join("\r\n")}` });
  }
);
