export const LIBELLE_FONCTION_AGENT_1 = "code1.libelle.fonction.agent";
export const LIBELLE_FONCTION_AGENT_2 = "code2.libelle.fonction.agent";
export const LIBELLE_FONCTION_AGENT_3 = "code3.libelle.fonction.agent";
export const NOM_DIRECTION = "nom.direction";
export const DIRECTION_LIGNE_2 = "nom.direction.ligne2";
export const DIRECTION_LIGNE_3 = "nom.direction.ligne3";
export const ADRESSE_INTERNET_MINISTERE = "adresse.internet.ministere";
export const SERVICE_DELIVREUR_NOM = "service.delivreur.nom";
export const SERVICE_DELIVREUR_RUE = "service.delivreur.adresse.rue";
export const SERVICE_DELIVREUR_VILLE = "service.delivreur.adresse.ville";
export const SERVICE_DELIVREUR_SERVICE_TELEPHONE =
  "service.delivreur.service.telephone";
export const SERVICE_DELIVREUR_SERVICE_VILLE =
  "service.delivreur.service.ville";
export const BLOC_MARQUES_MINISTERE = "sceau.ministere.affaires.etrangeres";

export const CLES_COMPOSITION = [
  LIBELLE_FONCTION_AGENT_1,
  LIBELLE_FONCTION_AGENT_2,
  LIBELLE_FONCTION_AGENT_3,
  NOM_DIRECTION,
  DIRECTION_LIGNE_2,
  DIRECTION_LIGNE_3,
  ADRESSE_INTERNET_MINISTERE,
  SERVICE_DELIVREUR_NOM,
  SERVICE_DELIVREUR_RUE,
  SERVICE_DELIVREUR_VILLE,
  SERVICE_DELIVREUR_SERVICE_TELEPHONE,
  SERVICE_DELIVREUR_SERVICE_VILLE,
  BLOC_MARQUES_MINISTERE
];

// Toutes les clés de paramètre (pour l'instant il n'y a que les clés de compostions,
//  si d'autres sont nécessaires faire un "concat" des différents tableaux de clé)
export const CLES = CLES_COMPOSITION;
