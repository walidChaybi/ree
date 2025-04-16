import { IMiseAJourAnalyseMarginaleDto } from "@api/configurations/etatCivil/PutMiseAJourAnalyseMarginaleConfigApi";
import { IDerniereAnalyseMarginalResultat } from "@hook/requete/miseajour/DerniereAnalyseMarginaleApiHook";
import { PrenomsForm } from "@model/form/commun/PrenomsForm";
import { IMajMention } from "@pages/requeteMiseAJour/apercuRequete/ApercuRequeteMiseAJourPage";
import { getMotif } from "@pages/requeteMiseAJour/apercuRequete/contenu/MiseAJourAnalyseMarginale/MiseAJourAnalyseMarginale";
import { getPremiereOuSecondeValeur } from "@util/Utils";
import * as Yup from "yup";
import { IAnalyseMarginaleMiseAJour } from "../../../composants/pages/requetesMiseAJour/PartieFormulaire";

export interface IMiseAJourAnalyseMarginaleValeursForm {
  analyseMarginale: {
    nom: string;
    prenoms: { [cle: string]: string };
    motif: string;
  };
  nomSecable: {
    secable: boolean;
    nomPartie1: string;
    nomPartie2: string;
  };
}

export const SCHEMA_VALIDATION_MISE_A_JOUR_ANALYSE_MARGINALE = Yup.object().shape({
  analyseMarginale: Yup.object().shape({
    nom: Yup.string().required("⚠ La saisie du nom est obligatoire"),
    motif: Yup.string().required("⚠ La saisie du motif est obligatoire")
  })
});

export const MiseAJourAnalyseMarginaleValeursForm = {
  valeurParDefaut: (
    defaut: IDerniereAnalyseMarginalResultat | undefined,
    listeMentions?: IMajMention[]
  ): IMiseAJourAnalyseMarginaleValeursForm => {
    const nomPartie1 = defaut?.titulaire.nomPartie1 ?? "";
    const nomPartie2 = defaut?.titulaire.nomPartie2 ?? "";
    const secable = Boolean(nomPartie1 && nomPartie2);
    const prenoms = defaut?.titulaire.prenoms ?? [];
    const motif = listeMentions?.length ? getPremiereOuSecondeValeur(defaut?.motif, getMotif(listeMentions, defaut)) : "";

    return {
      analyseMarginale: {
        nom: defaut?.titulaire.nom ?? "",
        prenoms: prenoms.reduce(
          (prenoms, prenom) => ({
            ...prenoms,
            [`prenom${prenom.numeroOrdre}`]: prenom.prenom
          }),
          {}
        ),
        motif: motif
      },
      nomSecable: {
        secable: secable,
        nomPartie1: secable ? nomPartie1 : "",
        nomPartie2: secable ? nomPartie2 : ""
      }
    };
  },

  versDto: (valeurs: IAnalyseMarginaleMiseAJour): IMiseAJourAnalyseMarginaleDto => {
    const secable = valeurs.nomSecable;
    const nomPartie1 = secable ? valeurs.nomPartie1.trim() : null;
    const nomPartie2 = secable ? valeurs.nomPartie2.trim() : null;
    const prenoms = PrenomsForm.versPrenomsStringDto(valeurs.prenoms);

    return {
      motifModification: valeurs.motif,
      titulaires: [
        {
          ordre: 1,
          nom: valeurs.nom.trim(),
          prenoms: prenoms,
          nomPartie1: nomPartie1,
          nomPartie2: nomPartie2
        }
      ]
    };
  }
} as const;
