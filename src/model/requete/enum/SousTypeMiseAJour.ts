import { TEnumAvecDeuxLibelles } from "@model/commun/EnumAvecDeuxLibelles";
import { EnumWithComplete } from "@util/enum/EnumWithComplete";
import { EnumWithLibelle } from "@util/enum/EnumWithLibelle";
import { Options } from "@util/Type";

export enum ESousTypeMiseAJour {
  RMAC = "RMAC",
  RMAR = "RMAR",
  RMPC = "RMPC",
  RMPR = "RMPR",
  RMRCC = "RMRCC",
  RMRCAC = "RMRCAC"
}

export const ELibelleSousTypeMiseAJour: TEnumAvecDeuxLibelles<ESousTypeMiseAJour> = {
  RMAC: {
    court: "MAJ Acte (c)",
    long: "Mise à jour d'un Acte Courrier"
  },
  RMAR: {
    court: "MAJ Acte RECE",
    long: "Mise à jour d'un Acte RECE (du SCEC vers le Poste)"
  },
  RMPC: {
    court: "MAJ PACS (c)",
    long: "Mise à jour d'un PACS Courrier"
  },
  RMPR: {
    court: "MAJ PACS RECE",
    long: "Mise à jour d'un PACS RECE"
  },
  RMRCC: {
    court: "MAJ RC (c)",
    long: "Mise à jour d'un Répertoire Civil Courrier"
  },
  RMRCAC: {
    court: "MAJ RCA (c)",
    long: "Mise à jour d'un Répertoire Civil-Annexe Courrier"
  }
};

export class SousTypeMiseAJour extends EnumWithComplete {
  public static readonly RMAC = new SousTypeMiseAJour("RMAC", "Mise à jour d'un Acte Courrier", "MAJ Acte (c)");
  public static readonly RMAR = new SousTypeMiseAJour("RMAR", "Mise à jour d'un Acte RECE (du SCEC vers le Poste)", "MAJ Acte RECE");
  public static readonly RMPC = new SousTypeMiseAJour("RMPC", "Mise à jour d'un PACS Courrier", "MAJ PACS (c)");
  public static readonly RMPR = new SousTypeMiseAJour("RMPR", "Mise à jour d'un PACS RECE", "MAJ PACS RECE");
  public static readonly RMRCC = new SousTypeMiseAJour("RMRCC", "Mise à jour d'un Répertoire Civil Courrier", "MAJ RC (c)");
  public static readonly RMRCAC = new SousTypeMiseAJour("RMRCAC", "Mise à jour d'un Répertoire Civil-Annexe Courrier", "MAJ RCA (c)");

  public static getEnumFor(str: string) {
    return EnumWithLibelle.getEnumFor(str, SousTypeMiseAJour);
  }

  public static getAllEnumsAsOptions(): Options {
    return EnumWithLibelle.getAllLibellesAsOptions(SousTypeMiseAJour);
  }

  public static estRMAC(obj: SousTypeMiseAJour) {
    return obj === SousTypeMiseAJour.RMAC;
  }
}
