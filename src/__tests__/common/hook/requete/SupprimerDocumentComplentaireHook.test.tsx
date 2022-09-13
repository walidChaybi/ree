import { useSupprimerDocumentComplementaireApi } from "@hook/requete/SupprimerDocumentComplementaireHook";
import { TypeMention } from "@model/etatcivil/acte/mention/ITypeMention";
import { NatureMention } from "@model/etatcivil/enum/NatureMention";
import { DocumentDelivrance } from "@model/requete/enum/DocumentDelivrance";
import { URL_MES_REQUETES_DELIVRANCE } from "@router/ReceUrls";
import { render, screen, waitFor } from "@testing-library/react";
import { storeRece } from "@util/storeRece";
import { createMemoryHistory, MemoryHistory } from "history";
import React from "react";
import request from "superagent";
import { userDroitCOMEDEC } from "../../../../mock/data/connectedUserAvecDroit";
import { requeteAvecDocs } from "../../../../mock/data/DetailRequeteDelivrance";
import { configComposition } from "../../../../mock/superagent-config/superagent-mock-composition";
import { configEtatcivil } from "../../../../mock/superagent-config/superagent-mock-etatcivil";
import { configRequetes } from "../../../../mock/superagent-config/superagent-mock-requetes";

let history: MemoryHistory;
const globalAny: any = global;
globalAny.URL.createObjectURL = jest.fn();

const superagentMock = require("superagent-mock")(request, [
  configEtatcivil[0],
  configRequetes[0],
  configComposition[0]
]);

const params = {
  idDocumentReponse: requeteAvecDocs.documentsReponses[2].id,
  idRequete: requeteAvecDocs.id
};

const HookConsumer: React.FC = () => {
  const res = useSupprimerDocumentComplementaireApi(params);

  return <div>{res ? "28bc3078-7e53-4b8b-8cf8-7f75a2502573" : ""}</div>;
};

beforeEach(async () => {
  DocumentDelivrance.init();
  NatureMention.init();
  TypeMention.init();
  storeRece.utilisateurCourant = userDroitCOMEDEC;

  history = createMemoryHistory();
  history.push(URL_MES_REQUETES_DELIVRANCE);
});

test("Attendu: useSupprimerDocumentComplementaireApi fonctionne correctement", async () => {
  render(<HookConsumer />);

  await waitFor(() => {
    expect(
      screen.getByText("28bc3078-7e53-4b8b-8cf8-7f75a2502573")
    ).toBeDefined();
  });
});

afterAll(() => {
  superagentMock.unset();
});
