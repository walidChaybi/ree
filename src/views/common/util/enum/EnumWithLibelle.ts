import { Options } from "../Type";

/* istanbul ignore file */
export class EnumWithLibelle {
  constructor(private readonly _libelle: string) {}

  get libelle() {
    return this._libelle;
  }

  public static getEnumFor(str: string, clazz: any) {
    str = str != null ? str : "";
    return str && clazz[str] ? clazz[str] : str;
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
    return options.sort((o1: any, o2: any) => o1.str.localeCompare(o2.str));
  }
}
