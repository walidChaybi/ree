import { IRMCTitulaire } from "./IRMCTitulaire";
import { IRMCDateCreation } from "./dateCreation/IRMCDateCreation";

export interface IRMCActeInscription {
  titulaire: IRMCTitulaire;
  datesDebutFinAnnee: IRMCDateCreation;
}
