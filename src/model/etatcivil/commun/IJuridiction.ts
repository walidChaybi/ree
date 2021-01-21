import { TypeJuridiction } from "../enum/TypeJuridiction";
import { ILocalisation } from "./ILocalisation";

export interface IJuridiction {
  type: TypeJuridiction;
  localisation: ILocalisation;
}
