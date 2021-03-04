/* istanbul ignore file */
import { EnumWithComplete } from "../../../views/common/util/enum/EnumWithComplete";
import { EnumWithLibelle } from "../../../views/common/util/enum/EnumWithLibelle";
import { Options } from "../../../views/common/util/Type";

export class SousTypeCreation extends EnumWithComplete {
  public static readonly RCEDXR = new SousTypeCreation(
    "RCEDXR",
    "Création Etab DX RIE",
    "Requête de Création Etablissement par déclaration (DX) RIE"
  );
  public static readonly RCEDXC = new SousTypeCreation(
    "RCEDXC",
    "Création Etab DX (c)",
    "Requête de Création Etablissement par déclaration (DX) Courrier"
  );
  public static readonly RCEYC = new SousTypeCreation(
    "RCEYC",
    "Création Etab Y (c)",
    "Requête de Création Etablissement pour régularisation (Y) Courrier"
  );
  public static readonly RCEADMC = new SousTypeCreation(
    "RCEADMC",
    "Création Dressé en Mer (c)",
    "Requête de Création Etablissement suite Acte Dressé en Mer Courrier"
  );
  public static readonly RCEXR = new SousTypeCreation(
    "RCEXR",
    "Création Etab X RIE",
    "Requête de Création Etablissement par décret (X) RIE"
  );
  // public static readonly ETABLISSEMENT = new SousTypeCreation("ETABLISSEMENT");
  public static readonly RCETJC = new SousTypeCreation(
    "RCETJC",
    "Création Etab Trans Judic (c)",
    "Requête de Création Etablissement suite Transciption Judiciaire Courrier"
  );
  public static readonly RCTC = new SousTypeCreation(
    "RCTC",
    "Création Transcrit (c)",
    "Requête de Création suite Transcription Courrier"
  );
  public static readonly RCADR = new SousTypeCreation(
    "RCADR",
    "Création Dressé RECE",
    "Requête de Création suite Acte Dressé RECE"
  );
  public static readonly RCTD = new SousTypeCreation(
    "RCTD",
    "Création Transcrit (d)",
    "Requête de Création suite Transcription Démat"
  );

  public static getEnumFor(str: string) {
    return EnumWithLibelle.getEnumFor(str, SousTypeCreation);
  }

  public static getAllEnumsAsOptions(): Options {
    return EnumWithLibelle.getAllLibellesAsOptions(SousTypeCreation);
  }

  public static getAllNomsAsOptions(): Options {
    return EnumWithComplete.getAllNomsAsOptions(SousTypeCreation);
  }
}
