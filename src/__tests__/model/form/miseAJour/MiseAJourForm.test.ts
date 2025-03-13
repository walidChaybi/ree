import MiseAJourForm from "@model/form/miseAJour/MiseAJourForm";
import { describe, expect, test } from "vitest";
import { IAnalyseMarginaleMiseAJour } from "../../../../composants/pages/requetesMiseAJour/PartieFormulaire";

describe("Test du modèle MiseAJourForm", () => {
  test("Génération du DTO", () => {
    const donneesMiseAJour = MiseAJourForm.depuisFormulaire({
      mentions: [
        {
          idTypeMention: "idMention1",
          texte: "Mention 1"
        },
        {
          idTypeMention: "idMention2",
          texte: "Mention 2",
          donneesAideSaisie: {
            champs: {
              evenement: {
                date: {
                  jour: "01",
                  mois: "01",
                  annee: "2000"
                },
                ville: "Ville",
                arrondissement: "1",
                departement: "Département",
                cleAvecValeurFrance: "France"
              }
            },
            textesEdites: {}
          }
        },
        {
          idTypeMention: "idMention3",
          texte: "Mention 3",
          donneesAideSaisie: {
            champs: {
              evenement: {
                date: {
                  jour: "",
                  mois: "",
                  annee: "2000"
                },
                ville: "Ville",
                pays: "Pays"
              }
            },
            textesEdites: {}
          }
        }
      ],
      analyseMarginale: {} as IAnalyseMarginaleMiseAJour
    });

    expect(donneesMiseAJour.versDto("idActe", false)).toStrictEqual({
      idActe: "idActe",
      mentionCreationList: [
        {
          idTypeMention: "idMention1",
          numeroOrdre: 1,
          texteMention: "Mention 1",
          evenement: undefined,
          estSaisieAssistee: false
        },
        {
          idTypeMention: "idMention2",
          numeroOrdre: 2,
          texteMention: "Mention 2",
          evenement: {
            jour: "01",
            mois: "01",
            annee: "2000",
            ville: "Ville",
            arrondissement: "1",
            departement: "Département",
            pays: "France"
          },
          estSaisieAssistee: true
        },
        {
          idTypeMention: "idMention3",
          numeroOrdre: 3,
          texteMention: "Mention 3",
          evenement: { jour: null, mois: null, annee: "2000", ville: "Ville", arrondissement: null, departement: null, pays: "Pays" },
          estSaisieAssistee: true
        }
      ],
      analyseMarginale: null
    });
  });
});
