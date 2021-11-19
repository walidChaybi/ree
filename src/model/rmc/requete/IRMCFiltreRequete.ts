import { SousTypeRequete } from "../../requete/SousTypeRequete";
import { StatutRequete } from "../../requete/StatutRequete";

export interface IRMCFiltreRequete {
  numeroRequete?: string;
  typeRequete?: string;
  sousTypeRequete?: SousTypeRequete;
  statutRequete?: StatutRequete;
  numeroTeledossier?: string;
}
