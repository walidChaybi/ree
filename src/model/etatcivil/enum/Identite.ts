/* istanbul ignore file */

import { EnumWithLibelle } from "@util/enum/EnumWithLibelle";
import { Options } from "@util/Type";

export class Identite extends EnumWithLibelle {
  public static readonly PERE = new Identite("Le père");
  public static readonly MERE = new Identite("La mère");
  public static readonly PERE_ET_MERE = new Identite("Le père et la mère");
  public static readonly TIERS = new Identite("Un tiers");

  public static getKey(obj: Identite): string {
    return EnumWithLibelle.getKey(Identite, obj);
  }
  public static getEnumFor(str: string): Identite {
    return EnumWithLibelle.getEnumFor(str, Identite);
  }

  public static getEnumFromLibelle(str?: string): Identite {
    return str ? EnumWithLibelle.getEnumFromLibelle(Identite, str) : undefined;
  }

  public static getAllEnumsAsOptions(): Options {
    return EnumWithLibelle.getAllLibellesAsOptions(Identite, false, false);
  }

  public static getAllEnumsAsOptionsSansTiers(): Options {
    return EnumWithLibelle.getAllLibellesAsOptions(Identite, false, false, false, [Identite.TIERS]);
  }

  public static estTiers(identite: Identite): boolean {
    return identite === Identite.TIERS;
  }

  public static estPereETMere(identite: Identite) {
    return identite === Identite.PERE_ET_MERE;
  }

  public static estLePere(identite: Identite): boolean {
    return identite === Identite.PERE;
  }

  public static estLaMere(identite: Identite): boolean {
    return identite === Identite.MERE;
  }
}
