/* istanbul ignore file */
import { Options } from "../Type";
import { EnumWithLibelle } from "./EnumWithLibelle";

export class EnumWithComplete extends EnumWithLibelle {
  constructor(
    private readonly _nom: string,
    libelle: string,
    private readonly _libelleCourt?: string
  ) {
    super(libelle);
  }

  get nom() {
    return this._nom;
  }

  get libelleCourt() {
    return this._libelleCourt;
  }

  public static getAllNomsAsOptions(clazz: any): Options {
    const options: Options = [];
    for (const key in clazz) {
      if (clazz.hasOwnProperty(key)) {
        options.push({
          value: key,
          str: clazz[key]._nom
        });
      }
    }
    return options.sort((o1: any, o2: any) => o1.str.localeCompare(o2.str));
  }

  public static getKeyForNom(clazz: any, nom: string) {
    let keyResult;
    for (const key in clazz) {
      if (clazz.hasOwnProperty(key) && clazz[key]._nom === nom) {
        keyResult = key;
      }
    }
    return keyResult;
  }
}
