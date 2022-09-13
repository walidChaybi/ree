import { SimplePersonne } from "@pages/fiche/contenu/fournisseurDonneesBandeau/IFournisseurDonneesBandeau";
import { IAlerte } from "./IAlerte";
import { IStatutFiche } from "./IStatutFiche";

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
