import { fireEvent, render, waitFor } from "@testing-library/react";
import React from "react";
import request from "superagent";
import { configRequetes } from "../../../../../../../mock/superagent-config/superagent-mock-requetes";
import { TypePieceJustificative } from "../../../../../../../model/requete/enum/TypePieceJustificative";
import { LienPieceJointe } from "../../../../../../../views/common/composant/piecesJointes/LienPieceJointe";
import { TypePieceJointe } from "../../../../../../../views/common/hook/requete/piecesJointes/PostPiecesJointesHook";

const superagentMock = require("superagent-mock")(request, configRequetes);

beforeAll(() => {
  TypePieceJustificative.init();
});

const globalAny: any = global;
globalAny.URL.createObjectURL = jest.fn();
globalAny.open = () => {
  return { ...window };
};
globalAny.close = jest.fn();

test("renders Lien Pièces Jointes fonctionne correctement", async () => {
  const { getByText } = render(
    <LienPieceJointe
      pieceJointe={{
        id: "bbac2335-562c-4b14-96aa-4386814c02a2",
        libelle: "Triste",
        nom: "CARN_CSPAC_01",
        typePiece: TypePieceJointe.PIECE_JUSTIFICATIVE
      }}
      numRequete="69"
      index={1}
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
