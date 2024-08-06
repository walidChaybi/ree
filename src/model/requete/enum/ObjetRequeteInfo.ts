/* istanbul ignore file */
import { Option } from "@util/Type";

export enum ObjetRequeteInfo {
  DEMANDE_COPIE_ACTE = "DEMANDE_COPIE_ACTE",
  MODIFICATION_ACTE = "MODIFICATION_ACTE",
  TRANSCRIPTION_ACTE_EC_ETRANGER = "TRANSCRIPTION_ACTE_EC_ETRANGER",
  RECHERCHE_INFORMATION_NATIONALITE = "RECHERCHE_INFORMATION_NATIONALITE",
  DIVORCE = "DIVORCE",
  LIVRET_FAMILLE = "LIVRET_FAMILLE",
  RC_RCA_PACS = "RC_RCA_PACS",
  REGISTRE_DISPERSION_CENDRE = "REGISTRE_DISPERSION_CENDRE",
  AUTRES_DEMARCHES_ADMINISTRATIVES = "AUTRES_DEMARCHES_ADMINISTRATIVES",
  PROBLEME_TECHNIQUE = "PROBLEME_TECHNIQUE",
  ESPACE_ADMINISTRATIONS_NOTAIRES = "ESPACE_ADMINISTRATIONS_NOTAIRES",
  COMPLETION_REQUETE_EN_COURS = "COMPLETION_REQUETE_EN_COURS"
}

export const getObjetRequeteInfoLibelle = (
  objetRequeteInfo: ObjetRequeteInfo
) => {
  switch (objetRequeteInfo) {
    case ObjetRequeteInfo.DEMANDE_COPIE_ACTE:
      return "Demande de copie d'acte : naissance, mariage, décès";
    case ObjetRequeteInfo.MODIFICATION_ACTE:
      return "Modification, mise à jour ou rectification d'un acte";
    case ObjetRequeteInfo.TRANSCRIPTION_ACTE_EC_ETRANGER:
      return "Transcription d'un acte de l'état civil étranger";
    case ObjetRequeteInfo.RECHERCHE_INFORMATION_NATIONALITE:
      return "Recherche d'information sur la nationalité";
    case ObjetRequeteInfo.DIVORCE:
      return "Divorce et/ou séparation de corps";
    case ObjetRequeteInfo.LIVRET_FAMILLE:
      return "Livret de famille";
    case ObjetRequeteInfo.RC_RCA_PACS:
      return "Répertoire civil, répertoire civil annexe et registre national des PACS des étrangers nés à l'étranger";
    case ObjetRequeteInfo.REGISTRE_DISPERSION_CENDRE:
      return "Registre de dispersion des cendres en pleine nature";
    case ObjetRequeteInfo.AUTRES_DEMARCHES_ADMINISTRATIVES:
      return "Autres démarches administratives";
    case ObjetRequeteInfo.PROBLEME_TECHNIQUE:
      return "Problème technique";
    case ObjetRequeteInfo.ESPACE_ADMINISTRATIONS_NOTAIRES:
      return "Espace administrations et notaires";
    case ObjetRequeteInfo.COMPLETION_REQUETE_EN_COURS:
      return "Complétion requête en cours";
    default:
      return "";
  }
};

export const objetsRequeteInfoCommeOptions = (
  objetAExclure: ObjetRequeteInfo[] = []
): Option[] => {
  let objetsRequete = Object.values(ObjetRequeteInfo);
  if (objetAExclure.length) {
    objetsRequete = objetsRequete.filter(
      objetRequete => !objetAExclure.includes(objetRequete)
    );
  }

  return objetsRequete.map(
    objetRequete =>
      ({
        cle: objetRequete,
        libelle: getObjetRequeteInfoLibelle(objetRequete)
      } as Option)
  );
};
