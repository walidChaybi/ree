import { DateCompose } from "../../../common/util/DateUtils";

export interface FicheRc {
  idInscription: string;
  categorieInscription: string;
  numero: string;
  dateInscription: number;
  dateDerniereMaj: number;
  dateDerniereDelivrance: number;
  alertes: Alerte[];
  decision: DecisionRc;
  mariageInteresses: MariageInteresse;
  interesses: Interesse[];
  statutsFiche: StatutFiche[];
  nature: string;
  typeInscription: string;
  mandataires: string[];
  duree: DureeInscription;

  //pas presents
  numeroRcImpactes: string[];
  inscriptionsLiees: InscriptionLie[];
}

export interface MariageInteresse {
  villeMariage: string;
  regionMariage: string;
  paysMariage: string;
  dateMariage: DateCompose;
  aletranger: boolean;
}

export interface Alerte {
  alerte: string;
  dateCreation: string;
}

export interface DureeInscription {
  nombreDuree: number;
  uniteDuree: string;
  dateFinDeMesure: number;
}

export interface DecisionRc {
  dateDecision: number;
  type: string;
  autorite: Autorite;
  sourceConfirmation: Autorite;
}

export interface InscriptionLie {
  typeInscription: string;
  numeroRc: string;
  idInscription: string;
}

export interface StatutFiche {
  statut: string;
  date: DateCompose;
  motif: string;
  villeEvenement: string;
  departementEvenement: string;
  paysEvenement: string;
  complementMotif: string;
}

export interface Interesse {
  numeroOrdreSaisi: number;
  nomFamille: string;
  villeNaissance: string;
  paysNaissance: string;
  regionNaissance: string;
  arrondissementNaissance: string;
  nationalite: string;
  autreNoms: string[];
  autrePrenoms: string[];
  prenoms: string[];
  dateNaissance: DateCompose;
  sexe: string;
}

export interface Prenom {
  prenom: string;
  numeroOrdre: number;
}

export interface Autorite {
  type: string;
  numeroDepartement: number;
  libelleDepartement: string;
  ville: string;
  pays: string;
  arrondissement: number;
  nomNotaire: string;
  prenomNotaire: string;
  numeroCrpcen: string;
  nomOnac: string;
  prenomOnac: string;
  enrolementRg: string;
  enrolementPortails: string;
  dateDecisionEtrangere: number;
}
