import { IAdresseRequerant } from "./IAdresseRequerant";
import { IDocumentReponse } from "./IDocumentReponse";

export interface ISauvegardeCourrier {
  adresseRequerant: IAdresseRequerant;
  motif: string;
  nombreExemplairesDemandes: number;
  documentReponse: IDocumentReponse;
}
