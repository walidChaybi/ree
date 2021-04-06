import { Options } from "../Type";
import { premiereLettreEnMajuscule } from "../Utils";

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

  public static getAllLibellesAsOptions(
    clazz: any,
    inclureCodeDansLibelle = false,
    tri = true
  ): Options {
    const options: Options = [];
    for (const key in clazz) {
      if (clazz.hasOwnProperty(key)) {
        const libelle = premiereLettreEnMajuscule(`${clazz[key]._libelle}`);
        options.push({
          value: key,
          str: inclureCodeDansLibelle ? `(${key}) ${libelle}` : libelle
        });
      }
    }
    return tri
      ? options.sort((o1: any, o2: any) => o1.str.localeCompare(o2.str))
      : options;
  }
}
