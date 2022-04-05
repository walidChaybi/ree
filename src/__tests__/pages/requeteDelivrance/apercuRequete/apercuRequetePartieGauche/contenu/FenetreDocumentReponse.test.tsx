import { render, waitFor } from "@testing-library/react";
import React from "react";
import request from "superagent";
import { configRequetes } from "../../../../../../mock/superagent-config/superagent-mock-requetes";
import {
    FenetreDocumentReponse,
    onClose
} from "../../../../../../views/pages/requeteDelivrance/apercuRequete/apercuRequetePartieGauche/contenu/document/FenetreDocumentReponse";

const superagentMock = require("superagent-mock")(request, configRequetes);

const globalAny: any = global;
globalAny.open = () => {
  return { ...window, addEventListener: jest.fn() };
};
globalAny.close = jest.fn();
globalAny.URL.createObjectURL = jest.fn();

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

afterAll(() => {
  superagentMock.unset();
});
