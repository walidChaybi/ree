import { IAlerte } from "./IAlerte";
import { IStatutFiche } from "./IStatutFiche";
import { SimplePersonne } from "./SimplePersonne";

export interface IBandeauFiche {
  titreFenetre: string;
  categorie: string;
  identifiant: string;
  registre?: string;
  annee: string;
  numero: string;
  statutsFiche: IStatutFiche[];
  personnes: SimplePersonne[];
  alertes?: IAlerte[];
  dateDerniereMaj: string;
  dateDerniereDelivrance: string;
}
