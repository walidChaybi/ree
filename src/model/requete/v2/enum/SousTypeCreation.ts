/* istanbul ignore file */
import { EnumWithComplete } from "../../../../views/common/util/enum/EnumWithComplete";
import { EnumWithLibelle } from "../../../../views/common/util/enum/EnumWithLibelle";
import { Options } from "../../../../views/common/util/Type";

export class SousTypeCreation extends EnumWithComplete {
  public static readonly RCEDXR = new SousTypeCreation(
    "RCEDXR",
    "Requête de Création Etablissement par déclaration (DX) RIE",
    "Création Etab DX RIE"
  );
  public static readonly RCEDXC = new SousTypeCreation(
    "RCEDXC",
    "Requête de Création Etablissement par déclaration (DX) Courrier",
    "Création Etab DX (c)"
  );
  public static readonly RCEYC = new SousTypeCreation(
    "RCEYC",
    "Requête de Création Etablissement pour régularisation (Y) Courrier",
    "Création Etab Y (c)"
  );
  public static readonly RCEADMC = new SousTypeCreation(
    "RCEADMC",
    "Requête de Création Etablissement suite Acte Dressé en Mer Courrier",
    "Création Dressé en Mer (c)"
  );
  public static readonly RCEXR = new SousTypeCreation(
    "RCEXR",
    "Requête de Création Etablissement par décret (X) RIE",
    "Création Etab X RIE"
  );
  // public static readonly ETABLISSEMENT = new SousTypeCreation("ETABLISSEMENT");
  public static readonly RCETJC = new SousTypeCreation(
    "RCETJC",
    "Requête de Création Etablissement suite Transciption Judiciaire Courrier",
    "Création Etab Trans Judic (c)"
  );
  public static readonly RCTC = new SousTypeCreation(
    "RCTC",
    "Requête de Création suite Transcription Courrier",
    "Création Transcrit (c)"
  );
  public static readonly RCADR = new SousTypeCreation(
    "RCADR",
    "Requête de Création suite Acte Dressé RECE",
    "Création Dressé RECE"
  );
  public static readonly RCTD = new SousTypeCreation(
    "RCTD",
    "Requête de Création suite Transcription Démat",
    "Création Transcrit (d)"
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
