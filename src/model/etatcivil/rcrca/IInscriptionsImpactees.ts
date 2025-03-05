import { ETypeInscriptionRcRca } from "../enum/ETypeInscriptionRcRca";

export interface IInscriptionsImpactees {
  id: string;
  annee: string;
  numero: string;
  typeInscription: keyof typeof ETypeInscriptionRcRca;
  nature: string;
}
