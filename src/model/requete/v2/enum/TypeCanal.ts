/* istanbul ignore file */
import { EnumWithLibelle } from "../../../../views/common/util/enum/EnumWithLibelle";

export class TypeCanal extends EnumWithLibelle {
  public static readonly INTERNET = new TypeCanal("Internet");
  public static readonly COURRIER = new TypeCanal("Courrier");
  public static readonly RIE = new TypeCanal("RIE");
  public static readonly RECE = new TypeCanal("RECE");

  public static getEnumFor(str: string) {
    return EnumWithLibelle.getEnumFor(str, TypeCanal);
  }
}
