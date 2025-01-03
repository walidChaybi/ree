import { INatureRc } from "../enum/NatureRc";
import { INatureRca } from "../enum/NatureRca";
import { TypeInscriptionRc } from "../enum/TypeInscriptionRc";

export interface IInscriptionRc {
  idInscription: string;
  nature: INatureRc | INatureRca;
  typeInscription?: TypeInscriptionRc;
  dateInscription: Date;
}
