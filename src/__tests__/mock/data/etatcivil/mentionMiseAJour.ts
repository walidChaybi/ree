import { IMentionMiseAJour } from "../../../../composants/pages/requetesMiseAJour/PartieFormulaire";

export const MOCK_MENTIONS_MISE_A_JOUR: IMentionMiseAJour[] = [
  {
    texte: "Texte de mention",
    idTypeMention: "1",
    affecteAnalyseMarginale: true,
    donneesAideSaisie: {
      champs: {
        evenement: {
          ville: "Paris",
          pays: "France",
          jour: "01",
          mois: "01",
          annee: "2000"
        }
      },
      textesEdites: {}
    }
  },
  {
    idTypeMention: "b03c0e14-bad0-40a7-a895-8169e2b7f38e",
    texte: "Mariée à Nantes (Loire Atlantique) le 12 décembre 2012 avec Robert, William Smith.",
    donneesAideSaisie: {
      champs: {
        evenementFrance: {
          ville: "Nantes",
          arrondissement: "",
          departement: "Loire Atlantique",
          date: {
            jour: "12",
            mois: "12",
            annee: "2012"
          }
        },
        conjoint: {
          prenoms: "Robert, William",
          nom: "Smith"
        },
        titulaire: {
          nom: "Schlosser",
          nomPartie1: "",
          nomPartie2: "",
          nomSecable: false,
          sexe: "Féminin"
        },
        mentionAffecteAnalyseMarginale: false
      },
      textesEdites: {
        "1": {
          original: "Mariée à ",
          edite: "Mariée à "
        },
        "2": {
          original: " ",
          edite: " "
        },
        "3": {
          original: " avec ",
          edite: " avec "
        },
        "4": {
          original: ".",
          edite: "."
        }
      }
    },
    affecteAnalyseMarginale: false
  }
];
