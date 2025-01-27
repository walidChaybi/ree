/* istanbul ignore file */

import { TagPriorisation } from "./enum/TagPriorisation";
import { IRequeteTableauConsulaire } from "./IRequeteTableauConsulaire";
import { IRequeteTableauCreation } from "./IRequeteTableauCreation";
import { IRequeteTableauDelivrance } from "./IRequeteTableauDelivrance";
import { IRequeteTableauInformation } from "./IRequeteTableauInformation";
import { ITitulaireRequeteTableau } from "./ITitulaireRequeteTableau";

export type TRequeteTableau = IRequeteTableauDelivrance | IRequeteTableauInformation | IRequeteTableauCreation | IRequeteTableauConsulaire;

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
