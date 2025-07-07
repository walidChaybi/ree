import { EPrepositionLieu } from "@model/etatcivil/enum/EPrepositionLieu";
import { IDateHeureForm } from "@model/form/commun/DateForm";
import { TPrenomsForm } from "@model/form/commun/PrenomsForm";
import { INationalite } from "./INationalite";
import { IPrenomOrdonnes } from "./IPrenomOrdonnes";
import { ITitulaireRequete } from "./ITitulaireRequete";
import { TypeObjetTitulaire } from "./enum/TypeObjetTitulaire";

interface ITitulaireRequeteTranscription extends ITitulaireRequete {
  villeEtrangereNaissance?: string;
  regionNaissance?: string;
  nationalites?: INationalite[];
  prenomsDemande?: IPrenomOrdonnes[];
  prepositionLieuNaissance?: keyof typeof EPrepositionLieu;
  prenomsChemin?: TPrenomsForm;
  nomActuel?: string;
  nomSouhaite?: string;
  typeObjetTitulaire?: TypeObjetTitulaire;
  dateNaissance?: IDateHeureForm;
  nomRetenuOEC?: string;
}

export const TitulaireRequeteTranscription = {
  getTitulaireTranscriptionDepuisTitulairesRequeteTranscription(
    titulaires?: ITitulaireRequeteTranscription[]
  ): ITitulaireRequeteTranscription | undefined {
    return titulaires?.find(
      (titulaireAFiltrer: ITitulaireRequeteTranscription) =>
        titulaireAFiltrer.typeObjetTitulaire === TypeObjetTitulaire.TITULAIRE_ACTE_TRANSCRIT_DRESSE ||
        titulaireAFiltrer.typeObjetTitulaire === TypeObjetTitulaire.TITULAIRE_ACTE_TRANSCRIT
    );
  }
};
