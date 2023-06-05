import { ICommunComposition } from "../commun/ICommunComposition";
import { IParametresComposition } from "../commun/IParametresComposition";

export const NOM_DOCUMENT_EC_SANS_FILIATION = "Extrait sans filiation";
export const NOM_DOCUMENT_EC_AVEC_FILIATION = "Extrait avec filiation";
export const NOM_DOCUMENT_EC_PLURILINGUE = "Extrait plurilingue";
export const NOM_DOCUMENT_COPIE_INTEGRALE = "Copie intégrale";
export const NOM_DOCUMENT_COPIE_ARCHIVE = "Copie archive";

// Même interface pour les extraits ou copie et actes images ou texte
export interface IExtraitCopieComposition
  extends ICommunComposition,
    IParametresComposition {
  reference_acte: string;
  type_document: string;
  nature_acte: string;
  prenoms_titulaire1: string;
  nom_titulaire1: string;
  prenoms_titulaire2: string;
  nom_titulaire2: string;
  corps_texte?: string;
  corps_image?: string[];
  filigrane_archive: boolean;
  formule_signature_delivrance: string;
  formule_notice_delivrance: string;
  pas_de_bloc_signature: boolean;
  pas_de_bloc_notice: boolean;
  pas_de_signature: boolean;
  pas_de_nomPrenomAgent: boolean;
  code_CTV: string;
  erreur?: string;
  mentions?: string;
}

