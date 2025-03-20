import { IDateForm } from "@model/form/commun/DateForm";
import { INationalite } from "./INationalite";
import { IPrenomOrdonnes } from "./IPrenomOrdonnes";
import { ITitulaireRequete } from "./ITitulaireRequete";
import { TypeObjetTitulaire } from "./enum/TypeObjetTitulaire";

export interface ITitulaireRequeteConsulaire extends ITitulaireRequete {
  villeEtrangereNaissance?: string;
  regionNaissance?: string;
  nationalites?: INationalite[];
  prenomsDemande?: IPrenomOrdonnes[];
  prenomsChemin?: { [prenom: string]: string };
  nomActuel?: string;
  nomSouhaite?: string;
  typeObjetTitulaire?: TypeObjetTitulaire;
  dateNaissance?: IDateForm;
  nomOEC?: string;
}

export const TitulaireRequeteConsulaire = {
  getTitulaireTranscription(titulaires?: ITitulaireRequeteConsulaire[]): ITitulaireRequeteConsulaire | undefined {
    return titulaires?.find(
      (titulaireAFiltrer: ITitulaireRequeteConsulaire) =>
        titulaireAFiltrer.typeObjetTitulaire === TypeObjetTitulaire.TITULAIRE_ACTE_TRANSCRIT_DRESSE ||
        titulaireAFiltrer.typeObjetTitulaire === TypeObjetTitulaire.TITULAIRE_ACTE_TRANSCRIT
    );
  }
};
