import { IEvenement } from "./IEvenement";
import { ITitulaireActe } from "./ITitulaireActe";
import { NatureActe } from "./NatureActe";

export interface IFicheActe {
  titulaires: ITitulaireActe[];
  evenement: IEvenement;
  nature: NatureActe;
}
