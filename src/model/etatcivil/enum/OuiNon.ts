/* istanbul ignore file */
import { EnumWithLibelle } from "@util/enum/EnumWithLibelle";
import { Options } from "@util/Type";

export class OuiNon extends EnumWithLibelle {
  public static readonly OUI = new OuiNon("Oui");
  public static readonly NON = new OuiNon("Non");

  public static getEnumFor(str: string) {
    return EnumWithLibelle.getEnumFor(str, OuiNon);
  }

  public static getAllEnumsAsOptions(): Options {
    return EnumWithLibelle.getAllLibellesAsOptions(OuiNon, false, false);
  }
}
