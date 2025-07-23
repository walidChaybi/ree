import { ETypeInscriptionRc } from "../enum/ETypeInscriptionRc";
import { INatureRc } from "../enum/NatureRc";
import { INatureRca } from "../enum/NatureRca";

export interface IInscriptionRc {
  idInscription: string;
  nature: INatureRc | INatureRca;
  typeInscription?: ETypeInscriptionRc;
  dateInscription: Date;
}
