import { Sexe } from "@model/etatcivil/enum/Sexe";
import { RolePersonneSauvegardee } from "@model/requete/enum/RolePersonneSauvegardee";

export interface IRMCPersonneResultat {
  personne: IPersonneRMCPersonne;
  actesOuInscriptionsLies: IActesOuInscriptionsRMCPersonne[];
}

export interface IPersonneRMCPersonne {
  idPersonne: string;
  nom: string;
  autresNoms: string[];
  prenoms: string[];
  dateNaissance: string;
  lieuNaissance: string;
  sexe: Sexe;
  role?: RolePersonneSauvegardee;
}

export interface IActesOuInscriptionsRMCPersonne {
  idActeOuInscription: string;
  nature: string;
  statut: string;
  reference: string;
  categorieRepertoire: string;
  statutOuType: string;
}
