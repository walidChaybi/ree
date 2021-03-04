/* istanbul ignore file */
import { EnumWithComplete } from "../../../views/common/util/enum/EnumWithComplete";
import { EnumWithLibelle } from "../../../views/common/util/enum/EnumWithLibelle";
import { Options } from "../../../views/common/util/Type";

export class SousTypeMiseAJour extends EnumWithComplete {
  public static readonly RMAC = new SousTypeMiseAJour(
    "RMAC",
    "MAJ Acte (c)",
    "Requête de Mise à jour d'un Acte Courrier"
  );
  public static readonly RMAR = new SousTypeMiseAJour(
    "RMAR",
    "MAJ Acte RECE",
    "Requête de Mise à jour d'un Acte RECE (du SCEC vers le Poste)"
  );
  public static readonly RMPC = new SousTypeMiseAJour(
    "RMPC",
    "MAJ PACS (c)",
    "Requête de Mise à jour d'un PACS Courrier"
  );
  public static readonly RMPR = new SousTypeMiseAJour(
    "RMPR",
    "MAJ PACS RECE",
    "Requête de Mise à jour d'un PACS RECE"
  );
  public static readonly RMRCC = new SousTypeMiseAJour(
    "RMRCC",
    "MAJ RC (c)",
    "Requête de Mise à jour d'un Répertoire Civil Courrier"
  );
  public static readonly RMRCAC = new SousTypeMiseAJour(
    "RMRCAC",
    "MAJ RCA (c)",
    "Requête de Mise à jour d'un Répertoire Civil-Annexe Courrier"
  );

  public static getEnumFor(str: string) {
    return EnumWithLibelle.getEnumFor(str, SousTypeMiseAJour);
  }

  public static getAllEnumsAsOptions(): Options {
    return EnumWithLibelle.getAllLibellesAsOptions(SousTypeMiseAJour);
  }

  public static getAllNomsAsOptions(): Options {
    return EnumWithComplete.getAllNomsAsOptions(SousTypeMiseAJour);
  }
}
