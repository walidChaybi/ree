export interface IEvenementUnion {
  id: string;
  type: string;
  jour?: number;
  mois?: number;
  annee?: number;
  ville?: string;
  arrondissement?: string;
  region?: string;
  pays?: string;
  situationActuelle?: boolean;
  dateFormatee?: string;
  lieuFormate?: string;
}

export const EvenementUnion = {
  getDateEtLieuFormate(evenementUnion?: IEvenementUnion): string | undefined {
    let dateLieuFormate;

    dateLieuFormate = evenementUnion?.dateFormatee || "";
    dateLieuFormate +=
      evenementUnion?.dateFormatee && evenementUnion?.lieuFormate ? ", " : "";
    dateLieuFormate += evenementUnion?.lieuFormate || "";

    return dateLieuFormate;
  }
};
