/* istanbul ignore file */
import { EnumWithComplete } from "../../../views/common/util/enum/EnumWithComplete";
import { EnumWithLibelle } from "../../../views/common/util/enum/EnumWithLibelle";
import { Options } from "../../../views/common/util/Type";

export class ObjetRequete extends EnumWithComplete {
  public static readonly DEMANDE_COPIE_ACTE = new ObjetRequete(
    "DEMANDE_COPIE_ACTE",
    "Demande de copie d'acte : naissance, mariage, décès"
  );
  public static readonly MODIFICATION_ACTE = new ObjetRequete(
    "MODIFICATION_ACTE",
    "Modification, mise à jour ou rectification d'un acte"
  );
  public static readonly TRANSCRIPTION_ACTE_EC_ETRANGER = new ObjetRequete(
    "TRANSCRIPTION_ACTE_EC_ETRANGER",
    "Transcription d'un acte de l'état civil étranger"
  );
  public static readonly RECHERCHE_INFORMATION_NATIONALITE = new ObjetRequete(
    "RECHERCHE_INFORMATION_NATIONALITE",
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
    "Répertoire civil, répertoire civil annexe et registre national des PACS des étrangers nés à l'étranger"
  );
  public static readonly REGISTRE_DISPERSION_CENDRE = new ObjetRequete(
    "REGISTRE_DISPERSION_CENDRE",
    "Registre de dispersion des cendres en pleine nature"
  );
  public static readonly AUTRES_DEMARCHES_ADMINISTRATIVES = new ObjetRequete(
    "AUTRES_DEMARCHES_ADMINISTRATIVES",
    "Autres démarches administratives"
  );
  public static readonly PROBLEME_TECHNIQUE = new ObjetRequete(
    "PROBLEME_TECHNIQUE",
    "Problème technique"
  );
  public static readonly ESPACE_ADMINISTRATIONS_NOTAIRES = new ObjetRequete(
    "ESPACE_ADMINISTRATIONS_NOTAIRES",
    "Espace administrations et notaires"
  );
  public static readonly COMPLETION_REQUETE_EN_COURS = new ObjetRequete(
    "COMPLETION_REQUETE_EN_COURS",
    "Complétion requête en cours"
  );

  public static getEnumFor(str: string) {
    return EnumWithLibelle.getEnumFor(str, ObjetRequete);
  }

  public static getAllEnumsAsOptions(): Options {
    return EnumWithLibelle.getAllLibellesAsOptions(ObjetRequete);
  }

  public static getAllEnumsAsOptionsSaufCompletion(): Options {
    return EnumWithLibelle.getAllLibellesAsOptions(ObjetRequete).filter(
      opt => opt.value !== ObjetRequete.COMPLETION_REQUETE_EN_COURS.nom
    );
  }
}
