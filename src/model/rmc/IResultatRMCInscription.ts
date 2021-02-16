import { IDateCompose } from "../../views/common/util/DateUtils";

export interface IResultatRMCInscription {
  id: string;
  nom: string;
  autresNoms: string[];
  prenoms: string[];
  dateNaissance: IDateCompose;
  paysNaissance: string;
  numeroInscription: string;
  natureInscription: string;
  typeInscription: string;
  statutFiche: string;
}
