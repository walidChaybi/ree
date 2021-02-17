import { IDateCompose } from "../../../views/common/util/DateUtils";
import { NatureActe } from "../../etatcivil/enum/NatureActe";

export interface IResultatRMCActe {
  id: string;
  nom: string;
  autresNoms: string[];
  prenoms: string[];
  dateNaissance: IDateCompose;
  paysNaissance: string;
  natureActe: NatureActe;
  registre: string;
}
