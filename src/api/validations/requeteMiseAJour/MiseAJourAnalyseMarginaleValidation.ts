import { IMiseAJourAnalyseMarginaleDto } from "@api/configurations/etatCivil/PutMiseAJourAnalyseMarginaleConfigApi";
import { IDerniereAnalyseMarginalResultat } from "@hook/requete/miseajour/DerniereAnalyseMarginaleApiHook";
import * as Yup from "yup";

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
    defaut: IDerniereAnalyseMarginalResultat | undefined
  ): IMiseAJourAnalyseMarginaleValeursForm => {
    const nomPartie1 = defaut?.titulaire.nomPartie1 ?? "";
    const nomPartie2 = defaut?.titulaire.nomPartie2 ?? "";
    const secable = Boolean(nomPartie1 && nomPartie2);
    const prenoms = defaut?.titulaire.prenoms ?? [];

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
        motif: ""
      },
      nomSecable: {
        secable: secable,
        nomPartie1: secable ? nomPartie1 : "",
        nomPartie2: secable ? nomPartie2 : ""
      }
    };
  },

  versDto: (
    valeurs: IMiseAJourAnalyseMarginaleValeursForm
  ): IMiseAJourAnalyseMarginaleDto => {
    const secable = valeurs.nomSecable.secable;
    const nomPartie1 = secable ? valeurs.nomSecable.nomPartie1 : null;
    const nomPartie2 = secable ? valeurs.nomSecable.nomPartie2 : null;
    const prenomsFormulaire = valeurs.analyseMarginale.prenoms;
    const prenoms = Object.keys(prenomsFormulaire)
      .map((clePrenom: string) => ({
        ordre: parseInt(clePrenom.replace("prenom", "")) ?? 0,
        valeur: prenomsFormulaire[clePrenom]
      }))
      .sort((prenomA, prenomB) => (prenomA.ordre > prenomB.ordre ? 1 : -1))
      .map(prenom => prenom.valeur.trim())
      .filter(prenom => Boolean(prenom));

    return {
      motifModification: valeurs.analyseMarginale.motif,
      titulaires: [
        {
          ordre: 1,
          nom: valeurs.analyseMarginale.nom.trim(),
          prenoms: prenoms,
          nomPartie1: nomPartie1?.trim() ?? null,
          nomPartie2: nomPartie2?.trim() ?? null
        }
      ]
    };
  }
} as const;
