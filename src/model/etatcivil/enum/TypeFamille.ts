/* istanbul ignore file */

import { EnumWithLibelle } from "../../../views/common/util/enum/EnumWithLibelle";
import { Options } from "../../../views/common/util/Type";
import { EnumWithCodeCourt } from "../../../views/common/util/enum/EnumWithCodeCourt";

export class TypeFamille extends EnumWithCodeCourt {
  public static readonly ACQ = new TypeFamille(
    "ACQ",
    "ACQ",
    "Acquisition de nationalité française"
  );
  public static readonly AR2 = new TypeFamille(
    "AR2",
    "AR2",
    "Acte reconstitué - Français né en Afrique ou en Indochine sans acte"
  );
  public static readonly AR3 = new TypeFamille(
    "AR3",
    "AR3",
    "Acte reconstitué – Français né en Algérie sans acte"
  );
  public static readonly COL = new TypeFamille(
    "COL",
    "COL",
    "Acte issu d'anciennes colonies"
  );
  public static readonly CSL = new TypeFamille("CSL", "CSL", "Acte consulaire");
  public static readonly DEP = new TypeFamille("DEP", "DEP", "Acte déposé");
  public static readonly JUG = new TypeFamille(
    "JUG",
    "JUG",
    "Transcription judiciaire"
  );
  public static readonly MAR = new TypeFamille(
    "MAR",
    "MAR",
    "Actes dressés en mer ou aux armées"
  );
  public static readonly OP2_AFRIQUE_INDOCHINE = new TypeFamille(
    "OP2_AFRIQUE_INDOCHINE",
    "OP2",
    "Actes d'optants à la nationalité (Afrique ou Indochine)"
  );
  public static readonly OP2_ALGERIE = new TypeFamille(
    "OP2_ALGERIE",
    "OP3",
    "Actes d'optants à la nationalité (Algérie)"
  );
  public static readonly PAC = new TypeFamille(
    "PAC",
    "PAC",
    "Français vivant à l'étranger ayant conclu un PACS en poste"
  );
  public static getEnumFor(str: string) {
    return EnumWithLibelle.getEnumFor(str, TypeFamille);
  }

  public static getAllEnumsAsOptions(): Options {
    return EnumWithCodeCourt.getAllLibellesWithCodeCourtAsOptions(
      TypeFamille,
      true
    );
  }
}
