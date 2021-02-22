import { SimplePersonne } from "../../../views/pages/fiche/contenu/fournisseurDonneesBandeau/IFournisseurDonneesBandeau";
import { IStatutFiche } from "./IStatutFiche";
import { IAlerte } from "./IAlerte";

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
