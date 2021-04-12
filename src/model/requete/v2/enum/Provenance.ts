/* istanbul ignore file */
import { EnumWithLibelle } from "../../../../views/common/util/enum/EnumWithLibelle";

export class Provenance extends EnumWithLibelle {
  public static readonly INTERNET = new Provenance("Internet");
  public static readonly COURRIER = new Provenance("Courrier");
  public static readonly RECE = new Provenance("RECE");
  public static readonly SERVICE_PUBLIC = new Provenance("Service Public");
  public static readonly COMEDEC = new Provenance("Comedec");
  public static readonly PLANETE = new Provenance("Planète");
  public static readonly SIANF = new Provenance("SIANF");

  public static getEnumFor(str: string) {
    return EnumWithLibelle.getEnumFor(str, Provenance);
  }
}
