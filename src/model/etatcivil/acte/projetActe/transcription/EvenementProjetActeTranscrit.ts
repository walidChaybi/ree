import { EPrepositionLieu } from "@model/etatcivil/enum/EPrepositionLieu";

export interface IEvenementProjetActeTranscritDto {
  id?: string;
  jour?: number;
  mois?: number;
  annee?: number;
  voie?: string;
  ville?: string;
  arrondissement?: string;
  region?: string;
  departement?: string;
  pays?: string;
  heure?: number;
  minute?: number;
  neDansLeMariage?: boolean;
  prepositionLieu?: keyof typeof EPrepositionLieu;
}

export class EvenementProjetActeTranscrit {
  private constructor(
    public readonly annee?: number,
    public readonly id?: string,
    public readonly jour?: number,
    public readonly mois?: number,
    public readonly voie?: string,
    public readonly ville?: string,
    public readonly arrondissement?: string,
    public readonly region?: string,
    public readonly pays?: string,
    public readonly heure?: number,
    public readonly minute?: number,
    public readonly neDansLeMariage?: boolean,
    public readonly preposition?: keyof typeof EPrepositionLieu
  ) {}

  public static readonly depuisDto = (evenement: IEvenementProjetActeTranscritDto): EvenementProjetActeTranscrit => {
    return new EvenementProjetActeTranscrit(
      evenement.annee,
      evenement.id ?? "",
      evenement.jour,
      evenement.mois,
      evenement.voie,
      evenement.ville,
      evenement.arrondissement,
      evenement.region,
      evenement.pays,
      evenement.heure,
      evenement.minute,
      evenement.neDansLeMariage,
      evenement.prepositionLieu
    );
  };
}
