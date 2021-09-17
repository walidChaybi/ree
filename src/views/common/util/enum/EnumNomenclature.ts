/* istanbul ignore file */
import { Options } from "../Type";
import { EnumWithLibelle } from "./EnumWithLibelle";

export class EnumNomemclature extends EnumWithLibelle {
  constructor(
    private readonly _code: string,
    libelle: string,
    private readonly _categorie?: string
  ) {
    super(libelle);
  }

  get code() {
    return this._code;
  }

  get categorie() {
    return this._categorie;
  }

  public static getAllCodesAsOptions(clazz: any): Options {
    const options: Options = [];
    for (const key in clazz) {
      if (clazz.hasOwnProperty(key)) {
        options.push({
          value: key,
          str: clazz[key]._code
        });
      }
    }
    return options.sort((o1: any, o2: any) => o1.str.localeCompare(o2.str));
  }

  public static getKeyForCode(clazz: any, code: string) {
    let keyResult = "";
    for (const key in clazz) {
      if (clazz.hasOwnProperty(key) && clazz[key]._code === code) {
        keyResult = key;
      }
    }
    return keyResult;
  }

  public static getCodeForLibelle(clazz: any, libelle: string) {
    let keyResult = "";
    for (const key in clazz) {
      if (clazz.hasOwnProperty(key) && clazz[key].libelle === libelle) {
        keyResult = key;
      }
    }
    return keyResult;
  }
}
