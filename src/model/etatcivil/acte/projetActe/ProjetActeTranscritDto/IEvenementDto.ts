export interface IEvenementDto {
  jour: number | null;
  mois: number | null;
  annee: number | null;
  voie: string | null;
  ville: string | null;
  arrondissement: string | null;
  region: string | null;
  departement: string | null;
  pays: string | null;
}

export type IEvenementCompletDto = IEvenementDto & {
  heure: number | null;
  minute: number | null;
  neDansLeMariage: boolean | null;
};
