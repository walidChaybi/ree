/* v8 ignore start */
export type IEvenementProjetActeTranscritDto = {
  id?: string | null;
  jour: number | null;
  mois: number | null;
  annee: number | null;
  voie: string | null;
  ville: string | null;
  arrondissement: string | null;
  region: string | null;
  departement?: string | null;
  pays: string | null;
  heure: number | null;
  minute: number | null;
  neDansLeMariage: boolean | null;
};

export class EvenementProjetActeTranscrit {
  private constructor(
    public readonly id: string | null,
    public readonly jour: number | null,
    public readonly mois: number | null,
    public readonly annee: number | null,
    public readonly voie: string | null,
    public readonly ville: string | null,
    public readonly arrondissement: string | null,
    public readonly region: string | null,
    public readonly pays: string | null,
    public readonly heure: number | null,
    public readonly minute: number | null,
    public readonly neDansLeMariage: boolean | null
  ) {}

  public static readonly depuisDto = (evenement: IEvenementProjetActeTranscritDto): EvenementProjetActeTranscrit => {
    return new EvenementProjetActeTranscrit(
      evenement.id ?? null,
      evenement.jour,
      evenement.mois,
      evenement.annee,
      evenement.voie,
      evenement.ville,
      evenement.arrondissement,
      evenement.region,
      evenement.pays,
      evenement.heure,
      evenement.minute,
      evenement.neDansLeMariage
    );
  };
}
/* v8 ignore stop */
