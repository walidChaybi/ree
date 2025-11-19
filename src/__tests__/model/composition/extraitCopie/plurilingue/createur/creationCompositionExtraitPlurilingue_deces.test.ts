import { MOCK_EVENEMENT } from "@mock/data/etatcivil/acte/mockIEvenement";
import { MOCK_TITULAIRE_ACTE } from "@mock/data/etatcivil/acte/mockTitulaireActe";
import { MockFicheActeBuilder } from "@mock/model/etatcivil/acte/MockFicheActe";
import { EValidation } from "@model/requete/enum/EValidation";
import { SousTypeDelivrance } from "@model/requete/enum/SousTypeDelivrance";
import { describe, expect, test } from "vitest";
import { creationCompositionExtraitPlurilingue } from "../../../../../../views/common/hook/generation/generationECHook/creationComposition/creationCompositionExtraitPlurilingue";

const mentionsRetirees: string[] = [];

describe("Composition extrait plurilingue de Décès", () => {
  test("Doit composer l'extrait avec les bonnes données", () => {
    const prenoms = ["Prenom 1", "Prenom 2", "Prenom 3"];

    const nomPere = "Sacken";
    const prenomsPere = ["Carmela", "Linzy"];

    const nomDernierConjoint = "De fontaine";
    const prenomDernierConjoint = "Ratus";

    const acte = new MockFicheActeBuilder({
      titulaires: [
        {
          ...MOCK_TITULAIRE_ACTE,
          prenoms,
          naissance: { ville: "Milan", region: "Lombardie", pays: "Italie" },
          filiations: [
            {
              lienParente: "PARENT",
              ordre: 1,
              nom: nomPere,
              prenoms: prenomsPere,
              sexe: "MASCULIN"
            }
          ],
          nomDernierConjoint: nomDernierConjoint,
          prenomsDernierConjoint: prenomDernierConjoint
        }
      ],
      evenement: { ...MOCK_EVENEMENT, ville: "Nantes", pays: "France", region: "Loire-Atlantique" }
    })
      .deType("TEXTE")
      .deNature("DECES")
      .generer()!;

    const compositionCorps = creationCompositionExtraitPlurilingue(acte, EValidation.O, SousTypeDelivrance.RDC, mentionsRetirees);

    if (compositionCorps?.titulaire_1) {
      expect(compositionCorps?.titulaire_1.nom).toBe(MOCK_TITULAIRE_ACTE.nom);
      expect(compositionCorps?.titulaire_1.prenoms).toBe(prenoms.join(", "));
      expect(compositionCorps?.titulaire_1.sexe).toBe("M");
      expect(compositionCorps?.titulaire_1?.lieu_naissance).toBe("Milan, Lombardie (Italie)");
      expect(compositionCorps?.titulaire_1.date_naissance?.jour).toBe("");
      expect(compositionCorps?.titulaire_1.nom_mere).toBe("");
      expect(compositionCorps?.titulaire_1.prenoms_mere).toBe("");
      expect(compositionCorps?.titulaire_1.nom_pere).toBe(nomPere);
      expect(compositionCorps?.titulaire_1.prenoms_pere).toBe(prenomsPere.join(", "));
      expect(compositionCorps?.titulaire_1.nom_dernier_conjoint).toBe(nomDernierConjoint);
      expect(compositionCorps?.titulaire_1.prenoms_dernier_conjoint).toBe(prenomDernierConjoint);
      expect(compositionCorps?.titulaire_1.date_deces?.annee).toBe(MOCK_EVENEMENT.annee);
      expect(compositionCorps?.titulaire_1.lieu_deces).toBe("Nantes, Loire-Atlantique (France)");
    }
  });

  test("Doit composer l'extrait avec le bon formatage du lieu de naissance quand le pays est inconnu", () => {
    const acte = new MockFicheActeBuilder({
      titulaires: [{ ...MOCK_TITULAIRE_ACTE, naissance: { ...MOCK_EVENEMENT, ville: "Milan", pays: "", region: "Lombardie" } }]
    })
      .deType("TEXTE")
      .deNature("DECES")
      .generer()!;

    const compositionCorps = creationCompositionExtraitPlurilingue(acte, EValidation.O, SousTypeDelivrance.RDC, mentionsRetirees);

    const lieuNaissance = "Milan, Lombardie";

    if (compositionCorps?.titulaire_1) {
      expect(compositionCorps?.titulaire_1?.lieu_naissance).toBe(lieuNaissance);
    }
  });
});
