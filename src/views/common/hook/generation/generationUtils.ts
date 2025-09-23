import { FichePacs } from "@model/etatcivil/pacs/FichePacs";
import { FicheRcRca } from "@model/etatcivil/rcrca/FicheRcRca";
import { TFiche } from "@pages/fiche/FicheUtils";

export const RESULTAT_VIDE = {};

export interface IResultGenerationUnDocument {
  idDocumentReponse?: string;
  contenuDocumentReponse?: string;
}

export interface IResultGenerationInscriptions {
  fiches?: TFiche[];
  idDocumentsReponse?: string[];
}

export interface IResultGenerationPlusieursInscriptions {
  pacs?: FichePacs[];
  rc?: FicheRcRca[];
  rca?: FicheRcRca[];
  idDocumentsReponse?: string[];
}
