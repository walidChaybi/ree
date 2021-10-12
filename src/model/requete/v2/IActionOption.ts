/* istanbul ignore file */
import { ChoixDelivrance } from "./enum/ChoixDelivrance";
import { SousTypeDelivrance } from "./enum/SousTypeDelivrance";

export interface IActionOption {
  value: number;
  label: string;
  sousTypes?: SousTypeDelivrance[];
  ref: any;
  choixDelivrance?: ChoixDelivrance;
}
