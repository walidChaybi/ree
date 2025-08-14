import { creerInfoPageRECE } from "./InfoPageRECE";
import { FIN_URL_CONSULTATION } from "./InfoPagesBase";

const BASE_PAGES_INFORMATION = "espace-information";

export const INFO_PAGE_MES_REQUETES_INFORMATION = creerInfoPageRECE({
  url: `${BASE_PAGES_INFORMATION}/mes-requetes`,
  titre: "Mes requêtes d'information",
  niveauNavigation: 1
});

export const INFO_PAGE_REQUETES_INFORMATION_SERVICE = creerInfoPageRECE({
  url: `${BASE_PAGES_INFORMATION}/mon-service`,
  titre: "Les requêtes d'information de mon service",
  niveauNavigation: 1
});

export const INFO_PAGE_APERCU_REQUETE_INFORMATION_CONSULTATION = creerInfoPageRECE({
  url: `${BASE_PAGES_INFORMATION}/requete/:idRequeteParam/apercu/${FIN_URL_CONSULTATION}`,
  titre: "Consultation requête d'information",
  niveauNavigation: 2
});

export const INFO_PAGE_APERCU_REQUETE_INFORMATION = creerInfoPageRECE({
  url: `${BASE_PAGES_INFORMATION}/requete/:idRequeteParam/apercu`,
  titre: "Aperçu requête d'information",
  niveauNavigation: 2
});
