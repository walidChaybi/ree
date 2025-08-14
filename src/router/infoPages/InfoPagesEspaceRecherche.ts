import { creerInfoPageRECE } from "./InfoPageRECE";

const BASE_PAGES_RECHERCHE = "espace-recherche";

export const INFO_PAGE_RECHERCHE_ACTE_INSCRIPTION = creerInfoPageRECE({
  url: `${BASE_PAGES_RECHERCHE}/acte-inscription`,
  titre: "Recherche acte et inscription",
  niveauNavigation: 1
});

export const INFO_PAGE_RECHERCHE_ACTE = creerInfoPageRECE({
  url: `${BASE_PAGES_RECHERCHE}/acte`,
  titre: "Recherche acte",
  niveauNavigation: 1
});

export const INFO_PAGE_RECHERCHE_REQUETE = creerInfoPageRECE({
  url: `${BASE_PAGES_RECHERCHE}/requete`,
  titre: "Recherche requête",
  niveauNavigation: 1
});
