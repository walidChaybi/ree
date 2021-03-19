/* istanbul ignore file */
import { EnumWithLibelle } from "../../../views/common/util/enum/EnumWithLibelle";
import { Options } from "../../../views/common/util/Type";

export class CodeFamilleRegistre extends EnumWithLibelle {
  public static readonly ACQ = new CodeFamilleRegistre(
    "Acquisition de nationalité française"
  );
  public static readonly AR2 = new CodeFamilleRegistre(
    "Acte reconstitué - Français né en Afrique ou en Indochine sans acte"
  );
  public static readonly AR3 = new CodeFamilleRegistre(
    "Acte reconstitué – Français né en Algérie sans acte"
  );
  public static readonly COL = new CodeFamilleRegistre(
    "Acte issu d'anciennes colonies"
  );
  public static readonly CSL = new CodeFamilleRegistre("Acte consulaire");
  public static readonly DEP = new CodeFamilleRegistre("Acte déposé");
  public static readonly JUG = new CodeFamilleRegistre(
    "Transcription judiciaire"
  );
  public static readonly MAR = new CodeFamilleRegistre(
    "Actes dressés en mer ou aux armées"
  );
  public static readonly OP2 = new CodeFamilleRegistre(
    "Actes d'optants à la nationalité (Afrique ou Indochine)"
  );
  public static readonly OP3 = new CodeFamilleRegistre(
    "Actes d'optants à la nationalité (Algérie)"
  );

  public static readonly PAC = new CodeFamilleRegistre(
    "Français vivant à l'étranger ayant conclu un PACS en poste"
  );

  public static getEnumFor(str: string) {
    return EnumWithLibelle.getEnumFor(str, CodeFamilleRegistre);
  }

  public static getAllEnumsAsOptions(): Options {
    return EnumWithLibelle.getAllLibellesAsOptions(CodeFamilleRegistre, true);
  }
}
