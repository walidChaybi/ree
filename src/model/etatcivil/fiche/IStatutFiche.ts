import { IDateCompose } from "../../../views/common/util/DateUtils";

export interface IStatutFiche {
  statut: string;
  dateEvenement: IDateCompose;
  motif: string;
  villeEvenement: string;
  departementEvenement: string;
  paysEvenement: string;
  complementMotif: string;
}
