import { ETypeInscriptionRcRca } from "../enum/ETypeInscriptionRcRca";
import { INatureRc } from "../enum/NatureRc";
import { INatureRca } from "../enum/NatureRca";

export interface IInscriptionRc {
  idInscription: string;
  nature: INatureRc | INatureRca;
  typeInscription?: ETypeInscriptionRcRca;
  dateInscription: Date;
}
