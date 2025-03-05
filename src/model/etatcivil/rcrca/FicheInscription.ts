import DateUtils, { TDateArrayDTO } from "@util/DateUtils";
import { IPersonneDTO, Personne } from "../commun/Personne";
import { IAlerte } from "../fiche/IAlerte";
import { IStatutFicheDTO, StatutFiche } from "../fiche/StatutFiche";
import { DecisionRcRca, IDecisionRcRcaDTO } from "./DecisionRcRca";
import { IMariageInteresse } from "./IMariageInteresse";
import { IInteresseDTO, Interesse } from "./Interesse";

export interface IFicheInscriptionDto {
  id: string;
  annee: string;
  numero: string;
  dateInscription: TDateArrayDTO | null;
  dateDerniereDelivrance: number | null;
  dateDerniereMaj?: number;
  alertes: IAlerte[];
  decision: IDecisionRcRcaDTO;
  interesses: IInteresseDTO[];
  statutsFiche: IStatutFicheDTO[];
  personnes: IPersonneDTO[];
  mariageInteresses?: IMariageInteresse;
}

export class FicheInscription {
  private static readonly champsObligatoires: (keyof IFicheInscriptionDto)[] = [
    "id",
    "annee",
    "numero",
    "dateInscription",
    "dateDerniereDelivrance",
    "alertes",
    "decision",
    "interesses",
    "statutsFiche",
    "personnes"
  ];

  protected constructor(
    public readonly id: string,
    public readonly annee: string,
    public readonly numero: string,
    public readonly dateInscription: Date | null,
    public readonly dateDerniereDelivrance: Date | null,
    public readonly dateDerniereMaj: Date | null,
    public readonly alertes: IAlerte[],
    public readonly decision: DecisionRcRca | null,
    public readonly interesses: Interesse[],
    public readonly statutsFiche: StatutFiche[],
    public readonly personnes: Personne[],
    public readonly mariageInteresses?: IMariageInteresse
  ) {}

  protected static readonly inscriptionDepuisDto = (ficheInscription: IFicheInscriptionDto): FicheInscription | null => {
    if (FicheInscription.champsObligatoires.some(cle => ficheInscription[cle] === undefined)) {
      console.error(`Un champ obligatoire d'un ${typeof ficheInscription} n'est pas défini.`);
      return null;
    }

    return new FicheInscription(
      ficheInscription.id,
      ficheInscription.annee,
      ficheInscription.numero,
      ficheInscription.dateInscription ? DateUtils.getDateDepuisDateArrayDto(ficheInscription.dateInscription) : null,
      ficheInscription.dateDerniereDelivrance ? DateUtils.getDateFromTimestamp(ficheInscription.dateDerniereDelivrance) : null,
      ficheInscription.dateDerniereMaj ? DateUtils.getDateFromTimestamp(ficheInscription.dateDerniereMaj) : null,
      ficheInscription.alertes,
      DecisionRcRca.depuisDto(ficheInscription.decision),
      ficheInscription.interesses.map(Interesse.depuisDto).filter((interesse): interesse is Interesse => interesse !== null),
      ficheInscription.statutsFiche
        .map<StatutFiche | null>(StatutFiche.depuisDto)
        .filter((statutFiche): statutFiche is StatutFiche => statutFiche !== null),
      ficheInscription.personnes
        .map<Personne | null>(personne => Personne.depuisDto(personne, ficheInscription.numero))
        .filter((personne: Personne | null): personne is Personne => personne !== null),
      ficheInscription.mariageInteresses
    );
  };

  protected get attributs(): [
    id: string,
    annee: string,
    numero: string,
    dateInscription: Date | null,
    dateDerniereDelivrance: Date | null,
    dateDerniereMaj: Date | null,
    alertes: IAlerte[],
    decision: DecisionRcRca | null,
    interesses: Interesse[],
    statutsFiche: StatutFiche[],
    personnes: Personne[],
    mariageInteresses?: IMariageInteresse
  ] {
    return [
      this.id,
      this.annee,
      this.numero,
      this.dateInscription,
      this.dateDerniereDelivrance,
      this.dateDerniereMaj,
      this.alertes,
      this.decision,
      this.interesses,
      this.statutsFiche,
      this.personnes,
      this.mariageInteresses
    ];
  }
}
