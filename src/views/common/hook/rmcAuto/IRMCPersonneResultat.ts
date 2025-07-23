import { ETypeFiche } from "@model/etatcivil/enum/ETypeFiche";
import { Sexe } from "@model/etatcivil/enum/Sexe";

export interface IRMCPersonneResultat {
  personne: IPersonneRMCPersonne;
  actesInscriptions: IActeInscriptionRMCPersonne[];
}

export interface IPersonneRMCPersonne {
  idPersonne: string;
  nom: string;
  autresNoms: string[];
  prenoms: string[];
  dateNaissance: string;
  lieuNaissance: string;
  sexe: Sexe;
}

export interface IActeInscriptionRMCPersonne {
  idActeInscription: string;
  nature: string;
  statut: string;
  reference: string;
  typeFiche: ETypeFiche;
  statutOuType: string;
}
