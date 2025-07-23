import { ETypeInscriptionRc } from "../enum/ETypeInscriptionRc";

export interface IInscriptionsImpactees {
  id: string;
  annee: string;
  numero: string;
  typeInscription: keyof typeof ETypeInscriptionRc;
  nature: string;
}
