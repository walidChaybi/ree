import { TypeInscriptionRc } from "../enum/TypeInscriptionRc";

export interface IInscriptionLiee {
  id: string;
  annee: string;
  numero: string;
  typeInscription: TypeInscriptionRc;
  nature: string;
}
