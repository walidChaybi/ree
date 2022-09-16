import { IRMCDateCreation } from "../acteInscription/rechercheForm/dateCreation/IRMCDateCreation";
import { IRMCRequerant } from "../acteInscription/rechercheForm/IRMCRequerant";
import { IRMCTitulaire } from "../acteInscription/rechercheForm/IRMCTitulaire";
import { IRMCFiltreRequete } from "./IRMCFiltreRequete";

export interface IRMCRequete {
  requete?: IRMCFiltreRequete;
  titulaire?: IRMCTitulaire;
  datesDebutFinAnnee?: IRMCDateCreation;
  requerant?: IRMCRequerant;
}
