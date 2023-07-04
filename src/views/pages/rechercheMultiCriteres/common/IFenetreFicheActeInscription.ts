import { TRequete } from "@model/requete/IRequete";
import { IDataFicheProps, IIndex } from "@pages/fiche/FichePage";

export interface IFenetreFicheActeInscription {
  idActeInscription: string;
  datasFiches: IDataFicheProps[];
  index: IIndex;
  numeroRequete?: TRequete["numero"];
}

export interface IFenetreFicheActe
  extends Omit<IFenetreFicheActeInscription, "idActeInscription"> {
  idActe: string;
}
