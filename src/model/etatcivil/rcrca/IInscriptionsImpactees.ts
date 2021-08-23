import { TypeInscriptionRc } from "../enum/TypeInscriptionRc";

export interface IInscriptionsImpactees {
  id: string;
  annee: string;
  numero: string;
  typeInscription: TypeInscriptionRc;
  nature: string;
}
