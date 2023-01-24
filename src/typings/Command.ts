import {
  ChatInputApplicationCommandData,
  CommandInteraction,
  CommandInteractionOptionResolver,
  GuildMember,
  PermissionResolvable,
} from 'discord.js';
import { i18nService } from '../services/i18n.service';
import { ExtendedClient } from '../structures/client';

/**
 * {
 *  name: "commandname",
 * description: "any description",
 * run: async({ interaction }) => {
 *
 * }
 * }
 */
export interface ExtendedInteraction extends CommandInteraction {
  member: GuildMember;
}

interface RunOptions {
  client: ExtendedClient;
  interaction: ExtendedInteraction;
  args: CommandInteractionOptionResolver;
  i18n: i18nService;
}

type RunFunction = (options: RunOptions) => any;

export enum CommanDataType {
  Guild = 'guild',
  Dm = 'dm',
  Any = 'any',
}

export interface AdditionalApplicationCommandData {
  only?: CommanDataType;
}

export type CommandType = {
  userPermissions?: PermissionResolvable[];
  run: RunFunction;
} & ChatInputApplicationCommandData & AdditionalApplicationCommandData;
