import { getLibelle } from "../../../../common/util/Utils";

export const SDANF = getLibelle("SDANF");
export const REQUETE = getLibelle("Requête");
export const UNION = getLibelle("Union");
export const ENFANT = getLibelle("Enfant");
export const INFOS = getLibelle("Informations");

const requete = {
  liee: getLibelle(`${REQUETE} liée`),
  description: getLibelle(`Description ${REQUETE}`),
  sousType: getLibelle("Sous-type")
};

const infos = {
  specifiques: getLibelle(`${INFOS} spécifiques`)
};

const sdanf = {
  statut: getLibelle(`Statut ${SDANF}`),
  decision: getLibelle(`Décision ${SDANF}`)
};

const union = {
  anterieur: getLibelle(`${UNION} antérieur`),
  anterieurs: getLibelle(`${UNION}s antérieurs`),
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
  infos,
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
  residence: getLibelle("Résidence"),
  fraterie: getLibelle("Fraterie")
};

export const PJ = {
  description: getLibelle("Pièces justificatives / annexes")
};

const Labels = {
  resume,
  PJ
};

export default Labels;
