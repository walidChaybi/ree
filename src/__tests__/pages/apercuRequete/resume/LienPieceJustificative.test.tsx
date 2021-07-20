import { fireEvent, render, waitFor } from "@testing-library/react";
import React from "react";
import { LienPieceJustificative } from "../../../../views/pages/apercuRequete/resume/LienPieceJustificative";

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
