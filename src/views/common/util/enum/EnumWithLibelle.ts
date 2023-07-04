import {
  changeLaPlaceDunElement,
  premiereLettreEnMajuscule
} from "@util/Utils";
import { Option, Options } from "../Type";

const AUTRE = "autre";
/* istanbul ignore file */
export class EnumWithLibelle {
  constructor(private readonly _libelle: string) {}

  get libelle() {
    return this._libelle;
  }

  public static contientEnums(obj: any) {
    return Object.entries(obj).length > 0;
  }

  //AddEnum specifique aux nomenclatures !
  public static addEnum(key: string, obj: any, clazz: any) {
    clazz[key] = obj;
  }

  public static clean(clazz: any) {
    for (const key in clazz) {
      if (clazz.hasOwnProperty(key)) {
        delete clazz[key];
      }
    }
  }

  public static getEnumFor(str: string | undefined, clazz: any) {
    str = str ?? "";
    return str && clazz[str] ? clazz[str] : str;
  }

  public static getAllLibellesAsOptions(
    clazz: any,
    inclureCodeDansLibelle = false,
    tri = true,
    libelleAutreALaFin = true,
    exclusions: any[] = []
  ): Options {
    const options: Options = [];
    for (const key in clazz) {
      if (clazz.hasOwnProperty(key)) {
        const libelle = premiereLettreEnMajuscule(`${clazz[key]._libelle}`);
        if (!exclusions.find(exclusion => exclusion === clazz[key])) {
          options.push({
            cle: key,
            libelle: inclureCodeDansLibelle ? `(${key}) ${libelle}` : libelle
          });
        }
      }
    }

    if (tri) {
      options.sort(
        (o1: Option, o2: Option) =>
          o1.libelle.localeCompare(o2.libelle, undefined, {
            ignorePunctuation: true
          }) //ignorer les guillemets pour le tri
      );
    }

    // Placement du libellé "Autre" à la fin
    if (libelleAutreALaFin) {
      const indexLibelleAutre = options.findIndex(
        option => option.libelle.toLocaleLowerCase() === AUTRE
      );

      changeLaPlaceDunElement(options, indexLibelleAutre, options.length - 1);
    }

    return options;
  }

  public static getKey(clazz: any, obj: any) {
    for (const key in clazz) {
      if (clazz.hasOwnProperty(key) && clazz[key] === obj) {
        return key;
      }
    }
    return "";
  }

  public static getEnumFromLibelle(clazz: any, libelle?: string) {
    for (const key in clazz) {
      if (clazz.hasOwnProperty(key) && clazz[key]._libelle === libelle) {
        return clazz[key];
      }
    }
    return undefined;
  }
}
