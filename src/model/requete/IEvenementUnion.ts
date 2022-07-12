export interface IEvenementUnion {
  type: string;
  jour?: number;
  mois?: number;
  annee?: number;
  ville?: string;
  arrondissement?: string;
  region?: string;
  pays?: string;
  situationActuelle?: boolean;
}
