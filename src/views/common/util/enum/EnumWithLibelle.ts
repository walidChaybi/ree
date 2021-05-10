import { Options } from "../Type";
import { changeLaPlaceDunElement, premiereLettreEnMajuscule } from "../Utils";

const AUTRE = "autre";
/* istanbul ignore file */
export class EnumWithLibelle {
  constructor(private readonly _libelle: string) {}

  get libelle() {
    return this._libelle;
  }

  public static clean(clazz: any) {
    for (const key in clazz) {
      if (clazz.hasOwnProperty(key)) {
        delete clazz[key];
      }
    }
  }

  public static getEnumFor(str: string, clazz: any) {
    str = str != null ? str : "";
    return str && clazz[str] ? clazz[str] : str;
  }

  public static getAllLibellesAsOptions(
    clazz: any,
    inclureCodeDansLibelle = false,
    tri = true,
    libelleAutreALaFin = true
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

    if (tri) {
      options.sort((o1: any, o2: any) => o1.str.localeCompare(o2.str));
    }

    // Placement du libellé "Autre" à la fin
    if (libelleAutreALaFin) {
      const indexLibelleAutre = options.findIndex(
        option => option.str.toLocaleLowerCase() === AUTRE
      );

      changeLaPlaceDunElement(options, indexLibelleAutre, options.length - 1);
    }

    return options;
  }

  public static getCode(clazz: any, obj: any) {
    for (const key in clazz) {
      if (clazz.hasOwnProperty(key) && clazz[key]._libelle === obj._libelle) {
        return key;
      }
    }
    return "";
  }
}
