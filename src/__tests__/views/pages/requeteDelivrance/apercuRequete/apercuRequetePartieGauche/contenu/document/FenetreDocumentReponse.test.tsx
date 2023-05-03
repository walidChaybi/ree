import {
  FenetreDocumentReponse,
  onClose
} from "@pages/requeteDelivrance/apercuRequete/apercuRequetePartieGauche/contenu/document/FenetreDocumentReponse";
import { render, waitFor } from "@testing-library/react";
import React from "react";
import { mockFenetreFicheTestFunctions } from "../../../../../../../__tests__utils__/testsUtil";

beforeAll(async () => {
  mockFenetreFicheTestFunctions();
});

test("renders Fenetre Document réponse fonctionne correctement", async () => {
  const toggle = jest.fn();

  render(
    <FenetreDocumentReponse
      toggleFenetre={toggle}
      idDocument="bbac2335-562c-4b14-96aa-4386814c02a2"
      nom="Journal d'Anne Franck"
      numRequete="69"
    />
  );

  await waitFor(() => {
    expect(toggle).not.toHaveBeenCalled();
  });
});

test("onClose", () => {
  const toggleFenetre = jest.fn();
  onClose({
    idDocument: "bbac2335-562c-4b14-96aa-4386814c02a2",
    nom: "string",
    numRequete: "string",
    toggleFenetre
  });
  expect(toggleFenetre).toHaveBeenCalledTimes(1);
});


