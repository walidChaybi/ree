import { useSupprimerDocumentComplementaireApi } from "@hook/requete/SupprimerDocumentComplementaireHook";
import { URL_MES_REQUETES_DELIVRANCE } from "@router/ReceUrls";
import { render, screen, waitFor } from "@testing-library/react";
import { storeRece } from "@util/storeRece";
import { createMemoryHistory, MemoryHistory } from "history";
import React from "react";
import { userDroitCOMEDEC } from "../../../../mock/data/connectedUserAvecDroit";
import { requeteAvecDocs } from "../../../../mock/data/DetailRequeteDelivrance";

let history: MemoryHistory;
const globalAny: any = global;
globalAny.URL.createObjectURL = jest.fn();



const params = {
  idDocumentReponse: requeteAvecDocs.documentsReponses[2].id,
  idRequete: requeteAvecDocs.id
};

const HookConsumer: React.FC = () => {
  const res = useSupprimerDocumentComplementaireApi(params);

  return <div>{res ? "28bc3078-7e53-4b8b-8cf8-7f75a2502573" : ""}</div>;
};

beforeEach(async () => {
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


