export const SDANF = "SDANF";
export const REQUETE = "Requête";
export const UNION = "Union";
export const ENFANT = "Enfant";
export const INFOS = "Informations";
export const UNION_ACTUELLE = "Union actuelle";

const requete = {
  liee: `${REQUETE} liée`,
  description: `Description de la requête`,
  sousType: "Sous-type"
};

const requeteTranscription = {
  description: `Requête n°`
};

const infos = {
  specifiques: `${INFOS} spécifiques`
};

const historique = {
  scecSdanf: "Historique des actions"
};

const sdanf = {
  statut: `Statut ${SDANF}`,
  decision: `Décision ${SDANF}`
};

const union = {
  anterieur: `${UNION} antérieure`,
  anterieurs: `${UNION}s antérieures`,
  mariage: "Mariage",
  PACS: "PACS",
  dissolution: "Dissolution",
  deces: "Décès"
};

const enfant = {
  mineurs: `${ENFANT}s mineurs`,
  majeur: `${ENFANT} majeur`
};

const nationalite = {
  defaut: "FR/ETR"
};

export const resume = {
  requete,
  requeteTranscription,
  infos,
  historique,
  identification: "Identification",
  francisation: "Francisation",
  signale: "Signalé",
  campagne: "Campagne",
  SDANF: sdanf,
  union,
  requerant: "Requérant",
  institutionnel: "Institutionnel",
  titulaire: "Titulaire",
  enfant,
  parent: "Parent",
  nationalite,
  effetCollectif: "Effet collectif",
  enfantMineurHorsEffetCollectif: "Enfant mineur hors effet collectif",
  enfantMineurAttenteSDANF: "Enfant mineur en attente décision SDANF",
  residence: "Résidence",
  fraterie: "Fratrie"
};

const PJ = {
  description: "Pièces justificatives / annexes"
};

const Labels = {
  resume,
  PJ
};

export default Labels;
