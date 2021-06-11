/* istanbul ignore file */
import { EnumWithComplete } from "../../../../views/common/util/enum/EnumWithComplete";
import { EnumWithLibelle } from "../../../../views/common/util/enum/EnumWithLibelle";

export class TypeCanal extends EnumWithComplete {
  public static readonly INTERNET = new TypeCanal("INTERNET", "Internet");
  public static readonly COURRIER = new TypeCanal("COURRIER", "Courrier");
  public static readonly RIE = new TypeCanal("RIE", "RIE");
  public static readonly RECE = new TypeCanal("RECE", "RECE");

  public static getEnumFor(str: string) {
    return EnumWithLibelle.getEnumFor(str, TypeCanal);
  }
}
