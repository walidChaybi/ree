import { IRMCDateCreation } from "../acteInscription/rechercheForm/dateCreation/IRMCDateCreation";
import { IRMCTitulaire } from "../acteInscription/rechercheForm/IRMCTitulaire";
import { IRMCRequerant } from "../acteInscription/rechercheForm/IRMCRequerant";
import { IRMCFiltreRequete } from "./IRMCFiltreRequete";

export interface IRMCRequete {
  requete?: IRMCFiltreRequete;
  titulaire?: IRMCTitulaire;
  datesDebutFin?: IRMCDateCreation;
  requerant?: IRMCRequerant;
}
