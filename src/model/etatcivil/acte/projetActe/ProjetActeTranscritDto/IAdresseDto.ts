export interface IAdresseDto {
  ville: string | null;
  region: string | null;
  pays: string | null;
}

export type IAdresseCompleteDto = IAdresseDto & {
  voie: string | null;
  arrondissement: string | null;
};
