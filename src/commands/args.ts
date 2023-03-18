import {
  APIApplicationCommandBasicOption,
  ApplicationCommandOptionType,
} from 'discord.js';

import { HelpOption } from '../enums/index.js';
import { Language } from '../models/enum-helpers/index.js';
import { Lang } from '../services/index.js';

export class Args {
  public static readonly HELP_OPTION: APIApplicationCommandBasicOption = {
    name: Lang.getRef('arguments.option', Language.Default),
    // name_localizations: Lang.getRefLocalizationMap('arguments.option'),
    description: Lang.getRef('argDescs.helpOption', Language.Default),
    // description_localizations: Lang.getRefLocalizationMap(
    //   'argDescs.helpOption',
    // ),
    type: ApplicationCommandOptionType.String,
    choices: [
      {
        name: Lang.getRef('helpOptionDescs.contactSupport', Language.Default),
        // name_localizations: 'helpOptionDescs.contactSupport',
        value: HelpOption.CONTACT_SUPPORT,
      },
      {
        name: Lang.getRef('helpOptionDescs.commands', Language.Default),
        // name_localizations: 'helpOptionDescs.commands',
        value: HelpOption.COMMANDS,
      },
    ],
  };
}
