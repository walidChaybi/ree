import { creerInfoPageRECE } from "./InfoPageRECE";
import { FIN_URL_CONSULTATION } from "./InfoPagesBase";

const BASE_PAGES_DELIVRANCE = "espace-delivrance";
const ID_REQUETE = ":idRequeteParam";
const ID_ACTE = ":idActeParam";

/** Espaces **/
export const INFO_PAGE_MES_REQUETES_DELIVRANCE = creerInfoPageRECE({
  url: `${BASE_PAGES_DELIVRANCE}/mes-requetes`,
  titre: "Mes requêtes de délivrance",
  niveauNavigation: 1
});

export const INFO_PAGE_REQUETES_DELIVRANCE_SERVICE = creerInfoPageRECE({
  url: `${BASE_PAGES_DELIVRANCE}/mon-service`,
  titre: "Les requêtes de délivrance de mon service",
  niveauNavigation: 1
});

/** Saisie requête courrier **/
export const INFO_PAGE_SAISIE_REQUETE_DELIVRANCE_EXTRAIT_COPIE_COURRIER = creerInfoPageRECE({
  url: `${BASE_PAGES_DELIVRANCE}/saisie-requete-courrier/extrait-copie`,
  titre: "Saisie d'une requête de délivrance courrier (extrait/copie)",
  niveauNavigation: 2
});

export const INFO_PAGE_MODIFICATION_REQUETE_DELIVRANCE_EXTRAIT_COPIE_COURRIER = creerInfoPageRECE({
  url: `${BASE_PAGES_DELIVRANCE}/modification-requete-courrier/${ID_REQUETE}/extrait-copie`,
  titre: "Modification d'une requête de délivrance courrier (extrait/copie)",
  niveauNavigation: 2
});

export const INFO_PAGE_SAISIE_REQUETE_DELIVRANCE_CERTIFICAT_SITUATION_COURRIER = creerInfoPageRECE({
  url: `${BASE_PAGES_DELIVRANCE}/saisie-requete-courrier/certificat-situation`,
  titre: "Saisie d'une requête de délivrance courrier (certificat situation)",
  niveauNavigation: 2
});

export const INFO_PAGE_MODIFICATION_REQUETE_DELIVRANCE_CERTIFICAT_SITUATION_COURRIER = creerInfoPageRECE({
  url: `${BASE_PAGES_DELIVRANCE}/modification-requete-courrier/${ID_REQUETE}/certificat-situation`,
  titre: "Modification d'une requête de délivrance courrier (certificat situation)",
  niveauNavigation: 2
});

/** Requêtes **/
export const INFO_PAGE_APERCU_REQUETE_DELIVRANCE_CONSULTATION = creerInfoPageRECE({
  url: `${BASE_PAGES_DELIVRANCE}/requete/${ID_REQUETE}/${FIN_URL_CONSULTATION}`,
  titre: "Aperçu requête de délivrance",
  niveauNavigation: 2
});

export const INFO_PAGE_APERCU_REQUETE_DELIVRANCE_PRISE_EN_CHARGE = creerInfoPageRECE({
  url: `${BASE_PAGES_DELIVRANCE}/requete/${ID_REQUETE}/prise-en-charge`,
  titre: "Aperçu requête de délivrance (prise en charge)",
  niveauNavigation: 2
});

export const INFO_PAGE_APERCU_REQUETE_DELIVRANCE_TRAITEMENT = creerInfoPageRECE({
  url: `${BASE_PAGES_DELIVRANCE}/requete/${ID_REQUETE}/traitement`,
  titre: "Aperçu requête de délivrance (traitement)",
  niveauNavigation: 2
});

export const INFO_PAGE_APERCU_REQUETE_DELIVRANCE_EDITION = creerInfoPageRECE({
  url: `${BASE_PAGES_DELIVRANCE}/requete/${ID_REQUETE}/edition/${ID_ACTE}?`,
  titre: "Aperçu requête de délivrance (édition)",
  niveauNavigation: 2
});
