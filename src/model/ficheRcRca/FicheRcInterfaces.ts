import { IDateCompose } from "../../views/common/util/DateUtils";
import { Statut } from "../Statut";
import { TypeAutorite } from "./TypeAutorite";
import { TypeDecision } from "./TypeDecision";

export interface IFicheRc {
  id: string;
  categorie: string;
  annee: string;
  numero: string;
  dateInscription: number;
  dateDerniereMaj: number;
  dateDerniereDelivrance: number;
  alertes: IAlerte[];
  decision: IDecisionRc;
  mariageInteresses: IMariageInteresse;
  interesses: IInteresse[];
  statutsFiche: IStatutFiche[];
  nature: string;
  typeInscription: string;
  mandataires: string[];
  duree: IDureeInscription;
  inscriptionsImpactees: IInscriptionsImpactees[];
  inscriptionsLiees: IInscriptionLie[];
}

export interface IInscriptionsImpactees {
  id: string;
  numero: string;
}

export interface IMariageInteresse {
  villeMariage: string;
  arrondissementMariage: string;
  regionMariage: string;
  paysMariage: string;
  dateMariage: IDateCompose;
  aletranger: boolean;
}

export interface IAlerte {
  alerte: string;
  dateCreation: number;
}

export interface IDureeInscription {
  nombreDuree?: number;
  uniteDuree?: string;
  dateFinDeMesure?: number;
  autreDuree?: string;
}

export interface IDecisionRc {
  dateDecision: number;
  type: TypeDecision;
  autorite: IAutorite;
  enrolementRg: string;
  enrolementPortalis: string;
  sourceConfirmation: ISourceConfirmation;
}

export interface ISourceConfirmation {
  autorite: IAutorite;
  dateDecision: number;
  type: TypeDecision;
  enrolementRg: string;
  enrolementPortalis: string;
}

export interface IInscriptionLie {
  typeInscription: string;
  numeroRc: string;
  idInscription: string;
}

export interface IStatutFiche {
  statut: Statut;
  dateEvenement: IDateCompose;
  motif: string;
  villeEvenement: string;
  departementEvenement: string;
  paysEvenement: string;
  complementMotif: string;
}

export interface IInteresse {
  numeroOrdreSaisi: number;
  nomFamille: string;
  villeNaissance: string;
  paysNaissance: string;
  regionNaissance: string;
  arrondissementNaissance: string;
  nationalite: string;
  sexe: string;
  autreNoms: string[];
  autrePrenoms: string[];
  prenoms: IPrenom[];
  dateNaissance: IDateCompose;
}

export interface IPrenom {
  prenom: string;
  numeroOrdre: number;
}

export interface IAutorite {
  type?: TypeAutorite;
  numeroDepartement: string;
  libelleDepartement: string;
  ville: string;
  region: string;
  pays: string;
  arrondissement: string;
  nomNotaire: string;
  prenomNotaire: string;
  numeroCrpcen: string;
  nomOnac: string;
  prenomOnac: string;
}
