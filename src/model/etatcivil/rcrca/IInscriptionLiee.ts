import { ETypeInscriptionRc } from "../enum/ETypeInscriptionRc";

export interface IInscriptionLiee {
  id: string;
  annee: string;
  numero: string;
  typeInscription: keyof typeof ETypeInscriptionRc;
  nature: string;
}
