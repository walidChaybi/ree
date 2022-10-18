import {
  SauvegarderMentionsParam,
  useSauvegarderMentions
} from "@hook/acte/mentions/SauvegarderMentionsHook";
import { IFicheActe } from "@model/etatcivil/acte/IFicheActe";
import { IMention } from "@model/etatcivil/acte/mention/IMention";
import { NatureActe } from "@model/etatcivil/enum/NatureActe";
import { NatureMention } from "@model/etatcivil/enum/NatureMention";
import { render, screen, waitFor } from "@testing-library/react";
import React from "react";
import request from "superagent";
import { documentReponseExtraitAvecFiliation } from "../../../../mock/data/DocumentReponse";
import { requeteDelivranceRDC } from "../../../../mock/data/requeteDelivrance";
import { configComposition } from "../../../../mock/superagent-config/superagent-mock-composition";
import { configEtatcivil } from "../../../../mock/superagent-config/superagent-mock-etatcivil";
import { configRequetes } from "../../../../mock/superagent-config/superagent-mock-requetes";
import { configTeleverification } from "../../../../mock/superagent-config/superagent-mock-televerification";

const superagentMock = require("superagent-mock")(request, [
  configEtatcivil[0],
  configRequetes[0],
  configComposition[0],
  configTeleverification[0]
]);

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

const params: SauvegarderMentionsParam = {
  mentionsApi: { mentions: [mentionApi] },
  mentions: [mentionOpposable],
  acte: {
    id: "19c0d767-64e5-4376-aa1f-6d781a2a235a",
    nature: NatureActe.NAISSANCE
  } as IFicheActe,
  document: documentReponseExtraitAvecFiliation,
  requete: requeteDelivranceRDC
};

const HookConsumer: React.FC = () => {
  const res = useSauvegarderMentions(params);

  return <div>{res?.idDoc}</div>;
};

test("Attendu: useSauvegarderMentions fonctionne correctement", async () => {
  render(<HookConsumer />);

  await waitFor(() => {
    // on utilise une image base64 plutôt qu'un pdf pour les tests (prend beaucoup moins de place)
    expect(
      screen.getByText("bbac2335-562c-4b14-96aa-4386814c02a2")
    ).not.toBeNull();
  });
});

afterAll(() => {
  superagentMock.unset();
});
