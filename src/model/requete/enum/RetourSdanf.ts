/* istanbul ignore file */
import { EnumWithComplete } from "../../../views/common/util/enum/EnumWithComplete";
import { EnumWithLibelle } from "../../../views/common/util/enum/EnumWithLibelle";

export class RetourSdanf extends EnumWithComplete {
  public static readonly REPONSE_SCEC = new RetourSdanf(
    "REPONSE_SCEC",
    "Réponse SCEC"
  );

  public static getEnumFor(str: string) {
    return EnumWithLibelle.getEnumFor(str, RetourSdanf);
  }
}
