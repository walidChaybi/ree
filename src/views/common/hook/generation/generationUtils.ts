import { IFichePacs } from "../../../../model/etatcivil/pacs/IFichePacs";
import { IFicheRcRca } from "../../../../model/etatcivil/rcrca/IFicheRcRca";
import { TFiche } from "../repertoires/MappingRepertoires";

export const RESULTAT_VIDE = {};

export interface IResultGenerationUnDocument {
  idDocumentReponse?: string;
  contenuDocumentReponse?: string;
}

export interface IResultGenerationPlusieursDocuments {
  idDocumentsReponse?: string[];
}

export interface IResultGenerationInscriptions {
  fiches?: TFiche[];
  idDocumentsReponse?: string[];
}

export interface IResultGenerationPlusieursInscriptions {
  pacs?: IFichePacs[];
  rc?: IFicheRcRca[];
  rca?: IFicheRcRca[];
  idDocumentsReponse?: string[];
}
