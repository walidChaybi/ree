/* istanbul ignore file */
/* v8 ignore start A TESTER 03/25 */
import { IDateForm } from "@model/form/commun/DateForm";
import { IPrenomsChemin, IPrenomsNumerotes } from "@model/form/commun/PrenomsForm";
import { ITitulaireTranscription } from "@model/form/creation/transcription/IProjetActeTranscritForm";
import { INationalite } from "./INationalite";
import { IPrenomOrdonnes } from "./IPrenomOrdonnes";
import { ITitulaireRequete } from "./ITitulaireRequete";
import { TypeObjetTitulaire } from "./enum/TypeObjetTitulaire";

export interface ITitulaireRequeteTranscription extends ITitulaireRequete {
  villeEtrangereNaissance?: string;
  regionNaissance?: string;
  nationalites?: INationalite[];
  prenomsDemande?: IPrenomOrdonnes[];
  prenomsChemin?: IPrenomsNumerotes;
  nomActuel?: string;
  nomSouhaite?: string;
  typeObjetTitulaire?: TypeObjetTitulaire;
  dateNaissance?: IDateForm;
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
  },
  mappingTitulaireRequeteTranscriptionVersTitulaireForm: (titulaire?: ITitulaireRequeteTranscription): ITitulaireTranscription => {
    return {
      nomActeEtranger: titulaire?.nomNaissance ?? "",
      nomRetenuOEC: "",
      nomSouhaite: titulaire?.nomSouhaite ?? "",
      nomSecable: { nomPartie1: "", nomPartie2: "", secable: false },
      prenomsChemin: {
        nombrePrenomsAffiches: titulaire?.prenoms?.length ?? 1,
        ...titulaire?.prenoms?.reduce((prenoms, prenom) => {
          prenoms[`prenom${prenom.numeroOrdre}`] = prenom.prenom;
          return prenoms;
        }, {} as IPrenomsChemin)
      },
      sexe: titulaire?.sexe ?? "",
      dateNaissance: {
        jour: titulaire?.jourNaissance ? `${titulaire?.jourNaissance}`.padStart(2, "0") : "",
        mois: titulaire?.moisNaissance ? `${titulaire?.moisNaissance}`.padStart(2, "0") : "",
        annee: titulaire?.anneeNaissance?.toString() ?? "",
        heure: "",
        minute: ""
      },
      secable: null,
      villeNaissance: titulaire?.villeNaissance ?? "",
      regionNaissance: titulaire?.regionNaissance ?? "",
      paysNaissance: titulaire?.paysNaissance ?? "",
      adresseNaissance: ""
    };
  }
};
/* v8 ignore end */
