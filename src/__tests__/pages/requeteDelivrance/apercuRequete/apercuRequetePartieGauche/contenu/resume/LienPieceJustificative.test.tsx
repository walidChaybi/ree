import { fireEvent, render, waitFor } from "@testing-library/react";
import React from "react";
import request from "superagent";
import { imagePngVideBase64 } from "../../../../../../../mock/data/ImagePng";
import { configRequetesV2 } from "../../../../../../../mock/superagent-config/superagent-mock-requetes-v2";
import { TypePieceJustificative } from "../../../../../../../model/requete/v2/enum/TypePieceJustificative";
import { LienPieceJustificative } from "../../../../../../../views/pages/requeteDelivrance/apercuRequete/apercuRequetePartieGauche/contenu/resume/contenu/piecesJustificatives/LienPieceJustificative";

const superagentMock = require("superagent-mock")(request, configRequetesV2);

beforeAll(() => {
  TypePieceJustificative.init();
});

const globalAny: any = global;
globalAny.URL.createObjectURL = jest.fn();
globalAny.open = () => {
  return { ...window };
};
globalAny.close = jest.fn();

test("renders Lien Pièces Justificatives fonctionne correctement", async () => {
  const { getByText } = render(
    <LienPieceJustificative
      contenu={imagePngVideBase64}
      idPiece="bbac2335-562c-4b14-96aa-4386814c02a2"
      nom="CARN_CSPAC_01"
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
    expect(document.title).toStrictEqual("CARN_CSPAC_01 - Req N°69");
  });
});

afterAll(() => {
  superagentMock.unset();
});
