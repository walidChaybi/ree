import { IDateCompose } from "../../../views/common/util/DateUtils";

export interface IStatutFiche {
  statut: string;
  dateStatut: number;
  motif?: string;
  statutFicheEvenement?: IStatutFicheEvenement;
  complementMotif?: string;
}

export interface IStatutFicheEvenement {
  date?: IDateCompose;
  ville?: string;
  region?: string;
  pays?: string;
}
