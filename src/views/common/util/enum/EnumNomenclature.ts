/* istanbul ignore file */
import { Option, Options } from "../Type";
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
          cle: key,
          libelle: clazz[key]._code
        });
      }
    }
    return options.sort((o1: Option, o2: Option) =>
      o1.libelle.localeCompare(o2.libelle)
    );
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
    let codeResult = "";
    for (const key in clazz) {
      if (clazz.hasOwnProperty(key) && clazz[key].libelle === libelle) {
        codeResult = clazz[key].code;
      }
    }
    return codeResult;
  }

  public static getEnumFromCode(clazz: any, code: string) {
    let keyResult = "";
    for (const key in clazz) {
      if (clazz.hasOwnProperty(key) && clazz[key]._code === code) {
        keyResult = key;
      }
    }
    return clazz[keyResult];
  }
}
