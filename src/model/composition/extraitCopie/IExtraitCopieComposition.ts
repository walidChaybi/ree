import { ICommunComposition } from "../commun/ICommunComposition";

export const NOM_DOCUMENT_EC_SANS_FILIATION = "Extrait copie sans filiation";
export const NOM_DOCUMENT_EC_AVEC_FILIATION = "Extrait copie avec filiation";

// Même interface pour les extraits ou copie et actes images ou texte
export interface IExtraitCopieComposition extends ICommunComposition {
  reference_acte: string;
  type_document: string;
  nature_acte: string;
  prenoms_titulaire1: string;
  nom_titulaire1: string;
  prenoms_titulaire2: string;
  nom_titulaire2: string;
  corps_texte: string;
  corps_image: string[];
  filigrane_archive: boolean;
}
