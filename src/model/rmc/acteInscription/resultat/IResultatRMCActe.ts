import { TypeFamille } from "@model/etatcivil/enum/TypeFamille";

export interface IResultatRMCActe {
  idActe: string;
  nom: string;
  autresNoms: string;
  prenoms: string;
  dateNaissance: string;
  dateEvenement: string;
  paysNaissance: string;
  nature: string;
  referenceRece: string;
  referenceRegistre: string;
  familleRegistre: TypeFamille;
  type: string;
}
