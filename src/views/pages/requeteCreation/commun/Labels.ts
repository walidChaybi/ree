import { getLibelle } from "@util/Utils";

export const SDANF = getLibelle("SDANF");
export const REQUETE = getLibelle("Requête");
export const UNION = getLibelle("Union");
export const ENFANT = getLibelle("Enfant");
export const INFOS = getLibelle("Informations");
export const UNION_ACTUELLE = getLibelle("Union actuelle");

const requete = {
  liee: getLibelle(`${REQUETE} liée`),
  description: getLibelle(`Description de la requête`),
  sousType: getLibelle("Sous-type")
};

const requeteTranscription = {
  description: getLibelle(`Requête n°`)
};

const infos = {
  specifiques: getLibelle(`${INFOS} spécifiques`)
};

const historique = {
  scecSdanf: "Historique SCEC/SDANF"
};

const sdanf = {
  statut: getLibelle(`Statut ${SDANF}`),
  decision: getLibelle(`Décision ${SDANF}`)
};

const union = {
  anterieur: getLibelle(`${UNION} antérieure`),
  anterieurs: getLibelle(`${UNION}s antérieures`),
  mariage: getLibelle("Mariage"),
  PACS: getLibelle("PACS"),
  dissolution: getLibelle("Dissolution"),
  deces: getLibelle("Décès")
};

const enfant = {
  mineurs: getLibelle(`${ENFANT}s mineurs`),
  majeur: getLibelle(`${ENFANT} majeur`)
};

const nationalite = {
  defaut: getLibelle("FR/ETR")
};

export const resume = {
  requete,
  requeteTranscription,
  infos,
  historique,
  identification: getLibelle("Identification"),
  francisation: getLibelle("Francisation"),
  signale: getLibelle("Signalé"),
  campagne: getLibelle("Campagne"),
  SDANF: sdanf,
  union,
  requerant: getLibelle("Requérant"),
  institutionnel: getLibelle("Institutionnel"),
  titulaire: getLibelle("Titulaire"),
  enfant,
  parent: getLibelle("Parent"),
  nationalite,
  effetCollectif: getLibelle("Effet collectif"),
  enfantMineurHorsEffetCollectif: getLibelle(
    "Enfant mineur hors effet collectif"
  ),
  enfantMineurAttenteSDANF: getLibelle(
    "Enfant mineur en attente décision SDANF"
  ),
  residence: getLibelle("Résidence"),
  fraterie: getLibelle("Fratrie")
};

export const PJ = {
  description: getLibelle("Pièces justificatives / annexes")
};

const Labels = {
  resume,
  PJ
};



export default Labels;
