import { IDateCompose } from "@util/DateUtils";

export interface IStatutFicheEvenementDTO {
  id: string;
  date?: IDateCompose;
  ville?: string;
  region?: string;
  pays?: string;
}

export class StatutFicheEvenement {
  private constructor(
    public readonly date?: IDateCompose,
    public readonly ville?: string,
    public readonly region?: string,
    public readonly pays?: string
  ) {}

  public static readonly depuisDto = (statutFicheEvenement?: IStatutFicheEvenementDTO): StatutFicheEvenement | null => {
    if (!statutFicheEvenement) return null;

    return new StatutFicheEvenement(
      statutFicheEvenement.date,
      statutFicheEvenement.ville,
      statutFicheEvenement.region,
      statutFicheEvenement.pays
    );
  };
}
