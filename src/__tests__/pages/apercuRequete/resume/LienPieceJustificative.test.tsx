import { fireEvent, render, waitFor } from "@testing-library/react";
import React from "react";
import request from "superagent";
import { configRequetesV2 } from "../../../../mock/superagent-config/superagent-mock-requetes-v2";
import { LienPieceJustificative } from "../../../../views/pages/apercuRequete/resume/contenu/piecesJustificatives/LienPieceJustificative";

const superagentMock = require("superagent-mock")(request, configRequetesV2);

test("renders Lien Pièces Justificatives fonctionne correctement", async () => {
  global.open = () => {
    return { ...window };
  };
  global.close = jest.fn();

  const { getByText } = render(
    <LienPieceJustificative
      contenu="12345"
      idPiece="12345"
      nom="Journal d'Anne Franck"
      numRequete="69"
      type="Triste"
    />
  );

  const link = getByText("Triste");
  fireEvent.click(
    link,
    new MouseEvent("click", {
      bubbles: true,
      cancelable: true
    })
  );

  await waitFor(() => {
    expect(document.title).toStrictEqual("Journal d'Anne Franck - Req N°69");
  });
});

afterAll(() => {
  superagentMock.unset();
});
