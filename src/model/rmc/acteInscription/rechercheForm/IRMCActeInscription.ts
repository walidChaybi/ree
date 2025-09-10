import { IRMCDateCreation } from "./dateCreation/IRMCDateCreation";
import { IRMCEvenement } from "./IRMCEvenement";
import { IRMCRegistreRepertoire } from "./IRMCRegistreRepertoire";
import { IRMCTitulaire } from "./IRMCTitulaire";

export interface IRMCActeInscription {
  titulaire?: IRMCTitulaire;
  datesDebutFinAnnee?: IRMCDateCreation;
  registreRepertoire?: IRMCRegistreRepertoire;
  evenement?: IRMCEvenement;
}
