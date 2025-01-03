import { DOCUMENT_DELIVRANCE } from "@mock/data/NomenclatureDocumentDelivrance";
import { NATURE_MENTION } from "@mock/data/NomenclatureNatureMention";
import { TYPE_MENTION } from "@mock/data/NomenclatureTypeMention";
import { IMention, Mention } from "@model/etatcivil/acte/mention/IMention";
import { TypeMention } from "@model/etatcivil/acte/mention/ITypeMention";
import { NatureActe } from "@model/etatcivil/enum/NatureActe";
import { INatureMention, NatureMention } from "@model/etatcivil/enum/NatureMention";
import { DocumentDelivrance, ECodeDocumentDelivrance } from "@model/requete/enum/DocumentDelivrance";
import { describe, expect, test } from "vitest";

describe("Test de IMention", () => {
  DocumentDelivrance.init(DOCUMENT_DELIVRANCE);
  NatureMention.init(NATURE_MENTION);
  TypeMention.init(TYPE_MENTION);

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
