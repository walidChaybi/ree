import { IAdresseRequerant } from "./IAdresseRequerant";
import { IDocumentReponse } from "./IDocumentReponse";

export interface ISauvegardeCourrier {
  requerant: { adresse: IAdresseRequerant };
  motif: string;
  nombreExemplairesDemandes: number;
  documentsReponses: IDocumentReponse[];
}
