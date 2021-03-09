import { IRMCTitulaire } from "./IRMCTitulaire";
import { IRMCDateCreation } from "./dateCreation/IRMCDateCreation";
import { IRMCRegistreRepertoire } from "./IRMCRegistreRepertoire";
import { IRMCEvenement } from "./IRMCEvenement";

export interface IRMCActeInscription {
  titulaire?: IRMCTitulaire;
  datesDebutFinAnnee?: IRMCDateCreation;
  registreRepertoire?: IRMCRegistreRepertoire;
  evenement?: IRMCEvenement;
}
