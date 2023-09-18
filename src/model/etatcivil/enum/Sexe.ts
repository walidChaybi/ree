/* istanbul ignore file */

import { EnumWithLibelle } from "@util/enum/EnumWithLibelle";
import { Options } from "@util/Type";

export class Sexe extends EnumWithLibelle {
  public static readonly MASCULIN = new Sexe("Masculin");
  public static readonly FEMININ = new Sexe("Féminin");
  public static readonly INDETERMINE = new Sexe("Indéterminé");
  public static readonly INCONNU = new Sexe("Non renseigné");

  public static getKey(obj: Sexe): string {
    return EnumWithLibelle.getKey(Sexe, obj);
  }
  public static getEnumFor(str: string): Sexe {
    return EnumWithLibelle.getEnumFor(str, Sexe);
  }

  public static getEnumFromLibelle(str?: string): Sexe {
    return str ? EnumWithLibelle.getEnumFromLibelle(Sexe, str) : undefined;
  }

  public static getAllEnumsAsOptions(): Options {
    return EnumWithLibelle.getAllLibellesAsOptions(Sexe, false, false);
  }

  public static getAllEnumsAsOptionsSansInconnu(): Options {
    return EnumWithLibelle.getAllLibellesAsOptions(Sexe, false, false, false, [
      Sexe.INCONNU
    ]);
  }

  public static estIndetermine(sexe: any) {
    return (
      sexe ===
      (typeof sexe === "string"
        ? Sexe.getKey(Sexe.INDETERMINE)
        : Sexe.INDETERMINE)
    );
  }

  public static estInconnu(sexe: any) {
    return (
      sexe ===
      (typeof sexe === "string" ? Sexe.getKey(Sexe.INCONNU) : Sexe.INCONNU)
    );
  }

  public static estIndetermineOuInconnu(sexe: any) {
    return this.estIndetermine(sexe) || this.estInconnu(sexe);
  }

  public static estMasculin(sexe: Sexe): boolean {
    return sexe === Sexe.MASCULIN;
  }
}
