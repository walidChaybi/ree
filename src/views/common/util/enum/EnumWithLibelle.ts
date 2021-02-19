import { Options } from "../Type";

/* istanbul ignore file */
export class EnumWithLibelle {
  constructor(private readonly _libelle: string) {}

  get libelle() {
    return this._libelle;
  }

  public static getEnumFor(str: string, clazz: any) {
    return str ? clazz[str] : str;
  }

  public static getAllEnumsAsOptions(clazz: any): Options {
    const options: Options = [];
    for (const key in clazz) {
      if (clazz.hasOwnProperty(key)) {
        options.push({
          value: key,
          str: clazz[key]._libelle
        });
      }
    }
    return options;
  }
}
