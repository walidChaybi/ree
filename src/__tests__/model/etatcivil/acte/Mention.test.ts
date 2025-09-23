import {
  documentReponseCopieIntegrale,
  documentReponseCopieNonSignee,
  documentReponseExtraitAvecFiliation
} from "@mock/data/DocumentReponse";
import {
  IMentionAffichage,
  mappingVersMentionAffichage,
  mappingVersMentionsApi,
  modificationEffectuee
} from "@model/etatcivil/acte/mention/IMentionAffichage";
import { TypeMention } from "@model/etatcivil/acte/mention/ITypeMention";
import { IMentionDto, Mention } from "@model/etatcivil/acte/mention/Mention";
import { INatureMention, NatureMention } from "@model/etatcivil/enum/NatureMention";
import { DocumentDelivrance, ECodeDocumentDelivrance } from "@model/requete/enum/DocumentDelivrance";
import { describe, expect, test } from "vitest";
import { DOCUMENT_DELIVRANCE } from "../../../mock/data/NomenclatureDocumentDelivrance";
import { NATURE_MENTION } from "../../../mock/data/NomenclatureNatureMention";
import { TYPE_MENTION } from "../../../mock/data/NomenclatureTypeMention";

describe("Test de IMention", () => {
  DocumentDelivrance.init(DOCUMENT_DELIVRANCE);
  NatureMention.init(NATURE_MENTION);
  TypeMention.init(TYPE_MENTION);

  test("test getTexte", () => {
    const mention = Mention.depuisDto({
      id: "",
      numeroOrdre: 1,
      textes: {
        texteMention: "texteMention",
        texteApposition: "texteApposition"
      },
      typeMention: { idTypeMention: "b048b66e-e0fa-4052-a63d-9111b442c3ee" }
    })!;

    expect(mention.getTexteExtrait()).toBe("texteMention texteApposition");

    mention.textes.texteMentionDelivrance = "texteMentionDelivrance";

    expect(mention.getTexteExtrait()).toBe("texteMentionDelivrance");
  });

  test("Attendu: ilExisteUneMentionInterdite fonctionne correctement", () => {
    const mentionsAutorisees: INatureMention[] = [
      {
        code: "5",
        libelle: "Divorce"
      } as INatureMention,
      {
        code: "14",
        libelle: "Pupille"
      } as INatureMention,
      {
        code: "26",
        libelle: "Acte héritier"
      } as INatureMention
    ];

    const mentionsAvecUneMentionAnnulationMariage: INatureMention[] = [
      {
        code: "5",
        libelle: "Divorce"
      } as INatureMention,
      {
        code: "15",
        libelle: "Annulation mariage"
      } as INatureMention,
      {
        code: "26",
        libelle: "Acte héritier"
      } as INatureMention
    ];

    const mentionsAvecUneMentionNationalite: INatureMention[] = [
      {
        code: "5",
        libelle: "Divorce"
      } as INatureMention,
      {
        code: "8",
        libelle: "Nationalité"
      } as INatureMention,
      {
        code: "26",
        libelle: "Acte héritier"
      } as INatureMention
    ];

    expect(
      NatureMention.ilExisteUneMentionInterdite(
        mentionsAutorisees,
        "MARIAGE",
        DocumentDelivrance.depuisCode(ECodeDocumentDelivrance.CODE_EXTRAIT_AVEC_FILIATION)
      )
    ).toBeFalsy();

    expect(
      NatureMention.ilExisteUneMentionInterdite(
        mentionsAvecUneMentionAnnulationMariage,
        "MARIAGE",
        DocumentDelivrance.depuisCode(ECodeDocumentDelivrance.CODE_EXTRAIT_AVEC_FILIATION)
      )
    ).toBeTruthy();

    expect(
      NatureMention.ilExisteUneMentionInterdite(
        mentionsAvecUneMentionAnnulationMariage,
        "MARIAGE",
        DocumentDelivrance.depuisCode(ECodeDocumentDelivrance.CODE_EXTRAIT_SANS_FILIATION)
      )
    ).toBeTruthy();

    expect(
      NatureMention.ilExisteUneMentionInterdite(
        mentionsAvecUneMentionAnnulationMariage,
        "NAISSANCE",
        DocumentDelivrance.depuisCode(ECodeDocumentDelivrance.CODE_EXTRAIT_AVEC_FILIATION)
      )
    ).toBeTruthy();

    expect(
      NatureMention.ilExisteUneMentionInterdite(
        mentionsAvecUneMentionAnnulationMariage,
        "NAISSANCE",
        DocumentDelivrance.depuisCode(ECodeDocumentDelivrance.CODE_EXTRAIT_SANS_FILIATION)
      )
    ).toBeTruthy();

    expect(
      NatureMention.ilExisteUneMentionInterdite(
        mentionsAvecUneMentionNationalite,
        "NAISSANCE",
        DocumentDelivrance.depuisCode(ECodeDocumentDelivrance.CODE_EXTRAIT_AVEC_FILIATION)
      )
    ).toBeFalsy();

    expect(
      NatureMention.ilExisteUneMentionInterdite(
        mentionsAvecUneMentionNationalite,
        "NAISSANCE",
        DocumentDelivrance.depuisCode(ECodeDocumentDelivrance.CODE_EXTRAIT_SANS_FILIATION)
      )
    ).toBeTruthy();
  });
});

describe("Test de IMentionAffichage", () => {
  const mentionDto: IMentionDto = {
    textes: {
      texteMention: "texte mention",
      texteApposition: "texte apposition"
    },
    typeMention: {
      idTypeMention: "eac6d665-ef10-4ed0-b617-e4b507f947d7"
    },
    numeroOrdreExtrait: 1,
    id: "1",
    numeroOrdre: 1
  };

  const mentionApi: Mention = Mention.depuisDto(mentionDto)!;

  const mentionOpposable: IMentionAffichage = {
    texte: "texte mention",
    estPresent: true,
    nature: { opposableAuTiers: true } as INatureMention,
    id: "1",
    numeroOrdre: 0,
    estSupprimable: true,
    estModifiable: false
  };

  const mentionNonOpposable: IMentionAffichage = {
    texte: "texte mention",
    estPresent: true,
    nature: { opposableAuTiers: false } as INatureMention,
    id: "1",
    numeroOrdre: 0,
    estSupprimable: true,
    estModifiable: false
  };

  test("mappingVersMentionAffichage pour extrait avec filiation", () => {
    expect(mappingVersMentionAffichage([mentionApi], documentReponseExtraitAvecFiliation)).toStrictEqual([
      {
        nature: {
          code: "3",
          estActif: true,
          id: "b03ceb0c-7bd0-4a0c-9adc-4af505fe2260",
          libelle: "Séparation de corps",
          nom: "NATURE_MENTION",
          opposableAuTiers: true
        },
        texte: "texte mention texte apposition",
        estPresent: true,
        id: "1",
        numeroOrdre: 1,
        estSupprimable: false,
        estModifiable: false
      }
    ]);
  });

  test("mappingVersMentionAffichage pour copie intégrale", () => {
    expect(mappingVersMentionAffichage([mentionApi], documentReponseCopieIntegrale)).toStrictEqual([
      {
        nature: {
          code: "3",
          estActif: true,
          id: "b03ceb0c-7bd0-4a0c-9adc-4af505fe2260",
          libelle: "Séparation de corps",
          nom: "NATURE_MENTION",
          opposableAuTiers: true
        },
        texte: "texte mention texte apposition ",
        estPresent: true,
        id: "1",
        numeroOrdre: 1,
        estSupprimable: false,
        estModifiable: false
      }
    ]);
  });

  test("mappingVersMentionAffichage pour extrait plurilingue", () => {
    expect(
      mappingVersMentionAffichage(
        [Mention.depuisDto({ ...mentionDto, textes: { texteMentionPlurilingue: "Texte mention plurilingue" } })!],
        {
          ...documentReponseCopieIntegrale,
          typeDocument: DocumentDelivrance.idDepuisCode(ECodeDocumentDelivrance.CODE_EXTRAIT_PLURILINGUE)
        },
        "NAISSANCE"
      )
    ).toStrictEqual([
      {
        nature: {
          code: "3",
          estActif: true,
          id: "b03ceb0c-7bd0-4a0c-9adc-4af505fe2260",
          libelle: "Séparation de corps",
          nom: "NATURE_MENTION",
          opposableAuTiers: true
        },
        texte: "Texte mention plurilingue",
        estPresent: true,
        id: "1",
        numeroOrdre: 1,
        estSupprimable: true,
        estModifiable: false
      }
    ]);
  });

  test("mappingVersMentionAffichage pour copie non signée", () => {
    expect(mappingVersMentionAffichage([mentionApi], documentReponseCopieNonSignee)).toStrictEqual([]);
  });

  test("mappingVersMentionApi", () => {
    expect(mappingVersMentionsApi([mentionApi], [mentionOpposable], "28580709-06dd-4df2-bf6e-70a9482940a1")).toStrictEqual({
      mentionsAEnvoyer: [
        {
          id: "1",
          textes: {
            texteMentionDelivrance: "texte mention",
            texteMentionPlurilingue: undefined
          },
          typeMention: {
            idNatureMention: "",
            idTypeMention: "eac6d665-ef10-4ed0-b617-e4b507f947d7"
          },
          numeroOrdreExtrait: 1
        }
      ],
      mentionsRetirees: []
    });
  });

  test("modificationEffectuee", () => {
    expect(modificationEffectuee([mentionNonOpposable], [mentionApi], documentReponseExtraitAvecFiliation)).toBeTruthy();
  });
});
