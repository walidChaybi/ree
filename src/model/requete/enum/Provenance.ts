/* istanbul ignore file */
import { EnumWithComplete } from "../../../views/common/util/enum/EnumWithComplete";
import { EnumWithLibelle } from "../../../views/common/util/enum/EnumWithLibelle";

export class Provenance extends EnumWithComplete {
  public static readonly INTERNET = new Provenance("INTERNET", "Internet");
  public static readonly COURRIER = new Provenance("COURRIER", "Courrier");
  public static readonly RECE = new Provenance("RECE", "RECE");
  public static readonly SERVICE_PUBLIC = new Provenance(
    "SERVICE_PUBLIC",
    "Service Public"
  );
  public static readonly COMEDEC = new Provenance("COMEDEC", "Comedec");
  public static readonly PLANETE = new Provenance("PLANETE", "Planète");
  public static readonly SIANF = new Provenance("SIANF", "SIANF");

  public static getEnumFor(str: string) {
    return EnumWithLibelle.getEnumFor(str, Provenance);
  }
}
