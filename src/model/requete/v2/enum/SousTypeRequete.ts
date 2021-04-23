/* istanbul ignore file */
import { SousTypeCreation } from "./SousTypeCreation";
import { SousTypeDelivrance } from "./SousTypeDelivrance";
import { SousTypeInformation } from "./SousTypeInformation";
import { SousTypeMiseAJour } from "./SousTypeMiseAJour";

export type SousTypeRequete =
  | SousTypeCreation
  | SousTypeDelivrance
  | SousTypeInformation
  | SousTypeMiseAJour;
