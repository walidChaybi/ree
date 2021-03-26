import { IRMCTitulaire } from "../../acteInscription/rechercheForm/IRMCTitulaire";
import { IRMCDateCreation } from "../../acteInscription/rechercheForm/dateCreation/IRMCDateCreation";
import { IRMCRegistreArchive } from "./IRMCRegistreArchive";
import { IRMCEvenement } from "../../acteInscription/rechercheForm/IRMCEvenement";

export interface IRMCActeArchive {
  titulaire?: IRMCTitulaire;
  datesDebutFinAnnee?: IRMCDateCreation;
  registreArchive?: IRMCRegistreArchive;
  evenement?: IRMCEvenement;
}
