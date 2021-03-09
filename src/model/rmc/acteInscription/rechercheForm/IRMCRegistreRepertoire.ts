import { IRMCRegistre } from "./IRMCRegistre";
import { IRMCRepertoire } from "./IRMCRepertoire";
import { IRMCEvenement } from "./IRMCEvenement";

export interface IRMCRegistreRepertoire {
  registre?: IRMCRegistre;
  repertoire?: IRMCRepertoire;
  evenement?: IRMCEvenement;
}
