import { IReponseNegativeDemandeIncompleteComposition } from "./IReponseNegativeDemandeIncompleteComposition";
import { IReponseNegativeFrancaisComposition } from "./IReponseNegativeFrancaisComposition";
import { IReponseNegativeMariageComposition } from "./IReponseNegativeMariageComposition";

export type IContenuReponseNegative =
  | IReponseNegativeFrancaisComposition
  | IReponseNegativeDemandeIncompleteComposition
  | IReponseNegativeMariageComposition;

export type IReponseNegative = {
  contenu: IContenuReponseNegative;
  fichier: string;
};
