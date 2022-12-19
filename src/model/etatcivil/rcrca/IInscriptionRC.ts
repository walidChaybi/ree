import { NatureRc } from "../enum/NatureRc";
import { NatureRca } from "../enum/NatureRca";
import { TypeInscriptionRc } from "../enum/TypeInscriptionRc";

export interface IInscriptionRc {
  idInscription: string;
  nature: NatureRc | NatureRca;
  typeInscription?: TypeInscriptionRc;
  dateInscription: Date;
}
