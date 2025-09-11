import { IRMCEvenement } from "./IRMCEvenement";
import { IRMCRegistreRepertoire } from "./IRMCRegistreRepertoire";
import { IRMCTitulaire } from "./IRMCTitulaire";

export interface IRMCActeInscription {
  titulaire?: IRMCTitulaire;
  registreRepertoire?: IRMCRegistreRepertoire;
  evenement?: IRMCEvenement;
}
