import { ETypeInscriptionRcRca } from "@model/etatcivil/enum/ETypeInscriptionRcRca";

export interface IResultatRMCInscription {
  idInscription: string;
  idPersonne: string;
  nom?: string;
  autresNoms?: string;
  prenoms?: string;
  dateNaissance?: string;
  paysNaissance?: string;
  numeroInscription?: string;
  nature?: string;
  typeInscription?: ETypeInscriptionRcRca;
  statutInscription?: string;
  categorie: string;
  anneeInscription?: string;
  dateInscription?: string;
}
