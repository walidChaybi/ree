import { IDateCompose } from "../../../views/common/util/DateUtils";

export interface IRMCTitulaire {
  nom: string;
  prenom: string;
  dateNaissance: IDateCompose;
  paysNaissance: string;
}
