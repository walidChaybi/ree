/* istanbul ignore file */
import { EnumWithComplete } from "../../../../views/common/util/enum/EnumWithComplete";
import { EnumWithLibelle } from "../../../../views/common/util/enum/EnumWithLibelle";
import { Options } from "../../../../views/common/util/Type";

export class ObjetRequete extends EnumWithComplete {
  public static readonly DEMANDE_COPIE_ACTE = new ObjetRequete(
    "DEMANDE_COPIE_ACTE",
    "Demande de copie d'acte : naissance, mariage, décès"
  );
  public static readonly MODIFICATION_ACTE = new ObjetRequete(
    "MODIFICATION_ACTE",
    "Modification, mise à jour ou rectification d'un acte"
  );
  public static readonly COMPLETION_REQUETE_EN_COURS = new ObjetRequete(
    "COMPLETION_REQUETE_EN_COURS",
    "Complétion de requête en cours"
  );
  public static readonly TRANSCRIPTION = new ObjetRequete(
    "TRANSCRIPTION",
    "Transcription (transcription d'un acte de l'état civil étranger)"
  );
  public static readonly NATIONALITE = new ObjetRequete(
    "NATIONALITE",
    "Recherche d'information sur la nationalité"
  );
  public static readonly DIVORCE = new ObjetRequete(
    "DIVORCE",
    "Divorce et/ou séparation de corps"
  );
  public static readonly LIVRET_FAMILLE = new ObjetRequete(
    "LIVRET_FAMILLE",
    "Livret de famille"
  );
  public static readonly RC_RCA_PACS = new ObjetRequete(
    "RC_RCA_PACS",
    "Répertoire civil, répertoire civil annexe et PACS"
  );
  public static readonly AUTRES_DEMARCHES = new ObjetRequete(
    "AUTRES_DEMARCHES",
    "Autres démarches administratives"
  );
  public static readonly AUTRE_INFORMATION = new ObjetRequete(
    "AUTRE_INFORMATION",
    "Autre information"
  );

  public static getEnumFor(str: string) {
    return EnumWithLibelle.getEnumFor(str, ObjetRequete);
  }

  public static getAllEnumsAsOptions(): Options {
    return EnumWithLibelle.getAllLibellesAsOptions(ObjetRequete);
  }
}
