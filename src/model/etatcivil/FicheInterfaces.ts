import { IDateCompose } from "../../views/common/util/DateUtils";
import { TypeAutorite } from "./TypeAutorite";
import { TypeDecision } from "./TypeDecision";
import { TypeNatureFicheRc } from "./NatureRc";
import { TypeMandataire } from "./Mandataires";
import { TypeInscriptionRc } from "./InscriptionRc";
import { TypeFiche } from "./TypeFiche";
import { TypeNatureFicheRca } from "./NatureRca";
import { SimplePersonne } from "../../views/pages/fiche/contenu/fournisseurDonneesBandeau/IFournisseurDonneesBandeau";

export interface IBandeauFiche {
  titreFenetre: string;
  categorie: string;
  identifiant: string;
  registre?: string;
  annee: string;
  numero: string;
  statutsFiche: IStatutFiche[];
  personnes: SimplePersonne[];
  alertes?: IAlerte[];
  dateDerniereMaj: string;
  dateDerniereDelivrance: string;
}

export interface IFicheRcRca {
  id: string;
  categorie: TypeFiche;
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
  nature: TypeNatureFicheRc | TypeNatureFicheRca;
  typeInscription: TypeInscriptionRc;
  mandataires: TypeMandataire[];
  duree: IDureeInscription;
  inscriptionsImpactees: IInscriptionsImpactees[];
  inscriptionsLiees: IInscriptionLie[];
}

export interface IInscriptionsImpactees {
  id: string;
  numero: string;
  annee: string;
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
  dateDecisionEtrangere: number;
  type: TypeDecision;
  autorite: IAutorite;
  enrolementRg: string;
  enrolementPortalis: string;
  sourceConfirmation: ISourceConfirmation;
}

export interface ISourceConfirmation {
  autorite: IAutorite;
  dateDecision: number;
  dateDecisionEtrangere: number;
  type: TypeDecision;
  enrolementRg: string;
  enrolementPortalis: string;
}

export interface IInscriptionLie {
  typeInscription: TypeInscriptionRc;
  numero: string;
  annee: string;
  id: string;
}

export interface IStatutFiche {
  statut: string;
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
  villeDeces: string;
  paysDeces: string;
  regionDeces: string;
  arrondissementDeces: string;
  nationalite: string;
  sexe: string;
  autreNoms: string[];
  autrePrenoms: string[];
  prenoms: IPrenom[];
  dateNaissance: IDateCompose;
  dateDeces: IDateCompose;
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
  titreOnac?: string;
}
