/* istanbul ignore file */

import { EnumWithLibelle } from "../../../views/common/util/enum/EnumWithLibelle";
import { Options } from "../../../views/common/util/Type";

export class TypeFamille extends EnumWithLibelle {
  public static readonly ACQ = new TypeFamille(
    "Acquisition de la nationalité française"
  );
  public static readonly CSL = new TypeFamille("Acte consulaire");
  public static readonly DEP = new TypeFamille(
    "Acte déposé dans un pays voisin"
  );
  public static readonly COL = new TypeFamille(
    "Acte issu d'anciennes colonies"
  );
  public static readonly AR2 = new TypeFamille(
    "Acte reconstitué - Anciens territoires français (hors Algérie)"
  );
  public static readonly AR3 = new TypeFamille("Acte reconstitué – Algérie");
  public static readonly OP2 = new TypeFamille(
    "Actes d'optants à la nationalité (Afrique ou Indochine)"
  );
  public static readonly OP3 = new TypeFamille(
    "Actes d'optants à la nationalité (Algérie)"
  );
  public static readonly JUG = new TypeFamille("Transcription judiciaire");
  public static readonly MAR = new TypeFamille(
    "Acte dressé en mer ou aux armées"
  );
  public static readonly CPN = new TypeFamille("Changement de nom ou prénoms");
  public static readonly AFF = new TypeFamille("Dossier d'affaire");
  public static readonly XDX = new TypeFamille("Dossier pour acquisition");
  public static readonly OPT = new TypeFamille("Dossier d'optants");
  public static readonly PR = new TypeFamille("Pré-dossier");
  public static readonly PAC = new TypeFamille(
    "Français vivant à l'étranger ayant conclu un PACS en poste"
  );

  public static getEnumFor(str: string) {
    return EnumWithLibelle.getEnumFor(str, TypeFamille);
  }

  public static getAllEnumsAsOptions(): Options {
    return EnumWithLibelle.getAllLibellesAsOptions(TypeFamille, true, false);
  }
}
