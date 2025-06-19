/* v8 ignore start A TESTER 03/25 */
import { EvenementProjetActeTranscrit } from "@model/etatcivil/acte/projetActe/transcription/EvenementProjetActeTranscrit";
import { TitulaireProjetActeTranscrit } from "@model/etatcivil/acte/projetActe/transcription/TitulaireProjetActeTranscrit";
import { ESexe } from "@model/etatcivil/enum/Sexe";
import { IDateForm } from "@model/form/commun/DateForm";
import { PrenomsForm, TPrenomsForm } from "@model/form/commun/PrenomsForm";
import { ITitulaireTranscription } from "@model/form/creation/transcription/IProjetActeTranscritForm";
import { INationalite } from "./INationalite";
import { IPrenomOrdonnes } from "./IPrenomOrdonnes";
import { ITitulaireRequete } from "./ITitulaireRequete";
import { TypeObjetTitulaire } from "./enum/TypeObjetTitulaire";

interface ITitulaireRequeteTranscription extends ITitulaireRequete {
  villeEtrangereNaissance?: string;
  regionNaissance?: string;
  nationalites?: INationalite[];
  prenomsDemande?: IPrenomOrdonnes[];
  prenomsChemin?: TPrenomsForm;
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
  mappingTitulaireRequeteTranscriptionVersTitulaireForm: (
    titulaireRequete?: ITitulaireRequeteTranscription,
    titulaireProjetActe?: TitulaireProjetActeTranscrit,
    evenement?: EvenementProjetActeTranscrit
  ): ITitulaireTranscription => {
    return {
      nomActeEtranger: titulaireProjetActe?.nomActeEtranger ?? titulaireRequete?.nomNaissance ?? "",
      nomRetenuOEC: titulaireProjetActe?.nom ?? titulaireProjetActe?.nom ?? "",
      nomSouhaite: titulaireRequete?.nomSouhaite ?? "",
      nomSecable: {
        nomPartie1: titulaireProjetActe?.nomPartie1 ?? "",
        nomPartie2: titulaireProjetActe?.nomPartie2 ?? "",
        secable: Boolean(titulaireProjetActe?.nomPartie2)
      },
      prenomsChemin: PrenomsForm.valeursInitiales(
        titulaireProjetActe?.prenoms?.map((prenom: string, index: number) => ({ prenom: prenom, numeroOrdre: index + 1 })) ??
          titulaireRequete?.prenoms
      ),
      sexe: titulaireProjetActe?.sexe ?? (titulaireRequete?.sexe as keyof typeof ESexe) ?? null,
      dateNaissance: {
        jour: (titulaireProjetActe?.naissance.jour ?? titulaireRequete?.jourNaissance)?.toString().padStart(2, "0") ?? "",
        mois: (titulaireProjetActe?.naissance.mois ?? titulaireRequete?.moisNaissance)?.toString().padStart(2, "0") ?? "",
        annee: (titulaireProjetActe?.naissance.annee ?? titulaireRequete?.anneeNaissance)?.toString() ?? "",
        heure: (titulaireProjetActe?.naissance.heure ?? evenement?.heure)?.toString().padStart(2, "0") ?? "",
        minute: (titulaireProjetActe?.naissance.minute ?? evenement?.minute)?.toString().padStart(2, "0") ?? ""
      },
      villeNaissance: titulaireProjetActe?.naissance.ville ?? titulaireRequete?.villeNaissance ?? "",
      regionNaissance: titulaireProjetActe?.naissance.region ?? titulaireRequete?.regionNaissance ?? "",
      paysNaissance: titulaireProjetActe?.naissance.pays ?? titulaireRequete?.paysNaissance ?? "",
      adresseNaissance: titulaireProjetActe?.naissance.voie ?? titulaireProjetActe?.naissance.voie ?? ""
    };
  }
};
/* v8 ignore stop */
