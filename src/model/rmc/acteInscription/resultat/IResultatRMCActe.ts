import { TypeFamille } from "@model/etatcivil/enum/TypeFamille";

export interface IResultatRMCActe {
  idActe: string;
  nom: string;
  autresNoms: string;
  prenoms: string;
  dateNaissance: string;
  paysNaissance: string;
  nature: string;
  registre: string;
  familleRegistre: TypeFamille;
  type: string;
}
