import * as yaml from 'js-yaml';
import * as fs from 'fs';

export class YamlParse {
  public getYaml(path: string) {
    return yaml.load(fs.readFileSync(path, 'utf8'));
  }
}
