import { mapActe } from "@hook/repertoires/MappingRepertoires";
import { IMention } from "@model/etatcivil/acte/mention/IMention";
import { NatureMention } from "@model/etatcivil/enum/NatureMention";
import { DocumentDelivrance } from "@model/requete/enum/DocumentDelivrance";
import {
  aucuneMentionsAffichageNationalite,
  handleCheckBox,
  handleReorga,
  IMentionAffichage,
  mappingVersMentionAffichage,
  mappingVersMentionsApi,
  miseAjourEnFonctionNature,
  modificationEffectue,
  texteEnFonctionOpposableAuTiers,
  texteNonModifieNatureChangePasDeTexteDelivrance,
  validerMentions
} from "@pages/requeteDelivrance/editionExtraitCopie/contenu/onglets/mentions/GestionMentionsUtil";
import { waitFor } from "@testing-library/react";
import request from "superagent";
import {
  documentReponseCopieIntegrale,
  documentReponseExtraitAvecFiliation
} from "../../../../mock/data/DocumentReponse";
import { ficheActe2, ficheActeMariage } from "../../../../mock/data/ficheActe";
import { mentionsAffichage, mentionsApi } from "../../../../mock/data/mentions";
import { configEtatcivil } from "../../../../mock/superagent-config/superagent-mock-etatcivil";
import { configRequetes } from "../../../../mock/superagent-config/superagent-mock-requetes";
import { acte } from "../../fiche/data/ficheActe";

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
  numeroOrdre: 0,
  aPoubelle: true
};
const mentionNonOpposable = {
  texte: "texte mention",
  estPresent: true,
  nature: { opposableAuTiers: false } as NatureMention,
  id: "1",
  numeroOrdre: 0,
  aPoubelle: true
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

  expect(mentionSelectTest!).toStrictEqual({
    aPoubelle: true,
    texte: "texte mention texte apposition",
    estPresent: true,
    nature: { opposableAuTiers: true },
    id: "1",
    numeroOrdre: 0
  });

  expect(mentionsTest!).toStrictEqual([
    {
      aPoubelle: true,
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

  handleCheckBox([mentionNonOpposable], setMentions, 0);

  expect(mentionsTest!).toStrictEqual([
    {
      aPoubelle: true,
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

  expect(mentionsTest!).toStrictEqual([mentionOpposable, mentionNonOpposable]);
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
    mappingVersMentionsApi(
      [mentionApi],
      [mentionOpposable],
      "28580709-06dd-4df2-bf6e-70a9482940a1"
    )
  ).toStrictEqual({
    mentionsAEnvoyer: [
      {
        id: "1",
        textes: {
          texteMentionDelivrance: "texte mention",
          texteMentionPlurilingue: undefined
        },
        typeMention: {
          nature: {
            id: ""
          }
        },
        numeroOrdreExtrait: 1
      }
    ],
    mentionsRetirees: []
  });
});

test("aucuneMentionsNationalite", () => {
  expect(aucuneMentionsAffichageNationalite([mentionOpposable])).toBeTruthy();
});

test("Attendu: validerMentions fonctionne correctement", () => {
  const sauvegardeFonctionConfirm = window.confirm;
  window.confirm = () => true;
  const sauvegarderMentions = jest.fn();

  const mentionsAffichageAvecUnElementdeMoins = mentionsAffichage.slice(1);
  const mentionsApi1 = mentionsApi as any as IMention[];

  // const test = modificationEffectue(
  //   mentionsAffichage1,
  //   mentionsApi1,
  //   document1
  // );

  // Copie intégrale et une modification des mentions a été effectuée
  ////////////////////////////////////////////////////////////////////
  validerMentions(
    mentionsAffichageAvecUnElementdeMoins,
    sauvegarderMentions,
    mentionsApi1,
    acte,
    documentReponseCopieIntegrale
  );
  expect(sauvegarderMentions).toBeCalledTimes(1);

  window.confirm = () => false;
  sauvegarderMentions.mockClear();

  validerMentions(
    mentionsAffichageAvecUnElementdeMoins,
    sauvegarderMentions,
    mentionsApi1,
    acte,
    documentReponseCopieIntegrale
  );

  expect(sauvegarderMentions).toBeCalledTimes(0);

  // Ré-initialisation
  ////////////////////////////////////////////////////////////////////
  window.confirm = () => true;
  sauvegarderMentions.mockClear();

  // Acte Naissance de type ACQ et aucune mention de nationalité
  ////////////////////////////////////////////////////////////////////
  validerMentions(
    mentionsAffichage,
    sauvegarderMentions,
    mentionsApi1,
    mapActe(ficheActe2.data),
    documentReponseExtraitAvecFiliation
  );

  expect(sauvegarderMentions).toBeCalledTimes(1);

  window.confirm = () => false;
  sauvegarderMentions.mockClear();

  validerMentions(
    mentionsAffichage,
    sauvegarderMentions,
    mentionsApi1,
    mapActe(ficheActe2.data),
    documentReponseExtraitAvecFiliation
  );

  expect(sauvegarderMentions).toBeCalledTimes(0);

  // Ré-initialisation
  ////////////////////////////////////////////////////////////////////
  window.confirm = () => true;
  sauvegarderMentions.mockClear();

  // Il y a une mention interdite pour l'acte de mariage
  ////////////////////////////////////////////////////////////////////
  validerMentions(
    mentionsAffichage,
    sauvegarderMentions,
    mentionsApi1,
    mapActe(ficheActeMariage.data),
    documentReponseExtraitAvecFiliation
  );

  window.confirm = () => false;
  sauvegarderMentions.mockClear();

  validerMentions(
    mentionsAffichage,
    sauvegarderMentions,
    mentionsApi1,
    mapActe(ficheActeMariage.data),
    documentReponseExtraitAvecFiliation
  );

  expect(sauvegarderMentions).toBeCalledTimes(0);

  // Restauration du confirm
  window.confirm = sauvegardeFonctionConfirm;
});

afterAll(() => {
  superagentMock.unset();
});
