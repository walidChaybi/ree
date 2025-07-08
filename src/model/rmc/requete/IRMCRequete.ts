import { ETypeRequete } from "@model/requete/enum/TypeRequete";
import { IRMCRequerant } from "../acteInscription/rechercheForm/IRMCRequerant";
import { IRMCTitulaire } from "../acteInscription/rechercheForm/IRMCTitulaire";
import { IRMCDateCreation } from "../acteInscription/rechercheForm/dateCreation/IRMCDateCreation";
import { IRMCFiltreRequete } from "./IRMCFiltreRequete";

export interface IRMCRequeteForm<TTypeRequete extends keyof typeof ETypeRequete | ""> {
  requete: IRMCFiltreRequete<TTypeRequete>;
  titulaire: IRMCTitulaire;
  datesDebutFinAnnee: IRMCDateCreation;
  requerant: IRMCRequerant;
}
