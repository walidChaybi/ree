import { EnumWithLibelle } from "@util/enum/EnumWithLibelle";
import { Options } from "@util/Type";

export enum ETypeFamille {
  ACQ = "Acquisition de la nationalité française",
  CSL = "Acte consulaire",
  DEP = "Acte déposé dans un pays voisin",
  COL = "Acte issu d'anciennes colonies",
  AR2 = "Acte reconstitué - Anciens territoires français (hors Algérie)",
  AR3 = "Acte reconstitué – Algérie",
  OP2 = "Actes d'optants à la nationalité (Afrique ou Indochine)",
  OP3 = "Actes d'optants à la nationalité (Algérie)",
  JUG = "Transcription judiciaire",
  MAR = "Acte dressé en mer ou aux armées",
  CPN = "Changement de nom ou prénoms",
  AFF = "Dossier d'affaire",
  XDX = "Dossier pour acquisition",
  OPT = "Dossier d'optants",
  PR = "Pré-dossier",
  PAC = "Etranger ayant conclu un PACS en France"
}

export const typesFamilleProjetActe: (keyof typeof ETypeFamille)[] = ["AFF", "OPT", "PR", "XDX"];

export class TypeFamille extends EnumWithLibelle {
  public static readonly ACQ = new TypeFamille("Acquisition de la nationalité française");
  public static readonly CSL = new TypeFamille("Acte consulaire");
  public static readonly DEP = new TypeFamille("Acte déposé dans un pays voisin");
  public static readonly COL = new TypeFamille("Acte issu d'anciennes colonies");
  public static readonly AR2 = new TypeFamille("Acte reconstitué - Anciens territoires français (hors Algérie)");
  public static readonly AR3 = new TypeFamille("Acte reconstitué – Algérie");
  public static readonly OP2 = new TypeFamille("Actes d'optants à la nationalité (Afrique ou Indochine)");
  public static readonly OP3 = new TypeFamille("Actes d'optants à la nationalité (Algérie)");
  public static readonly JUG = new TypeFamille("Transcription judiciaire");
  public static readonly MAR = new TypeFamille("Acte dressé en mer ou aux armées");
  public static readonly CPN = new TypeFamille("Changement de nom ou prénoms");
  public static readonly AFF = new TypeFamille("Dossier d'affaire");
  public static readonly XDX = new TypeFamille("Dossier pour acquisition");
  public static readonly OPT = new TypeFamille("Dossier d'optants");
  public static readonly PR = new TypeFamille("Pré-dossier");
  public static readonly PAC = new TypeFamille("Etranger ayant conclu un PACS en France");

  public static getEnumFor(str: string) {
    return EnumWithLibelle.getEnumFor(str, TypeFamille);
  }

  public static getAllEnumsAsOptions(): Options {
    return EnumWithLibelle.getAllLibellesAsOptions(TypeFamille, true, false);
  }

  public static getKey(typeFamille: TypeFamille) {
    return EnumWithLibelle.getKey(TypeFamille, typeFamille);
  }

  public static estCPN(typeFamille?: TypeFamille) {
    return typeFamille === TypeFamille.CPN;
  }

  public static estPAC(typeFamille?: TypeFamille) {
    return typeFamille === TypeFamille.PAC;
  }

  public static estOP2(typeFamille?: TypeFamille) {
    return typeFamille === TypeFamille.OP2;
  }

  public static estOP3(typeFamille?: TypeFamille) {
    return typeFamille === TypeFamille.OP3;
  }

  public static estACQ(typeFamille?: TypeFamille) {
    return typeFamille === TypeFamille.ACQ;
  }

  public static estCOL(typeFamille?: TypeFamille) {
    return typeFamille === TypeFamille.COL;
  }

  public static estMAR(typeFamille?: TypeFamille) {
    return typeFamille === TypeFamille.MAR;
  }
}
