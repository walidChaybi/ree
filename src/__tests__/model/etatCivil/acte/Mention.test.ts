import request from "superagent";
import { configEtatcivil } from "../../../../mock/superagent-config/superagent-mock-etatcivil";
import {
  IMention,
  Mention
} from "../../../../model/etatcivil/acte/mention/IMention";
import { NatureMention } from "../../../../model/etatcivil/enum/NatureMention";

const superagentMock = require("superagent-mock")(request, configEtatcivil);

beforeAll(() => {
  NatureMention.init();
});

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

test("test getTexte", () => {
  expect(Mention.getTexte(mention)).toBe("texteMention texteApposition");

  mention.textes.texteMentionDelivrance = "texteMentionDelivrance";

  expect(Mention.getTexte(mention)).toBe("texteMentionDelivrance");
});

afterAll(() => {
  superagentMock.unset();
});
