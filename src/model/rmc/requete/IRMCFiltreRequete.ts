import { TSousTypeRequete } from "@model/requete/enum/SousTypeRequete";
import { ETypeRequete } from "@model/requete/enum/TypeRequete";
import { EStatutRequete } from "../../requete/enum/StatutRequete";

export interface IRMCFiltreRequete<TTypeRequete extends keyof typeof ETypeRequete | ""> {
  numeroRequete: string;
  typeRequete: TTypeRequete;
  sousTypeRequete: TTypeRequete extends keyof typeof ETypeRequete ? TSousTypeRequete<TTypeRequete> : "";
  statutRequete: keyof typeof EStatutRequete;
  numeroTeledossier: string;
  numeroDossierNational: string;
}
