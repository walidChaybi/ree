import { IAdresseRequerant } from "./IAdresseRequerant";
import { IDocumentReponse } from "./IDocumentReponse";

export interface ISauvegardeCourrier {
  nomRequerant: string;
  prenomRequerant: string;
  raisonSocialeRequerant: string;
  adresseRequerant: IAdresseRequerant;
  motif: string;
  nombreExemplairesDemandes: number;
  documentReponse: IDocumentReponse;
}
