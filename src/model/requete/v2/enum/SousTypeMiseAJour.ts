/* istanbul ignore file */
import { EnumWithComplete } from "../../../../views/common/util/enum/EnumWithComplete";
import { EnumWithLibelle } from "../../../../views/common/util/enum/EnumWithLibelle";
import { Options } from "../../../../views/common/util/Type";

export class SousTypeMiseAJour extends EnumWithComplete {
  public static readonly RMAC = new SousTypeMiseAJour(
    "RMAC",
    "Requête de Mise à jour d'un Acte Courrier",
    "MAJ Acte (c)"
  );
  public static readonly RMAR = new SousTypeMiseAJour(
    "RMAR",
    "Requête de Mise à jour d'un Acte RECE (du SCEC vers le Poste)",
    "MAJ Acte RECE"
  );
  public static readonly RMPC = new SousTypeMiseAJour(
    "RMPC",
    "Requête de Mise à jour d'un PACS Courrier",
    "MAJ PACS (c)"
  );
  public static readonly RMPR = new SousTypeMiseAJour(
    "RMPR",
    "Requête de Mise à jour d'un PACS RECE",
    "MAJ PACS RECE"
  );
  public static readonly RMRCC = new SousTypeMiseAJour(
    "RMRCC",
    "Requête de Mise à jour d'un Répertoire Civil Courrier",
    "MAJ RC (c)"
  );
  public static readonly RMRCAC = new SousTypeMiseAJour(
    "RMRCAC",
    "Requête de Mise à jour d'un Répertoire Civil-Annexe Courrier",
    "MAJ RCA (c)"
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
