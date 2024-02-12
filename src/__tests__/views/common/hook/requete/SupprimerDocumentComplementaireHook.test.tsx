import { useSupprimerDocumentComplementaireApi } from "@hook/requete/SupprimerDocumentComplementaireHook";
import { userDroitCOMEDEC } from "@mock/data/connectedUserAvecDroit";
import { requeteAvecDocs } from "@mock/data/DetailRequeteDelivrance";
import { render, screen, waitFor } from "@testing-library/react";
import { storeRece } from "@util/storeRece";
import React from "react";
import { mockFenetreFicheTestFunctions } from "../../../../__tests__utils__/testsUtil";

beforeAll(async () => {
  mockFenetreFicheTestFunctions();
});
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
});

test("Attendu: useSupprimerDocumentComplementaireApi fonctionne correctement", async () => {
  render(<HookConsumer />);

  await waitFor(() => {
    expect(
      screen.getByText("28bc3078-7e53-4b8b-8cf8-7f75a2502573")
    ).toBeDefined();
  });
});
