import { render, waitFor } from "@testing-library/react";
import React from "react";
import request from "superagent";
import { configRequetes } from "../../../../../../../mock/superagent-config/superagent-mock-requetes";
import {
    FenetrePiecesJustificatives,
    onClose
} from "../../../../../../../views/pages/requeteDelivrance/apercuRequete/apercuRequetePartieGauche/contenu/resume/contenu/piecesJustificatives/FenetrePiecesJustificatives";

const superagentMock = require("superagent-mock")(request, configRequetes);

const globalAny: any = global;
globalAny.URL.createObjectURL = jest.fn();
globalAny.open = () => {
  return { ...window };
};
globalAny.close = jest.fn();

test("renders Fenetre Pièces Justificatives fonctionne correctement", async () => {
  const toggle = jest.fn();

  render(
    <FenetrePiecesJustificatives
      toggleFenetre={toggle}
      idPiece="bbac2335-562c-4b14-96aa-4386814c02a2"
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
