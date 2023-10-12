import { ITitulaireProjetActe } from "./ITitulaireProjetActe";
export interface IProjetAnalyseMarginale {
  id: string;
  dateDebut: Date;
  dateFin?: Date;
  nomOec: string;
  prenomOec: string;
  motifModification: string;
  titulaires: ITitulaireProjetActe[];
}
