/* istanbul ignore file */
import { EnumWithComplete } from "@util/enum/EnumWithComplete";
import { EnumWithLibelle } from "@util/enum/EnumWithLibelle";

export class TypeCanal extends EnumWithComplete {
  public static readonly INTERNET = new TypeCanal("INTERNET", "Internet");
  public static readonly COURRIER = new TypeCanal("COURRIER", "Courrier");
  public static readonly RIE = new TypeCanal("RIE", "RIE");
  public static readonly RECE = new TypeCanal("RECE", "RECE");

  public static getEnumFor(str: string) {
    return EnumWithLibelle.getEnumFor(str, TypeCanal);
  }
}
