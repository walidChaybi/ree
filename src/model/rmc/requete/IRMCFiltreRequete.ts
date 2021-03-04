import { SousTypeRequete } from "../../requete/SousTypeRequete";
import { StatutRequete } from "../../requete/StatutRequete";
import { TypeRequete } from "../../requete/TypeRequete";

export interface IRMCFiltreRequete {
  numeroRequete?: string;
  typeRequete?: TypeRequete;
  sousTypeRequete?: SousTypeRequete;
  statutRequete?: StatutRequete;
}
