import { waitFor } from "@testing-library/react";
import request from "superagent";
import { documentReponseExtraitAvecFiliation } from "../../../../mock/data/DocumentReponse";
import { configEtatcivil } from "../../../../mock/superagent-config/superagent-mock-etatcivil";
import { configRequetes } from "../../../../mock/superagent-config/superagent-mock-requetes";
import { IMention } from "../../../../model/etatcivil/acte/mention/IMention";
import { NatureMention } from "../../../../model/etatcivil/enum/NatureMention";
import { DocumentDelivrance } from "../../../../model/requete/enum/DocumentDelivrance";
import {
  aucuneMentionsNationalite,
  handleCheckBox,
  handleReorga,
  IMentionAffichage,
  mappingVersMentionAffichage,
  mappingVersMentionsApi,
  miseAjourEnFonctionNature,
  modificationEffectue,
  texteEnFonctionOpposableAuTiers,
  texteNonModifieNatureChangePasDeTexteDelivrance
} from "../../../../views/pages/requeteDelivrance/editionExtraitCopie/contenu/onglets/mentions/GestionMentionsUtil";

const superagentMock = require("superagent-mock")(request, [
  configEtatcivil[0],
  configRequetes[0]
]);

beforeAll(async () => {
  NatureMention.init();
  DocumentDelivrance.init();

  await waitFor(() => {
    expect(DocumentDelivrance.length).toBeGreaterThan(0);
  });
});

const mentionApi = {
  textes: {
    texteMention: "texte mention",
    texteApposition: "texte apposition"
  },
  typeMention: {
    nature: { opposableAuTiers: false } as NatureMention
  },
  numeroOrdreExtrait: 1,
  id: "1"
} as IMention;

const mentionOpposable = {
  texte: "texte mention",
  estPresent: true,
  nature: { opposableAuTiers: true } as NatureMention,
  id: "1",
  numeroOrdre: 0
};
const mentionNonOpposable = {
  texte: "texte mention",
  estPresent: true,
  nature: { opposableAuTiers: false } as NatureMention,
  id: "1",
  numeroOrdre: 0
};

test("texteEnFonctionOpposableAuTiers", () => {
  expect(
    texteEnFonctionOpposableAuTiers(
      mentionOpposable,
      mentionNonOpposable,
      mentionApi
    )
  ).toBe("texte mention");
  expect(
    texteEnFonctionOpposableAuTiers(
      mentionNonOpposable,
      mentionOpposable,
      mentionApi
    )
  ).toBe("texte mention texte apposition");
});

test("texteNonModifieNatureChangePasDeTexteDelivrance", () => {
  expect(
    texteNonModifieNatureChangePasDeTexteDelivrance(
      mentionNonOpposable,
      mentionOpposable,
      mentionApi
    )
  ).toBeTruthy();
});

test("modificationEffectue", () => {
  expect(
    modificationEffectue(
      [mentionNonOpposable],
      [mentionApi],
      documentReponseExtraitAvecFiliation
    )
  ).toBeTruthy();
});

test("miseAjourEnFonctionNature", () => {
  let mentionsTest: IMentionAffichage[];
  function setMentions(arg: IMentionAffichage[]) {
    mentionsTest = arg;
  }
  let mentionSelectTest: IMentionAffichage;
  function setMentionSelect(arg: IMentionAffichage) {
    mentionSelectTest = arg;
  }

  miseAjourEnFonctionNature(
    [mentionNonOpposable],
    0,
    mentionOpposable,
    [mentionApi],
    0,
    setMentionSelect,
    setMentions
  );

  expect(mentionSelectTest).toStrictEqual({
    texte: "texte mention texte apposition",
    estPresent: true,
    nature: { opposableAuTiers: true },
    id: "1",
    numeroOrdre: 0
  });

  expect(mentionsTest).toStrictEqual([
    {
      texte: "texte mention texte apposition",
      estPresent: true,
      nature: { opposableAuTiers: false },
      id: "1",
      numeroOrdre: 0
    }
  ]);
});

test("handleCheckBox", () => {
  let mentionsTest: IMentionAffichage[];
  function setMentions(arg: IMentionAffichage[]) {
    mentionsTest = arg;
  }

  handleCheckBox([mentionNonOpposable], setMentions, "1");

  expect(mentionsTest).toStrictEqual([
    {
      texte: "texte mention texte apposition",
      estPresent: false,
      nature: { opposableAuTiers: false },
      id: "1",
      numeroOrdre: 0
    }
  ]);
});

test("handleReorga", () => {
  let mentionsTest: IMentionAffichage[];
  function setMentions(arg: IMentionAffichage[]) {
    mentionsTest = arg;
  }

  handleReorga([mentionNonOpposable, mentionOpposable], setMentions, 0, 1);

  expect(mentionsTest).toStrictEqual([mentionOpposable, mentionNonOpposable]);
});

test("mappingVersMentionAffichage", () => {
  expect(
    mappingVersMentionAffichage(
      [mentionApi],
      documentReponseExtraitAvecFiliation
    )
  ).toStrictEqual([
    {
      nature: { opposableAuTiers: false },
      texte: "texte mention",
      estPresent: true,
      id: "1",
      numeroOrdre: 1,
      aPoubelle: false
    }
  ]);
});

test("mappingVersMentionApi", () => {
  expect(
    mappingVersMentionsApi([mentionApi], [mentionOpposable])
  ).toStrictEqual({
    mentionsAEnvoyer: [
      {
        textes: {
          texteApposition: "texte apposition",
          texteMention: "texte mention",
          texteMentionDelivrance: "texte mention"
        },
        typeMention: {
          nature: {
            code: undefined,
            estActif: undefined,
            id: "",
            libelle: undefined,
            nom: "NATURE_MENTION",
            opposableAuTiers: true
          }
        },
        numeroOrdreExtrait: 1,
        id: "1"
      }
    ],
    mentionsRetirees: []
  });
});

test("aucuneMentionsNationalite", () => {
  expect(aucuneMentionsNationalite([mentionOpposable])).toBeTruthy();
});

afterAll(() => {
  superagentMock.unset();
});
