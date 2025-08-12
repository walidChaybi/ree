import { constructeurEnumAvecDeuxLibellesUtils, TEnumAvecDeuxLibelles } from "@model/commun/EnumAvecDeuxLibelles";
import { EnumWithComplete } from "@util/enum/EnumWithComplete";
import { EnumWithLibelle } from "@util/enum/EnumWithLibelle";
import { Options } from "@util/Type";

export enum ESousTypeCreation {
  RCEDXR = "RCEDXR",
  RCEDXC = "RCEDXC",
  RCEYC = "RCEYC",
  RCEXR = "RCEXR",
  RCETJC = "RCETJC",
  RCTC = "RCTC",
  RCTD = "RCTD",
  RCEOPC = "RCEOPC",
  RCEARC = "RCEARC",
  RCADC = "RCADC"
}

// CODE EXEMPLE enumération avec deux libellés et utilitaire

export const ELibelleSousTypeCreation: TEnumAvecDeuxLibelles<ESousTypeCreation> = {
  RCEDXR: {
    court: "Acte Etab DX (d)",
    long: "Création Etablissement par déclaration (DX) Démat"
  },
  RCEDXC: {
    court: "Acte Etab DX (c)",
    long: "Création Etablissement par déclaration (DX) Courrier"
  },
  RCEYC: {
    court: "Acte Etab Y (c)",
    long: "Création Etablissement pour régularisation (Y) Courrier"
  },
  RCEXR: {
    court: "Acte Etab X (d)",
    long: "Création Etablissement par décret (X) Démat"
  },
  RCETJC: {
    court: "Acte Etab Trans Judic (c)",
    long: "Création Etablissement suite Transciption Judiciaire Courrier"
  },
  RCTC: {
    court: "Acte Transcrit (c)",
    long: "Création suite Transcription Courrier"
  },
  RCTD: {
    court: "Acte Transcrit (d)",
    long: "Création suite Transcription Démat"
  },
  RCEOPC: {
    court: "Acte Etab OPT (c)",
    long: "Création Etablissement pour optants (OPT) Courrier"
  },
  RCEARC: {
    court: "Acte Etab AR (c)",
    long: "Création Etablissement pour reconstitution (AR) Courrier"
  },
  RCADC: {
    court: "Acte Dressé (c)",
    long: "Création Acte Dressé Courrier"
  }
} as const;

export const SousTypeCreationUtils = constructeurEnumAvecDeuxLibellesUtils(ELibelleSousTypeCreation);

/** @deprecated à supprimer suite refonte tableau requête (12/08/2025) */
export class SousTypeCreation extends EnumWithComplete {
  public static readonly RCEDXR = new SousTypeCreation("RCEDXR", "Création Etablissement par déclaration (DX) Démat", "Acte Etab DX (d)");
  public static readonly RCEDXC = new SousTypeCreation(
    "RCEDXC",
    "Création Etablissement par déclaration (DX) Courrier",
    "Acte Etab DX (c)"
  );
  public static readonly RCEYC = new SousTypeCreation(
    "RCEYC",
    "Création Etablissement pour régularisation (Y) Courrier",
    "Acte Etab Y (c)"
  );
  public static readonly RCEXR = new SousTypeCreation("RCEXR", "Création Etablissement par décret (X) Démat", "Acte Etab X (d)");
  public static readonly RCETJC = new SousTypeCreation(
    "RCETJC",
    "Création Etablissement suite Transciption Judiciaire Courrier",
    "Acte Etab Trans Judic (c)"
  );
  public static readonly RCTC = new SousTypeCreation("RCTC", "Création suite Transcription Courrier", "Acte Transcrit (c)");
  public static readonly RCTD = new SousTypeCreation("RCTD", "Création suite Transcription Démat", "Acte Transcrit (d)");
  public static readonly RCEOPC = new SousTypeCreation("RCEOPC", "Création Etablissement pour optants (OPT) Courrier", "Acte Etab OPT (c)");
  public static readonly RCEARC = new SousTypeCreation(
    "RCEARC",
    "Création Etablissement pour reconstitution (AR) Courrier",
    "Acte Etab AR (c)"
  );
  public static readonly RCADC = new SousTypeCreation("RCADC", "Création Acte Dressé Courrier", "Acte Dressé (c)");

  public static getEnumFor(str: string) {
    return EnumWithLibelle.getEnumFor(str, SousTypeCreation);
  }

  public static getEnumFromLibelleCourt(str: string) {
    return EnumWithComplete.getEnumFromLibelleCourt(SousTypeCreation, str);
  }

  public static getAllEnumsAsOptions(): Options {
    return EnumWithLibelle.getAllLibellesAsOptions(SousTypeCreation);
  }

  // Actes établis

  public static estRCEXR(sousType?: SousTypeCreation): boolean {
    return sousType === SousTypeCreation.RCEXR;
  }

  public static estRCEDXR(sousType?: SousTypeCreation): boolean {
    return sousType === SousTypeCreation.RCEDXR;
  }

  public static estRCEDXC(sousType?: SousTypeCreation): boolean {
    return sousType === SousTypeCreation.RCEDXC;
  }

  public static estRCEYC(sousType?: SousTypeCreation): boolean {
    return sousType === SousTypeCreation.RCEYC;
  }

  public static estRCETJC(sousType?: SousTypeCreation): boolean {
    return sousType === SousTypeCreation.RCETJC;
  }

  public static estRCEOPC(sousType?: SousTypeCreation): boolean {
    return sousType === SousTypeCreation.RCEOPC;
  }

  public static estRCEARC(sousType?: SousTypeCreation): boolean {
    return sousType === SousTypeCreation.RCEARC;
  }

  public static estRCEXROuRCEDXROuRCEDXC(sousType?: SousTypeCreation): boolean {
    return SousTypeCreation.estRCEXR(sousType) || SousTypeCreation.estRCEDXR(sousType) || SousTypeCreation.estRCEDXC(sousType);
  }

  public static estSousTypeEtablissement(sousType?: SousTypeCreation): boolean {
    return (
      SousTypeCreation.estRCEXROuRCEDXROuRCEDXC(sousType) ||
      SousTypeCreation.estRCEYC(sousType) ||
      SousTypeCreation.estRCETJC(sousType) ||
      SousTypeCreation.estRCEOPC(sousType) ||
      SousTypeCreation.estRCEARC(sousType)
    );
  }

  // Actes transcrits

  public static estRCTD(sousType?: SousTypeCreation): boolean {
    return sousType === SousTypeCreation.RCTD;
  }

  public static estRCTC(sousType?: SousTypeCreation): boolean {
    return sousType === SousTypeCreation.RCTC;
  }

  public static estRCTDOuRCTC(sousType?: SousTypeCreation): boolean {
    return SousTypeCreation.estRCTD(sousType) || SousTypeCreation.estRCTC(sousType);
  }

  public static estSousTypeTranscription(sousType?: SousTypeCreation): boolean {
    return SousTypeCreation.estRCTDOuRCTC(sousType);
  }

  // Actes dressés

  public static estRCADC(sousType?: SousTypeCreation): boolean {
    return sousType === SousTypeCreation.RCADC;
  }

  // Mixtes

  public static estRCEXROuRCTDOuRCTC(sousType?: SousTypeCreation): boolean {
    return SousTypeCreation.estRCTDOuRCTC(sousType) || SousTypeCreation.estRCEXR(sousType);
  }
}
