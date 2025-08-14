import { creerInfoPageRECE } from "./InfoPageRECE";
import { FIN_URL_CONSULTATION } from "./InfoPagesBase";

const BASE_PAGES_ETABLISSEMENT = "espace-etablissement";
const ID_REQUETE = ":idRequeteParam";
const ID_ACTE = ":idActeParam";
const ID_SUIVI_DOSSIER = ":idSuiviDossierParam";

/** Espaces **/
export const INFO_PAGE_MES_REQUETES_ETABLISSEMENT = creerInfoPageRECE({
  url: `${BASE_PAGES_ETABLISSEMENT}/mes-requetes`,
  titre: "Mes requêtes d'établissement",
  niveauNavigation: 1
});

export const INFO_PAGE_REQUETES_ETABLISSEMENT_SERVICE = creerInfoPageRECE({
  url: `${BASE_PAGES_ETABLISSEMENT}/mon-service`,
  titre: "Les requêtes d'établissement de mon service",
  niveauNavigation: 1
});

/** Requête **/
export const INFO_PAGE_APERCU_REQUETE_ETABLISSEMENT_CONSULTATION = creerInfoPageRECE({
  url: `${BASE_PAGES_ETABLISSEMENT}/requete/${ID_REQUETE}/${FIN_URL_CONSULTATION}`,
  titre: "Aperçu requête d'établissement",
  niveauNavigation: 2
});

export const INFO_PAGE_APERCU_REQUETE_ETABLISSEMENT_SUIVI_DOSSIER = creerInfoPageRECE({
  url: `${BASE_PAGES_ETABLISSEMENT}/requete/${ID_REQUETE}/suivi-dossier`,
  titre: "Aperçu requête d'établissement (suivi dossier)",
  niveauNavigation: 2
});

export const INFO_PAGE_APERCU_REQUETE_ETABLISSEMENT_SAISIE_PROJET = creerInfoPageRECE({
  url: `${BASE_PAGES_ETABLISSEMENT}/requete/${ID_REQUETE}/saisie-projet/${ID_SUIVI_DOSSIER}`,
  titre: "Aperçu requête d'établissement (saisie projet)",
  niveauNavigation: 2
});

export const INFO_PAGE_APERCU_REQUETE_ETABLISSEMENT_ACTE_REGISTRE = creerInfoPageRECE({
  url: `${BASE_PAGES_ETABLISSEMENT}/requete/${ID_REQUETE}/acte-registre/${ID_ACTE}`,
  titre: "Aperçu requête d'établissement (acte registre)",
  niveauNavigation: 2
});
