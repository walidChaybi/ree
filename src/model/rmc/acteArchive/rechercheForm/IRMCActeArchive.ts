import { IRMCDateCreation } from "../../acteInscription/rechercheForm/dateCreation/IRMCDateCreation";
import { IRMCEvenement } from "../../acteInscription/rechercheForm/IRMCEvenement";
import { IRMCTitulaire } from "../../acteInscription/rechercheForm/IRMCTitulaire";
import { IRMCRegistreArchive } from "./IRMCRegistreArchive";

export interface IRMCActeArchive {
  titulaire?: IRMCTitulaire;
  datesDebutFinAnnee?: IRMCDateCreation;
  registreArchive?: IRMCRegistreArchive;
  evenement?: IRMCEvenement;
}
