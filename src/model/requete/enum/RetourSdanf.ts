/* istanbul ignore file */
import { EnumWithComplete } from "@util/enum/EnumWithComplete";
import { EnumWithLibelle } from "@util/enum/EnumWithLibelle";

export class RetourSdanf extends EnumWithComplete {
  public static readonly REPONSE_SCEC = new RetourSdanf(
    "REPONSE_SCEC",
    "Réponse SCEC"
  );

  public static getEnumFor(str: string) {
    return EnumWithLibelle.getEnumFor(str, RetourSdanf);
  }
}
