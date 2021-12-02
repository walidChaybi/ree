import {
  ANNEE,
  DATE_EVENEMENT,
  JOUR,
  MOIS,
  NAISSANCE,
  NATIONALITE,
  NATURE,
  NOM,
  NOM_INSTITUTION,
  NOM_NAISSANCE,
  NOM_USAGE,
  PAYS_EVENEMENT,
  PRENOM,
  PRENOMS,
  PRENOM_1,
  PRENOM_2,
  PRENOM_3,
  RAISON_SOCIALE,
  SEXE,
  TYPE,
  VILLE_EVENEMENT
} from "./modelForm/ISaisirRequetePageModel";

export const mandataireVide = {
  [TYPE]: "",
  [NATURE]: "",
  [RAISON_SOCIALE]: "",
  [NOM]: "",
  [PRENOM]: ""
};

export const institutionnelVide = {
  [TYPE]: "",
  [NATURE]: "",
  [NOM_INSTITUTION]: "",
  [NOM]: "",
  [PRENOM]: ""
};

export const particulierVide = {
  [NOM_NAISSANCE]: "",
  [NOM_USAGE]: "",
  [PRENOM]: ""
};

export const interesseVide = {
  [NOM_NAISSANCE]: "",
  [NOM_USAGE]: "",
  [PRENOMS]: {
    [PRENOM_1]: "",
    [PRENOM_2]: "",
    [PRENOM_3]: ""
  },
  [SEXE]: "",
  [NAISSANCE]: {
    [DATE_EVENEMENT]: {
      [JOUR]: "",
      [MOIS]: "",
      [ANNEE]: ""
    },
    [VILLE_EVENEMENT]: "",
    [PAYS_EVENEMENT]: ""
  },
  [NATIONALITE]: ""
};
