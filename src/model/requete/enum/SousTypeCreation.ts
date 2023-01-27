/* istanbul ignore file */
import { EnumWithComplete } from "@util/enum/EnumWithComplete";
import { EnumWithLibelle } from "@util/enum/EnumWithLibelle";
import { Options } from "@util/Type";

export class SousTypeCreation extends EnumWithComplete {
  public static readonly RCEDXR = new SousTypeCreation(
    "RCEDXR",
    "Création Etablissement par déclaration (DX) Démat",
    "Acte Etab DX (d)"
  );
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
  public static readonly RCEXR = new SousTypeCreation(
    "RCEXR",
    "Création Etablissement par décret (X) Démat",
    "Acte Etab X (d)"
  );
  public static readonly RCETJC = new SousTypeCreation(
    "RCETJC",
    "Création Etablissement suite Transciption Judiciaire Courrier",
    "Acte Etab Trans Judic (c)"
  );
  public static readonly RCTC = new SousTypeCreation(
    "RCTC",
    "Création suite Transcription Courrier",
    "Acte Transcrit (c)"
  );
  public static readonly RCTD = new SousTypeCreation(
    "RCTD",
    "Création suite Transcription Démat",
    "Acte Transcrit (d)"
  );
  public static readonly RCEOPC = new SousTypeCreation(
    "RCEOPC",
    "Création Etablissement pour optants (OPT) Courrier",
    "Acte Etab OPT (c)"
  );
  public static readonly RCEARC = new SousTypeCreation(
    "RCEARC",
    "Création Etablissement pour reconstitution (AR) Courrier",
    "Acte Etab AR (c)"
  );
  public static readonly RCADC = new SousTypeCreation(
    "RCADC",
    "Création Acte Dressé Courrier",
    "Acte Dressé (c)"
  );

  public static getEnumFor(str: string) {
    return EnumWithLibelle.getEnumFor(str, SousTypeCreation);
  }

  public static getEnumFromLibelleCourt(str: string) {
    return EnumWithComplete.getEnumFromLibelleCourt(SousTypeCreation, str);
  }

  public static getAllEnumsAsOptions(): Options {
    return EnumWithLibelle.getAllLibellesAsOptions(SousTypeCreation);
  }

  public static getAllNomsAsOptions(): Options {
    return EnumWithComplete.getAllNomsAsOptions(SousTypeCreation);
  }

  public static getAllLibellesCourtAsOptions(): Options {
    return EnumWithComplete.getAllLibellesCourtAsOptions(SousTypeCreation);
  }

  public static estRCEXR(sousType?: SousTypeCreation): boolean {
    return sousType === SousTypeCreation.RCEXR;
  }

  public static estRCTD(sousType?: SousTypeCreation): boolean {
    return sousType === SousTypeCreation.RCTD;
  }

  public static estRCTC(sousType?: SousTypeCreation): boolean {
    return sousType === SousTypeCreation.RCTC;
  }

  public static estRCTDOuRCTC(sousType?: SousTypeCreation): boolean {
    return (
      SousTypeCreation.estRCTD(sousType) || SousTypeCreation.estRCTC(sousType)
    );
  }

  public static estRCEXROuRCTDOuRCTC(sousType?: SousTypeCreation): boolean {
    return (
      SousTypeCreation.estRCTDOuRCTC(sousType) ||
      SousTypeCreation.estRCEXR(sousType)
    );
  }
}
