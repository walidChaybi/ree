/* istanbul ignore file */

import { EnumWithLibelle } from "@util/enum/EnumWithLibelle";

export class StatutFiche extends EnumWithLibelle {
  public static readonly ACTIF = new StatutFiche("Actif");
  public static readonly INACTIF = new StatutFiche("Inactif");

  public static getEnumFor(str: string): StatutFiche {
    return EnumWithLibelle.getEnumFor(str, StatutFiche);
  }
}
