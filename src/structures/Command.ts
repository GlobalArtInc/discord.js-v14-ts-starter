import { CacheType, CommandInteraction, SlashCommandBuilder, SlashCommandSubcommandsOnlyBuilder } from "discord.js";
import Client from "./Client";

type RunFunction = {
  (client: Client, interaction: CommandInteraction<CacheType>);
};

type Builder = Omit<SlashCommandBuilder, "addSubcommandGroup" | "addSubCommand"> | SlashCommandSubcommandsOnlyBuilder;

export class Command {
  private _category: string;
  private _hasCategory: boolean;
  readonly builder: Builder;
  readonly run: RunFunction;

  constructor(builder: Builder, run: RunFunction) {
    this._category = "";
    this._hasCategory = false;
    this.builder = builder;
    this.run = run;
  }

  get category() {
    return this._category;
  }

  set category(name: string) {
    if (this._hasCategory) {
      throw "Command: category has already been set!";
    } else {
      this._hasCategory = true;
      this._category = name;
    }
  }

  get hasCategory() {
    return this._hasCategory;
  }
}
