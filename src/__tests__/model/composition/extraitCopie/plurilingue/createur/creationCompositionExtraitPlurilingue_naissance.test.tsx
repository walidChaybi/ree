import { MOCK_EVENEMENT } from "@mock/data/etatcivil/acte/mockIEvenement";
import { MOCK_TITULAIRE_ACTE } from "@mock/data/etatcivil/acte/mockTitulaireActe";
import { NATURE_MENTION } from "@mock/data/NomenclatureNatureMention";
import { TYPE_MENTION } from "@mock/data/NomenclatureTypeMention";
import { MockFicheActeBuilder } from "@mock/model/etatcivil/acte/MockFicheActe";
import { FicheActe } from "@model/etatcivil/acte/FicheActe";
import { TypeMention } from "@model/etatcivil/acte/mention/ITypeMention";
import { NatureMention } from "@model/etatcivil/enum/NatureMention";
import { EValidation } from "@model/requete/enum/EValidation";
import { SousTypeDelivrance } from "@model/requete/enum/SousTypeDelivrance";
import { SNP, SPC } from "@util/Utils";
import { describe, expect, test } from "vitest";
import { creationCompositionExtraitPlurilingue } from "../../../../../../views/common/hook/generation/generationECHook/creationComposition/creationCompositionExtraitPlurilingue";
import { mentionsPlurilinguesMariageAvec6 } from "../../../../../mock/data/mentions";

const validation: EValidation = EValidation.O;
const mentionsRetirees: string[] = [];

describe("Composition extrait plurilingue de Naissance", () => {
  NatureMention.init(NATURE_MENTION);
  TypeMention.init(TYPE_MENTION);
  test("Doit mettre le document en erreur si le titulaire est de sexe inconnu", () => {
    const acte = new MockFicheActeBuilder({
      titulaires: [
        {
          ...MOCK_TITULAIRE_ACTE,
          sexe: "INCONNU"
        }
      ]
    })
      .deNature("NAISSANCE")
      .generer()!;

    const compositionCorps = creationCompositionExtraitPlurilingue(acte, EValidation.O, SousTypeDelivrance.RDC, mentionsRetirees);

    expect(compositionCorps?.filigrane_incomplet).toEqual(true);
  });

  test("Doit mettre le document en erreur si un des parents est de sexe inconnu", () => {
    const acte = new MockFicheActeBuilder({
      titulaires: [
        {
          ...MOCK_TITULAIRE_ACTE,
          filiations: [
            {
              lienParente: "PARENT",
              ordre: 1,
              prenoms: ["Prenom Parent"],
              sexe: "INCONNU"
            }
          ]
        }
      ]
    })
      .deNature("NAISSANCE")
      .generer()!;

    const compositionCorps = creationCompositionExtraitPlurilingue(acte, EValidation.O, SousTypeDelivrance.RDC, mentionsRetirees);

    expect(compositionCorps?.filigrane_incomplet).toEqual(true);
  });

  test("Doit mettre le document en erreur si l'annee de l'évènement de l'acte de naissance est manquante", () => {
    const acte = new MockFicheActeBuilder({
      evenement: { ...MOCK_EVENEMENT, annee: undefined }
    })
      .deNature("NAISSANCE")
      .generer()!;

    const compositionCorps = creationCompositionExtraitPlurilingue(acte, EValidation.O, SousTypeDelivrance.RDC, mentionsRetirees);

    expect(compositionCorps?.filigrane_incomplet).toEqual(true);
  });

  test("Doit mettre le document en erreur si le titulaire de l'acte est de genre indeterminé", () => {
    const acte = new MockFicheActeBuilder({
      titulaires: [
        {
          ...MOCK_TITULAIRE_ACTE,
          sexe: "INDETERMINE"
        }
      ]
    })
      .deNature("NAISSANCE")
      .generer()!;

    const compositionCorps = creationCompositionExtraitPlurilingue(acte, EValidation.O, SousTypeDelivrance.RDC, mentionsRetirees);

    expect(compositionCorps?.filigrane_erreur).toEqual(true);
  });

  test("Doit mettre le document en erreur si les parents du titulaires sont de même sexe", () => {
    const acte = new MockFicheActeBuilder({
      titulaires: [
        {
          ...MOCK_TITULAIRE_ACTE,
          filiations: [
            {
              lienParente: "PARENT",
              ordre: 1,
              prenoms: ["prenom parent 1"],
              sexe: "MASCULIN"
            },
            {
              lienParente: "PARENT",
              ordre: 2,
              prenoms: ["prenom parent 2"],
              sexe: "MASCULIN"
            }
          ]
        }
      ]
    })
      .deNature("NAISSANCE")
      .generer()!;

    const compositionCorps = creationCompositionExtraitPlurilingue(acte, EValidation.O, SousTypeDelivrance.RDC, mentionsRetirees);

    expect(compositionCorps?.filigrane_erreur).toEqual(true);
  });

  test("Doit mettre le document en erreur si les parents du titulaires est de sexe indetermine", () => {
    const acte = new MockFicheActeBuilder({
      titulaires: [
        {
          ...MOCK_TITULAIRE_ACTE,
          filiations: [
            {
              lienParente: "PARENT",
              ordre: 1,
              prenoms: ["Prenom Parent"],
              sexe: "INDETERMINE"
            }
          ]
        }
      ]
    })
      .deNature("NAISSANCE")
      .generer()!;

    const compositionCorps = creationCompositionExtraitPlurilingue(acte, EValidation.O, SousTypeDelivrance.RDC, mentionsRetirees);

    expect(compositionCorps?.filigrane_erreur).toEqual(true);
  });

  test("Doit composer l'etrait avec les bonne données", () => {
    const acte = new MockFicheActeBuilder().deNature("NAISSANCE").generer()!;

    const compositionCorps = creationCompositionExtraitPlurilingue(acte, EValidation.O, SousTypeDelivrance.RDC, mentionsRetirees);

    const lieuNaissance = "Ville évènement (Pays évènement)";

    if (compositionCorps?.titulaire_1) {
      expect(compositionCorps?.titulaire_1.nom).toBe(MOCK_TITULAIRE_ACTE.nom);
      expect(compositionCorps?.titulaire_1.prenoms).toBe(MOCK_TITULAIRE_ACTE.prenoms.join(", "));
      expect(compositionCorps?.titulaire_1?.lieu_naissance).toBe(lieuNaissance);
      expect(compositionCorps?.titulaire_1.date_naissance?.annee).toBe(1970);

      expect(compositionCorps?.titulaire_1.nom_pere).toBe("");
      expect(compositionCorps?.titulaire_1?.prenoms_pere).toBe("");
    }
  });

  test("Doit afficher les mentions quand le nombre de mentions est en dessous ou égale de la limite", () => {
    const acte: FicheActe = new MockFicheActeBuilder({ mentions: mentionsPlurilinguesMariageAvec6 }).deNature("NAISSANCE").generer()!;

    const compositionCorps = creationCompositionExtraitPlurilingue(acte, validation, SousTypeDelivrance.RDC, mentionsRetirees);

    const mentierAfficherUn = "Sc 31-01-92 Nantes Jenmi";

    expect(compositionCorps?.autres_enonciations_acte.enonciations[0]).toBe(mentierAfficherUn);
  });

  test("Ne doit pas affiché une mention sur l'extrait si elle est présente dans les mentions retirées", () => {
    const acte: FicheActe = new MockFicheActeBuilder({ mentions: mentionsPlurilinguesMariageAvec6 }).deNature("NAISSANCE").generer()!;

    const mentionsRetirees: string[] = ["f6947623-9959-4d07-8963-f55b16a01071"];

    const compositionCorps = creationCompositionExtraitPlurilingue(acte, validation, SousTypeDelivrance.RDC, mentionsRetirees);

    const mentionAfficherUn = "Sc 31-12-98 Nantes Jenmi";

    expect(compositionCorps?.autres_enonciations_acte.enonciations[0]).toBe(mentionAfficherUn);
  });

  test("Ne doit pas éditer le nom si il est égale à SNP et prénom si égale à SPC", () => {
    const acte: FicheActe = new MockFicheActeBuilder({
      titulaires: [
        {
          ...MOCK_TITULAIRE_ACTE,
          filiations: [
            {
              lienParente: "PARENT",
              ordre: 1,
              prenoms: [SPC],
              nom: SNP,
              sexe: "MASCULIN"
            }
          ]
        }
      ]
    })
      .deNature("NAISSANCE")
      .generer()!;

    const compositionCorps = creationCompositionExtraitPlurilingue(acte, validation, SousTypeDelivrance.RDC, mentionsRetirees);

    expect(compositionCorps?.titulaire_1?.nom_pere).toBe("");
    expect(compositionCorps?.titulaire_1?.prenoms_pere).toBe("");
  });

  test("Doit formater les prénoms correctement", () => {
    const acte = new MockFicheActeBuilder({
      titulaires: [
        {
          ...MOCK_TITULAIRE_ACTE,
          filiations: [
            {
              lienParente: "PARENT",
              ordre: 1,
              prenoms: ["Jean", "Louis"],
              sexe: "MASCULIN"
            }
          ]
        }
      ]
    })
      .deNature("NAISSANCE")
      .generer()!;

    const compositionCorps = creationCompositionExtraitPlurilingue(acte, validation, SousTypeDelivrance.RDC, mentionsRetirees);

    expect(compositionCorps?.titulaire_1?.prenoms_pere).toBe("Jean, Louis");
  });
});
