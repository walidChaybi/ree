import { IRMCActe } from "../../acteInscription/rechercheForm/IRMCActe";
import { IRMCEvenement } from "../../acteInscription/rechercheForm/IRMCEvenement";

export interface IRMCRegistreArchive {
  registre?: IRMCActe;
  evenement?: IRMCEvenement;
}
