import { EStatutRcRcaPacs } from "../enum/EStatutRcRcaPacs";
import { IStatutFicheEvenementDTO, StatutFicheEvenement } from "./StatutFicheEvenement";

export interface IStatutFicheDTO {
  statut: keyof typeof EStatutRcRcaPacs;
  dateStatut: number;
  statutFicheEvenement?: IStatutFicheEvenementDTO;
  motif?: string;
  complementMotif?: string;
}

export class StatutFiche {
  private static readonly champsObligatoires: (keyof IStatutFicheDTO)[] = ["statut", "dateStatut"];

  private constructor(
    public readonly statut: EStatutRcRcaPacs,
    public readonly dateStatut: number,
    public readonly statutFicheEvenement: StatutFicheEvenement | null,
    public readonly motif?: string,
    public readonly complementMotif?: string
  ) {}

  public static readonly depuisDto = (statutFiche: IStatutFicheDTO): StatutFiche | null => {
    switch (true) {
      case StatutFiche.champsObligatoires.some(cle => statutFiche[cle] === undefined):
        console.error(`Un champ obligatoire d'un StatutFiche n'est pas défini.`);
        return null;
      case !Object.keys(EStatutRcRcaPacs).includes(statutFiche.statut):
        console.error(
          `Le statut de d'un StatutFiche a la valeur ${statutFiche.statut} au lieu d'une des suivantes : ${Object.keys(EStatutRcRcaPacs)}.`
        );
        return null;
    }

    return new StatutFiche(
      EStatutRcRcaPacs[statutFiche.statut],
      statutFiche.dateStatut,
      StatutFicheEvenement.depuisDto(statutFiche.statutFicheEvenement),
      statutFiche.motif,
      statutFiche.complementMotif
    );
  };
}
