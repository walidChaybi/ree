import { render } from "@testing-library/react";
import React from "react";
import request from "superagent";
import { configRequetesV2 } from "../../../../mock/superagent-config/superagent-mock-requetes-v2";
import {
  FenetreDocumentReponse,
  onClose
} from "../../../../views/pages/apercuRequete/contenu/document/FenetreDocumentReponse";

const superagentMock = require("superagent-mock")(request, configRequetesV2);

test("renders Fenetre Document réponse fonctionne correctement", async () => {
  const toggle = jest.fn();

  render(
    <FenetreDocumentReponse
      toggleFenetre={toggle}
      idPiece="12345"
      nom="Journal d'Anne Franck"
      numRequete="69"
    />
  );

  expect(toggle).not.toHaveBeenCalled();
});

test("onClose", () => {
  const toggleFenetre = jest.fn();
  onClose({
    idPiece: "string",
    nom: "string",
    numRequete: "string",
    toggleFenetre
  });
  expect(toggleFenetre).toHaveBeenCalledTimes(1);
});

afterAll(() => {
  superagentMock.unset();
});
