import { LienPieceJointe } from "@composant/piecesJointes/LienPieceJointe";
import { TypePieceJustificative } from "@model/requete/enum/TypePieceJustificative";
import { TypePieceJointe } from "@model/requete/pieceJointe/IPieceJointe";
import { fireEvent, render, waitFor } from "@testing-library/react";
import { beforeAll, expect, test } from "vitest";
import { mockFenetreFicheTestFunctions } from "../../../../__tests__utils__/testsUtil";

beforeAll(() => {
  TypePieceJustificative.init();
});

beforeAll(async () => {
  mockFenetreFicheTestFunctions();
});

test.skip("renders Lien Pièces Jointes fonctionne correctement", () => {
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

  waitFor(() => {
    expect(link).toBeDefined();
  });

  fireEvent.click(
    link,
    new MouseEvent("click", {
      bubbles: true,
      cancelable: true
    })
  );

  waitFor(() => {
    expect(document.title).toStrictEqual("CARN_CSPAC_01 - Req N°69");
  });
});


