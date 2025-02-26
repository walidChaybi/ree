import { useSupprimerDocumentComplementaireApi } from "@hook/requete/SupprimerDocumentComplementaireHook";
import { render, screen, waitFor } from "@testing-library/react";
import React from "react";
import { beforeAll, expect, test } from "vitest";
import { mockFenetreFicheTestFunctions } from "../../../../__tests__utils__/testsUtil";
import { requeteAvecDocs } from "../../../../mock/data/DetailRequeteDelivrance";

beforeAll(() => {
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

test("Attendu: useSupprimerDocumentComplementaireApi fonctionne correctement", () => {
  render(<HookConsumer />);

  waitFor(() => {
    expect(screen.getByText("28bc3078-7e53-4b8b-8cf8-7f75a2502573")).toBeDefined();
  });
});
