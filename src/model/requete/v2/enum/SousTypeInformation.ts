/* istanbul ignore file */
import { EnumWithLibelle } from "../../../../views/common/util/enum/EnumWithLibelle";
import { Options } from "../../../../views/common/util/Type";

export class SousTypeInformation extends EnumWithLibelle {
  public static readonly INFORMATION = new SousTypeInformation("Information");
  public static readonly COMPLETION_REQUETE_EN_COURS = new SousTypeInformation(
    "Complétion requête en cours"
  );

  public static getEnumFor(str: string) {
    return EnumWithLibelle.getEnumFor(str, SousTypeInformation);
  }

  public static getAllEnumsAsOptions(): Options {
    return EnumWithLibelle.getAllLibellesAsOptions(SousTypeInformation);
  }
}
