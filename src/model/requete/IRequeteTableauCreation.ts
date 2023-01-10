import { TagPriorisation } from "./enum/TagPriorisation";
import { IRequeteTableau } from "./IRequeteTableau";

export interface IRequeteTableauCreation extends IRequeteTableau {
  numeroFonctionnel: string;
  numeroNatali: string;
  numeroDila: string;
  numeroAncien: string;
  dateDerniereAction: string;
  postulant: string;
  numeroAffichage: string;
  idEntiteRattachement?: string;
  attribueA?: string;
  tagPriorisation: TagPriorisation;
  attribueAChecked?: boolean;
}
