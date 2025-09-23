import DateUtils, { TDateArrayDTO } from "@util/DateUtils";
import DateRECE from "../../../utils/DateRECE";
import { champsObligatoiresDuDtoAbsents } from "../../commun/dtoUtils";
import { IPersonneDTO, Personne } from "../commun/Personne";
import { IAlerte } from "../fiche/IAlerte";
import { IStatutFicheDTO, StatutFiche } from "../fiche/StatutFiche";
import { IMariageInteresse } from "./IMariageInteresse";
import { IInteresseDTO, Interesse } from "./Interesse";

export interface IFicheInscriptionDto {
  id: string;
  annee: string;
  numero: string;
  dateInscription: TDateArrayDTO;
  dateDerniereDelivrance?: number;
  dateDerniereMaj?: number;
  alertes: IAlerte[];
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
    "alertes",
    "interesses",
    "statutsFiche",
    "personnes"
  ];

  protected constructor(
    public readonly id: string,
    public readonly annee: string,
    public readonly numero: string,
    public readonly dateInscription: Date,
    public readonly dateDerniereDelivrance: DateRECE | null,
    public readonly dateDerniereMaj: DateRECE | null,
    public readonly alertes: IAlerte[],
    public readonly interesses: Interesse[],
    public readonly statutsFiche: StatutFiche[],
    public readonly personnes: Personne[],
    public readonly mariageInteresses?: IMariageInteresse
  ) {}

  protected static readonly inscriptionDepuisDto = (ficheInscription: IFicheInscriptionDto): FicheInscription | null => {
    if (champsObligatoiresDuDtoAbsents("FicheInscription", ficheInscription, this.champsObligatoires)) return null;

    return new FicheInscription(
      ficheInscription.id,
      ficheInscription.annee,
      ficheInscription.numero,
      DateUtils.getDateDepuisDateArrayDto(ficheInscription.dateInscription),
      ficheInscription.dateDerniereDelivrance ? DateRECE.depuisTimestamp(ficheInscription.dateDerniereDelivrance) : null,
      ficheInscription.dateDerniereMaj ? DateRECE.depuisTimestamp(ficheInscription.dateDerniereMaj) : null,
      ficheInscription.alertes,
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
    dateInscription: Date,
    dateDerniereDelivrance: DateRECE | null,
    dateDerniereMaj: DateRECE | null,
    alertes: IAlerte[],
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
      this.interesses,
      this.statutsFiche,
      this.personnes,
      this.mariageInteresses
    ];
  }
}
