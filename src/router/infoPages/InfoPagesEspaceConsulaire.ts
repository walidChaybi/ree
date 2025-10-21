import { creerInfoPageRECE } from "./InfoPageRECE";
import { FIN_URL_CONSULTATION } from "./InfoPagesBase";

const BASE_PAGES_CONSULAIRE = "espace-consulaire";
const ID_REQUETE = ":idRequeteParam";

/** Espaces **/
export const INFO_PAGE_MES_REQUETES_CONSULAIRES = creerInfoPageRECE({
  url: `${BASE_PAGES_CONSULAIRE}/mes-requetes`,
  titre: "Mes requêtes consulaires",
  niveauNavigation: 1
});

export const INFO_PAGE_REQUETES_CONSULAIRES_SERVICE = creerInfoPageRECE({
  url: `${BASE_PAGES_CONSULAIRE}/mon-service`,
  titre: "Les requêtes consulaires de mon service",
  niveauNavigation: 1
});

/** Saisie requête transcription courrier **/
export const INFO_PAGE_SAISIE_REQUETE_TRANSCRIPTION_COURRIER = creerInfoPageRECE({
  url: `${BASE_PAGES_CONSULAIRE}/saisie-requete-transcription-courrier`,
  titre: "Saisie d'une requête de transcription courrier",
  niveauNavigation: 2
});

export const INFO_PAGE_MODIFICATION_REQUETE_TRANSCRIPTION_COURRIER = creerInfoPageRECE({
  url: `${BASE_PAGES_CONSULAIRE}/modification-requete-transcription-courrier/${ID_REQUETE}`,
  titre: "Modification d'une requête de transcription courrier",
  niveauNavigation: 2
});

/** Requête transcription **/
export const INFO_PAGE_APERCU_REQUETE_TRANSCRIPTION_CONSULTATION = creerInfoPageRECE({
  url: `${BASE_PAGES_CONSULAIRE}/requete/${ID_REQUETE}/${FIN_URL_CONSULTATION}`,
  titre: "Aperçu requête de transcription",
  niveauNavigation: 2
});

export const INFO_PAGE_APERCU_REQUETE_TRANSCRIPTION_PRISE_EN_CHARGE = creerInfoPageRECE({
  url: `${BASE_PAGES_CONSULAIRE}/requete/${ID_REQUETE}/prise-en-charge`,
  titre: "Aperçu requête de transcription (prise en charge)",
  niveauNavigation: 2
});

export const INFO_PAGE_APERCU_REQUETE_TRANSCRIPTION_SAISIE_PROJET = creerInfoPageRECE({
  url: `${BASE_PAGES_CONSULAIRE}/requete/${ID_REQUETE}/saisie-projet`,
  titre: "Aperçu requête de transcription (saisie du projet)",
  niveauNavigation: 2
});

export const INFO_PAGE_APERCU_REQUETE_TRANSCRIPTION_TRAITE = creerInfoPageRECE({
  url: `${BASE_PAGES_CONSULAIRE}/requete/${ID_REQUETE}/traite`,
  titre: "Aperçu requête de transcription (traité)",
  niveauNavigation: 2
});
