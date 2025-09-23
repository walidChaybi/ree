import { MOCK_MENTIONS_MISE_A_JOUR } from "@mock/data/etatcivil/acte/mention/mentionMiseAJour";
import MiseAJourForm from "@model/form/miseAJour/MiseAJourForm";
import { describe, expect, it } from "vitest";
import { IAnalyseMarginaleMiseAJour } from "../../../../../composants/pages/requetesMiseAJour/PartieFormulaire";

describe("MiseAJourForm.versDto", () => {
  it("devrait convertir correctement les données en DTO", () => {
    const idActe = "12345";

    const analyseMarginale = {
      nom: "DUPONT",
      nomSecable: true,
      nomPartie1: "DU",
      nomPartie2: "PONT",
      prenoms: ["Jean"],
      motif: "Changement de nom"
    } as unknown as IAnalyseMarginaleMiseAJour;

    const dto = MiseAJourForm.versDto(idActe, MOCK_MENTIONS_MISE_A_JOUR, analyseMarginale, true);

    expect(dto).toEqual({
      idActe: "12345",
      mentionCreationList: [
        {
          idTypeMention: "1",
          numeroOrdre: 1,
          texteMention: "Texte de mention",
          estSaisieAssistee: true
        },
        {
          idTypeMention: "b03c0e14-bad0-40a7-a895-8169e2b7f38e",
          numeroOrdre: 2,
          texteMention: "Mariée à Nantes (Loire Atlantique) le 12 décembre 2012 avec Robert, William Smith.",
          evenement: {
            jour: "12",
            mois: "12",
            annee: "2012",
            ville: "Nantes",
            departement: "Loire Atlantique"
          },
          personneLiee: { nom: "Smith", prenoms: "Robert, William" },
          estSaisieAssistee: true
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
