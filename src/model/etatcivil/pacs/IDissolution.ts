import { IActionDatee } from "../commun/IActionDatee";
import { MotifDissolution } from "../enum/MotifDissolution";

export interface IDissolution extends IActionDatee {
  motif: MotifDissolution;
}
