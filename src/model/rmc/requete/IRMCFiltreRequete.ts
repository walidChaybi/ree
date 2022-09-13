import { SousTypeRequete } from "@model/requete/enum/SousTypeRequete";
import { StatutRequete } from "../../requete/enum/StatutRequete";

export interface IRMCFiltreRequete {
  numeroRequete?: string;
  typeRequete?: string;
  sousTypeRequete?: SousTypeRequete;
  statutRequete?: StatutRequete;
  numeroTeledossier?: string;
}
