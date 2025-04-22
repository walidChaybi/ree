import {
  documentReponseCopieIntegrale,
  documentReponseCopieNonSignee,
  documentReponseExtraitAvecFiliation
} from "@mock/data/DocumentReponse";
import { IEvenement } from "@model/etatcivil/acte/IEvenement";
import { IAutoriteEtatCivil } from "@model/etatcivil/acte/mention/IAutoriteEtatCivil";
import { IMention, Mention } from "@model/etatcivil/acte/mention/IMention";
import {
  IMentionAffichage,
  mappingVersMentionAffichage,
  mappingVersMentionsApi,
  modificationEffectuee
} from "@model/etatcivil/acte/mention/IMentionAffichage";
import { TypeMention } from "@model/etatcivil/acte/mention/ITypeMention";
import { NatureActe } from "@model/etatcivil/enum/NatureActe";
import { INatureMention, NatureMention } from "@model/etatcivil/enum/NatureMention";
import { StatutMention } from "@model/etatcivil/enum/StatutMention";
import { DocumentDelivrance, ECodeDocumentDelivrance } from "@model/requete/enum/DocumentDelivrance";
import { beforeAll, describe, expect, test } from "vitest";
import { DOCUMENT_DELIVRANCE } from "../../../mock/data/NomenclatureDocumentDelivrance";
import { NATURE_MENTION } from "../../../mock/data/NomenclatureNatureMention";
import { TYPE_MENTION } from "../../../mock/data/NomenclatureTypeMention";

beforeAll(() => {
  DocumentDelivrance.init(DOCUMENT_DELIVRANCE);
  NatureMention.init(NATURE_MENTION);
  TypeMention.init(TYPE_MENTION);
});

describe("Test de IMention", () => {
  test("test getTexte", () => {
    const mention = {
      textes: {
        texteMention: "texteMention",
        texteApposition: "texteApposition"
      },
      typeMention: {
        natureMention: {
          code: "5",
          libelle: "Divorce",
          estActif: true,
          opposableAuTiers: true
        } as INatureMention
      }
    } as IMention;

    expect(Mention.getTexteExtrait(mention)).toBe("texteMention texteApposition");

    mention.textes.texteMentionDelivrance = "texteMentionDelivrance";

    expect(Mention.getTexteExtrait(mention)).toBe("texteMentionDelivrance");
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
        NatureActe.MARIAGE,
        DocumentDelivrance.depuisCode(ECodeDocumentDelivrance.CODE_EXTRAIT_AVEC_FILIATION)
      )
    ).toBeFalsy();

    expect(
      NatureMention.ilExisteUneMentionInterdite(
        mentionsAvecUneMentionAnnulationMariage,
        NatureActe.MARIAGE,
        DocumentDelivrance.depuisCode(ECodeDocumentDelivrance.CODE_EXTRAIT_AVEC_FILIATION)
      )
    ).toBeTruthy();

    expect(
      NatureMention.ilExisteUneMentionInterdite(
        mentionsAvecUneMentionAnnulationMariage,
        NatureActe.MARIAGE,
        DocumentDelivrance.depuisCode(ECodeDocumentDelivrance.CODE_EXTRAIT_SANS_FILIATION)
      )
    ).toBeTruthy();

    expect(
      NatureMention.ilExisteUneMentionInterdite(
        mentionsAvecUneMentionAnnulationMariage,
        NatureActe.NAISSANCE,
        DocumentDelivrance.depuisCode(ECodeDocumentDelivrance.CODE_EXTRAIT_AVEC_FILIATION)
      )
    ).toBeTruthy();

    expect(
      NatureMention.ilExisteUneMentionInterdite(
        mentionsAvecUneMentionAnnulationMariage,
        NatureActe.NAISSANCE,
        DocumentDelivrance.depuisCode(ECodeDocumentDelivrance.CODE_EXTRAIT_SANS_FILIATION)
      )
    ).toBeTruthy();

    expect(
      NatureMention.ilExisteUneMentionInterdite(
        mentionsAvecUneMentionNationalite,
        NatureActe.NAISSANCE,
        DocumentDelivrance.depuisCode(ECodeDocumentDelivrance.CODE_EXTRAIT_AVEC_FILIATION)
      )
    ).toBeFalsy();

    expect(
      NatureMention.ilExisteUneMentionInterdite(
        mentionsAvecUneMentionNationalite,
        NatureActe.NAISSANCE,
        DocumentDelivrance.depuisCode(ECodeDocumentDelivrance.CODE_EXTRAIT_SANS_FILIATION)
      )
    ).toBeTruthy();
  });
});

describe("Test de IMentionAffichage", () => {
  const mentionApi: IMention = {
    textes: {
      texteMention: "texte mention",
      texteApposition: "texte apposition"
    },
    typeMention: {
      id: "idTypeMention",
      libelle: "libelle type mention",
      natureMention: { opposableAuTiers: false } as INatureMention,
      affecteAnalyseMarginale: false,
      estPresentListeDeroulante: false,
      estSousType: false,
      estSaisieAssistee: false
    },
    numeroOrdreExtrait: 1,
    id: "1",
    numeroOrdre: 1,
    villeApposition: "",
    regionApposition: "",
    dateApposition: new Date(),
    dateCreation: new Date(),
    dateStatut: new Date(),
    statut: {} as StatutMention,
    titulaires: [],
    autoriteEtatCivil: {} as IAutoriteEtatCivil,
    evenement: {} as IEvenement
  };

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
        nature: { opposableAuTiers: false },
        texte: "texte mention",
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
        nature: { opposableAuTiers: false },
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
    console.log(DocumentDelivrance.depuisId(DocumentDelivrance.idDepuisCode(ECodeDocumentDelivrance.CODE_EXTRAIT_PLURILINGUE))?.code);
    expect(
      mappingVersMentionAffichage(
        [{ ...mentionApi, textes: { texteMentionPlurilingue: "Texte mention plurilingue" } }],
        {
          ...documentReponseCopieIntegrale,
          typeDocument: DocumentDelivrance.idDepuisCode(ECodeDocumentDelivrance.CODE_EXTRAIT_PLURILINGUE)
        },
        NatureActe.NAISSANCE
      )
    ).toStrictEqual([
      {
        nature: { opposableAuTiers: false },
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
            idTypeMention: "idTypeMention"
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
