/* istanbul ignore file */
import { ChoixDelivrance } from "./enum/ChoixDelivrance";
import { SousTypeDelivrance } from "./enum/SousTypeDelivrance";

export interface IActionOption {
  value: number;
  label: string;
  sousTypes?: SousTypeDelivrance[];
  eviterAntiDoubleClic?: boolean;
  ref?: any;
  choixDelivrance?: ChoixDelivrance;
  listeDocumentsDemandeAutorise?: string[];
}
