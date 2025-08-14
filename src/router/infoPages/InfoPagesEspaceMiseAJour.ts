import { creerInfoPageRECE } from "./InfoPageRECE";

const BASE_PAGES_MISE_A_JOUR = "espace-mise-a-jour";
const ID_REQUETE = ":idRequeteParam";
const ID_ACTE = ":idActeParam";

export const INFO_PAGE_MISE_A_JOUR_MENTION_SUITE_AVIS = creerInfoPageRECE({
  url: `${BASE_PAGES_MISE_A_JOUR}/${ID_REQUETE}/mention-suite-avis/${ID_ACTE}`,
  titre: "Mise à jour acte (mention suite avis)",
  niveauNavigation: 2
});

export const INFO_PAGE_MISE_A_JOUR_MENTION_AUTRE = creerInfoPageRECE({
  url: `${BASE_PAGES_MISE_A_JOUR}/${ID_REQUETE}/mention-autre/${ID_ACTE}`,
  titre: "Mise à jour acte (mention autre)",
  niveauNavigation: 2
});

export const INFO_PAGE_MISE_A_JOUR_ANALYSE_MARGINALE = creerInfoPageRECE({
  url: `${BASE_PAGES_MISE_A_JOUR}/${ID_REQUETE}/analyse-marginale/${ID_ACTE}`,
  titre: "Mise à jour acte (analyse marginale)",
  niveauNavigation: 2
});
