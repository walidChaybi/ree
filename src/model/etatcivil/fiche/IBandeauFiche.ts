import { IAlerte } from "./IAlerte";
import { SimplePersonne } from "./SimplePersonne";
import { StatutFiche } from "./StatutFiche";

export interface IBandeauFiche {
  titreFenetre: string;
  categorie: string;
  identifiant: string;
  registre?: string;
  annee: string;
  numero: string;
  statutsFiche: StatutFiche[];
  personnes: SimplePersonne[];
  alertes?: IAlerte[];
  dateDerniereMaj: string;
  dateDerniereDelivrance: string;
}
