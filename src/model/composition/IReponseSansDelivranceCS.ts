import { IReponseSansDelivranceCSDemandeIncompleteComposition } from "./IReponseSansDelivranceCSDemandeIncompleteComposition";
import { IReponseSansDelivranceCSFrancaisComposition } from "./IReponseSansDelivranceCSFrancaisComposition";
import { IReponseSansDelivranceCSMariageComposition } from "./IReponseSansDelivranceCSMariageComposition";

export type IContenuReponseSansDelivranceCS =
  | IReponseSansDelivranceCSFrancaisComposition
  | IReponseSansDelivranceCSDemandeIncompleteComposition
  | IReponseSansDelivranceCSMariageComposition;

export type IReponseSansDelivranceCS = {
  contenu: IContenuReponseSansDelivranceCS;
  fichier: string;
};
