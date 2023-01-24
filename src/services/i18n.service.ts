import { Interaction } from 'discord.js';
import fs from 'fs';
import yaml from 'js-yaml';

export class i18nService {
  public language: string;

  public async getLanguage(interaction: Interaction) {
    if (interaction.guild) {
      return (this.language = this.splitLocale(interaction.guildLocale));
    } else {
      return (this.language = this.splitLocale(interaction.locale));
    }
  }

  private splitLocale(locale: string) {
    return locale.split('-')[0] ?? 'en';
  }

  private constructLanguage(
    name: string,
    args?: Record<string, unknown>,
    key?: string,
  ) {
    const locales = yaml.load(
      fs.readFileSync(
        __dirname + `/../../assets/locales/${this.language}.yml`,
        'utf8',
      ),
    );
    let locale = locales?.[name] ?? false;
    if (!locale) {
      return key ?? name;
    }
    const regex = /{([^} ]+)}/gm;
    for (const param of locale.matchAll(regex)) {
      const value =
        typeof args[param[1]] !== 'undefined' ? args[param[1]] : key ?? name;
      locale = locale.replace(param[0], String(value));
    }

    return locale.replace(/\\n/g, ' \r\n');
  }

  public t(name: string, args?: Record<string, unknown>, key?: string) {
    return this.constructLanguage(name, args, key);
  }
}
