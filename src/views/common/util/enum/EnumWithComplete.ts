/* istanbul ignore file */
import { Option, Options } from "../Type";
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
          cle: key,
          libelle: clazz[key]._nom
        });
      }
    }
    return options.sort((o1: Option, o2: Option) =>
      o1.libelle.localeCompare(o2.libelle)
    );
  }

  public static getAllLibellesCourtAsOptions(clazz: any): Options {
    const options: Options = [];
    for (const key in clazz) {
      if (clazz.hasOwnProperty(key)) {
        options.push({
          cle: key,
          libelle: clazz[key]._libelleCourt
        });
      }
    }
    return options.sort((o1: Option, o2: Option) =>
      o1.libelle.localeCompare(o2.libelle)
    );
  }

  public static getKeyForNom(clazz: any, nom: string) {
    let keyResult = "";
    for (const key in clazz) {
      if (clazz.hasOwnProperty(key) && clazz[key]._nom === nom) {
        keyResult = key;
      }
    }
    return keyResult;
  }

  public static getKeyForLibelle(clazz: any, libelle: string) {
    let keyResult = "";
    for (const key in clazz) {
      if (clazz.hasOwnProperty(key) && clazz[key].libelle === libelle) {
        keyResult = key;
      }
    }
    return keyResult;
  }

  public static getEnumFromLibelleCourt(clazz: any, libelleCourt: string) {
    for (const key in clazz) {
      if (
        clazz.hasOwnProperty(key) &&
        clazz[key]._libelleCourt === libelleCourt
      ) {
        return clazz[key];
      }
    }
    return undefined;
  }

  public static getAllLibellesAsOptions(clazz: any): Options {
    return this.getLibelleAsOptionFromListeKeys(Object.keys(clazz), clazz);
  }

  public static getLibelleAsOption(clazz: any, libelle: string): Option {
    const enumeration = this.getEnumFromLibelle(clazz, libelle);
    return {
      cle: enumeration.nom,
      libelle: enumeration.libelle
    };
  }

  public static getLibelleAsOptionFromListeKeys(
    keys: string[],
    clazz: any
  ): Options {
    const options: Options = [];
    for (const key of keys) {
      const option = this.getLibelleAsOptionFromKey(key, clazz);
      if (option) {
        options.push(option);
      }
    }
    return options;
  }

  public static getLibelleAsOptionFromKey(
    key: string,
    clazz: any
  ): Option | void {
    if (clazz.hasOwnProperty(key)) {
      return {
        cle: key,
        libelle: clazz[key].libelle
      };
    }
  }
}
