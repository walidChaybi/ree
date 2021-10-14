import { ITitulaireActe } from "./ITitulaireActe";

export interface IAnalyseMarginale {
  dateDebutEffet: number;
  dateFinEffet: number;
  nomOec: string;
  prenomOec: string;
  motif: string;
  titulaires: ITitulaireActe[];
}
