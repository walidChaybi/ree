import MiseAJourForm from "@model/form/miseAJour/MiseAJourForm";
import { describe, expect, it } from "vitest";
import { IAnalyseMarginaleMiseAJour } from "../../../../../composants/pages/requetesMiseAJour/PartieFormulaire";

describe("MiseAJourForm.versDto", () => {
  it("devrait convertir correctement les données en DTO", () => {
    const idActe = "12345";

    const mentions = [
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
      }
    ];

    const analyseMarginale = {
      nom: "DUPONT",
      nomSecable: true,
      nomPartie1: "DU",
      nomPartie2: "PONT",
      prenoms: ["Jean"],
      motif: "Changement de nom"
    } as unknown as IAnalyseMarginaleMiseAJour;

    const dto = MiseAJourForm.versDto(idActe, mentions, analyseMarginale, true);

    expect(dto).toEqual({
      idActe: "12345",
      mentionCreationList: [
        {
          idTypeMention: "1",
          numeroOrdre: 1,
          texteMention: "Texte de mention",
          estSaisieAssistee: true,
          evenement: undefined
        }
      ],
      analyseMarginale: {
        motifModification: "Changement de nom",
        titulaires: [
          {
            ordre: 1,
            nom: "DUPONT",
            prenoms: ["Jean"],
            nomPartie1: "DU",
            nomPartie2: "PONT"
          }
        ]
      }
    });
  });
});
