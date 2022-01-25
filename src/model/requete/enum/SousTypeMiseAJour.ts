/* istanbul ignore file */
import { EnumWithComplete } from "../../../views/common/util/enum/EnumWithComplete";
import { EnumWithLibelle } from "../../../views/common/util/enum/EnumWithLibelle";
import { Options } from "../../../views/common/util/Type";

export class SousTypeMiseAJour extends EnumWithComplete {
  public static readonly RMAC = new SousTypeMiseAJour(
    "RMAC",
    "Mise à jour d'un Acte Courrier",
    "MAJ Acte (c)"
  );
  public static readonly RMAR = new SousTypeMiseAJour(
    "RMAR",
    "Mise à jour d'un Acte RECE (du SCEC vers le Poste)",
    "MAJ Acte RECE"
  );
  public static readonly RMPC = new SousTypeMiseAJour(
    "RMPC",
    "Mise à jour d'un PACS Courrier",
    "MAJ PACS (c)"
  );
  public static readonly RMPR = new SousTypeMiseAJour(
    "RMPR",
    "Mise à jour d'un PACS RECE",
    "MAJ PACS RECE"
  );
  public static readonly RMRCC = new SousTypeMiseAJour(
    "RMRCC",
    "Mise à jour d'un Répertoire Civil Courrier",
    "MAJ RC (c)"
  );
  public static readonly RMRCAC = new SousTypeMiseAJour(
    "RMRCAC",
    "Mise à jour d'un Répertoire Civil-Annexe Courrier",
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

  public static getAllLibellesCourtAsOptions(): Options {
    return EnumWithComplete.getAllLibellesCourtAsOptions(SousTypeMiseAJour);
  }
}
