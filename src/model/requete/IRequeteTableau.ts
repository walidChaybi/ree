import { TagPriorisation } from "./enum/TagPriorisation";
import { ITitulaireRequeteTableau } from "./ITitulaireRequeteTableau";

export interface IRequeteTableau {
  idRequete: string;
  numero?: string;
  type?: string | null;
  sousType: string;
  dateCreation?: string;
  statut?: string;
  nomCompletRequerant?: string;
  titulaires?: ITitulaireRequeteTableau[];
  idUtilisateur?: string;
  tagPriorisation?: TagPriorisation;
  numeroDossier?: string;
  nature?: string;
  dateDerniereAction?: string;
}
