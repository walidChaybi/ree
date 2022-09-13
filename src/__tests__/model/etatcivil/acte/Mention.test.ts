import { IMention, Mention } from "@model/etatcivil/acte/mention/IMention";
import { NatureActe } from "@model/etatcivil/enum/NatureActe";
import { NatureMention } from "@model/etatcivil/enum/NatureMention";
import { DocumentDelivrance } from "@model/requete/enum/DocumentDelivrance";
import {
  CODE_EXTRAIT_AVEC_FILIATION,
  CODE_EXTRAIT_SANS_FILIATION
} from "@model/requete/enum/DocumentDelivranceConstante";
import request from "superagent";
import { configEtatcivil } from "../../../../mock/superagent-config/superagent-mock-etatcivil";
import { configRequetes } from "../../../../mock/superagent-config/superagent-mock-requetes";

const superagentMock = require("superagent-mock")(request, [
  configRequetes[0],
  configEtatcivil[0]
]);

beforeAll(() => {
  NatureMention.init();
  DocumentDelivrance.init();
});

test("test getTexte", () => {
  const mention = {
    textes: {
      texteMention: "texteMention",
      texteApposition: "texteApposition"
    },
    typeMention: {
      nature: {
        code: "5",
        libelle: "Divorce",
        estActif: true,
        opposableAuTiers: true,
        categorie: undefined
      } as NatureMention
    }
  } as IMention;

  expect(Mention.getTexteExtrait(mention)).toBe("texteMention texteApposition");

  mention.textes.texteMentionDelivrance = "texteMentionDelivrance";

  expect(Mention.getTexteExtrait(mention)).toBe("texteMentionDelivrance");
});

test("Attendu: ilExisteUneMentionInterdite fonctionne correctement", () => {
  const mentionsAutorisees: NatureMention[] = [
    {
      code: "5",
      libelle: "Divorce"
    } as NatureMention,
    {
      code: "14",
      libelle: "Pupille"
    } as NatureMention,
    {
      code: "26",
      libelle: "Acte héritier"
    } as NatureMention
  ];

  const mentionsAvecUneMentionAnnulationMariage: NatureMention[] = [
    {
      code: "5",
      libelle: "Divorce"
    } as NatureMention,
    {
      code: "15",
      libelle: "Annulation mariage"
    } as NatureMention,
    {
      code: "26",
      libelle: "Acte héritier"
    } as NatureMention
  ];

  const mentionsAvecUneMentionNationalite: NatureMention[] = [
    {
      code: "5",
      libelle: "Divorce"
    } as NatureMention,
    {
      code: "8",
      libelle: "Nationalité"
    } as NatureMention,
    {
      code: "26",
      libelle: "Acte héritier"
    } as NatureMention
  ];

  expect(
    NatureMention.ilExisteUneMentionInterdite(
      mentionsAutorisees,
      NatureActe.MARIAGE,
      DocumentDelivrance.getEnumForCode(CODE_EXTRAIT_AVEC_FILIATION)
    )
  ).toBeFalsy();

  expect(
    NatureMention.ilExisteUneMentionInterdite(
      mentionsAvecUneMentionAnnulationMariage,
      NatureActe.MARIAGE,
      DocumentDelivrance.getEnumForCode(CODE_EXTRAIT_AVEC_FILIATION)
    )
  ).toBeTruthy();

  expect(
    NatureMention.ilExisteUneMentionInterdite(
      mentionsAvecUneMentionAnnulationMariage,
      NatureActe.MARIAGE,
      DocumentDelivrance.getEnumForCode(CODE_EXTRAIT_SANS_FILIATION)
    )
  ).toBeTruthy();

  expect(
    NatureMention.ilExisteUneMentionInterdite(
      mentionsAvecUneMentionAnnulationMariage,
      NatureActe.NAISSANCE,
      DocumentDelivrance.getEnumForCode(CODE_EXTRAIT_AVEC_FILIATION)
    )
  ).toBeTruthy();

  expect(
    NatureMention.ilExisteUneMentionInterdite(
      mentionsAvecUneMentionAnnulationMariage,
      NatureActe.NAISSANCE,
      DocumentDelivrance.getEnumForCode(CODE_EXTRAIT_SANS_FILIATION)
    )
  ).toBeTruthy();

  expect(
    NatureMention.ilExisteUneMentionInterdite(
      mentionsAvecUneMentionNationalite,
      NatureActe.NAISSANCE,
      DocumentDelivrance.getEnumForCode(CODE_EXTRAIT_AVEC_FILIATION)
    )
  ).toBeFalsy();

  expect(
    NatureMention.ilExisteUneMentionInterdite(
      mentionsAvecUneMentionNationalite,
      NatureActe.NAISSANCE,
      DocumentDelivrance.getEnumForCode(CODE_EXTRAIT_SANS_FILIATION)
    )
  ).toBeTruthy();
});

afterAll(() => {
  superagentMock.unset();
});
