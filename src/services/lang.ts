import { YamlParse } from './index.js';
// import { EmbedBuilder, Locale, LocalizationMap, resolveColor } from 'discord.js';
// import path, { dirname } from 'node:path';
// import { fileURLToPath } from 'node:url';

import { EmbedBuilder, Locale } from 'discord.js';

// import { Language } from '../models/enum-helpers/index.js';

export class Lang {
  public static get(
    location: string,
    langCode: string | Locale,
    variables?: { [name: string]: string },
    mapper?: any,
  ): string {
    const yaml = new YamlParse();
    console.log(yaml.getYaml('./lang/ru-RU.yaml'));
    return 'dev';
  }

  public static getRef(
    location: string,
    langCode: Locale,
    variables?: { [name: string]: string },
  ): string {
    return Lang.get(location, langCode, variables, null);
  }

  public static getEmbed(
    location: string,
    langCode: Locale,
    variables?: { [name: string]: string },
  ): string {
    return;
    // return (
    //   this.linguini.get(location, langCode, this.embedTm, variables) ??
    //   this.linguini.get(location, Language.Default, this.embedTm, variables)
    // );
  }
}
