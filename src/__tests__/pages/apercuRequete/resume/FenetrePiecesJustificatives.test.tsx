import { render } from "@testing-library/react";
import React from "react";
import request from "superagent";
import { configRequetesV2 } from "../../../../mock/superagent-config/superagent-mock-requetes-v2";
import { FenetrePiecesJustificatives } from "../../../../views/pages/apercuRequete/resume/contenu/piecesJustificatives/FenetrePiecesJustificatives";

const superagentMock = require("superagent-mock")(request, configRequetesV2);

test("renders Fenetre Pièces Justificatives fonctionne correctement", async () => {
  const toggle = jest.fn();

  render(
    <FenetrePiecesJustificatives
      toggleFenetre={toggle}
      idPiece="12345"
      nom="Journal d'Anne Franck"
      numRequete="69"
    />
  );

  expect(toggle).not.toHaveBeenCalled();
});

afterAll(() => {
  superagentMock.unset();
});
