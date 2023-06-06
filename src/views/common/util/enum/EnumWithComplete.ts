/* istanbul ignore file */
import { Options } from "../Type";
import { IBoutonMenuItem } from "./../../widget/boutonMenu/BoutonMenu";
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

  public static getAllLibellesCourtAsOptions(clazz: any): Options {
    const options: Options = [];
    for (const key in clazz) {
      if (clazz.hasOwnProperty(key)) {
        options.push({
          value: key,
          str: clazz[key]._libelleCourt
        });
      }
    }
    return options.sort((o1: any, o2: any) => o1.str.localeCompare(o2.str));
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

  public static getAllLibellesAsListeBoutonMenuItem(
    clazz: any
  ): IBoutonMenuItem[] {
    return this.getListeBoutonMenuItemFromListeKeys(Object.keys(clazz), clazz)
  }

  public static getListeBoutonMenuItemFromListeKeys(keys: string[], clazz: any): IBoutonMenuItem[] {
    const listeItems: IBoutonMenuItem[] = [];
    for (const key of keys) {
      const item = this.getBoutonMenuItemFromKey(key, clazz);
      if (item) {
        listeItems.push(item);
      }
    }
    return listeItems;
  }

  public static getBoutonMenuItemFromKey(
    key: string,
    clazz: any
  ): IBoutonMenuItem | undefined {
    if (clazz.hasOwnProperty(key)) {
      return {
        key: key,
        libelle: clazz[key].libelle
      };
    }
  }
}
