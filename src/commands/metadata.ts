import {
  ApplicationCommandType,
  RESTPostAPIChatInputApplicationCommandsJSONBody,
  RESTPostAPIContextMenuApplicationCommandsJSONBody,
} from 'discord.js';

import { Args } from './index.js';
import { Language } from '../models/enum-helpers/index.js';
import { Lang } from '../services/index.js';

export const ChatCommandMetadata: {
  [command: string]: RESTPostAPIChatInputApplicationCommandsJSONBody;
} = {
  HELP: {
    type: ApplicationCommandType.ChatInput,
    name: Lang.getRef('chatCommands.help', Language.Default),
    // name_localizations: Lang.getRefLocalizationMap('chatCommands.help'),
    description: Lang.getRef('commandDescs.help', Language.Default),
    // description_localizations: Lang.getRefLocalizationMap('commandDescs.help'),
    dm_permission: true,
    default_member_permissions: undefined,
    options: [
      {
        ...Args.HELP_OPTION,
        required: true,
      },
    ],
  },
};
