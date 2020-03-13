import React from "react";
import { render } from "@testing-library/react";
import { DocumentPresentation } from "../DocumentPresentation";
import requetes from "../../../../../../api/mock/requetes.json";

test("renders pieces justificatives vide dans leur accordions", async () => {
  const { getByText, queryAllByText } = render(
    <DocumentPresentation
      titre={"pages.requete.consultation.pieceJustificative.titre"}
      documents={[]}
    />
  );
  const linkElement = getByText(/Pièces Justificatives/i);
  expect(linkElement).toBeInTheDocument();

  const nomFichier = await queryAllByText(/Pièce Justificative 0/i);
  expect(nomFichier.length).toBe(0);
});

test("renders 2 pieces justificatives dans leur accordions", async () => {
  const { getByText, queryAllByText } = render(
    <DocumentPresentation
      titre={"pages.requete.consultation.pieceJustificative.titre"}
      documents={requetes.data[0].piecesJustificatives}
    />
  );
  const linkElement = getByText(/Pièces Justificatives/i);
  expect(linkElement).toBeInTheDocument();

  let nomFichier = await queryAllByText(/11984-pi-j-3.PNG/i);
  expect(nomFichier.length).toBe(1);
  nomFichier = await queryAllByText(/11984-pi-j-3.pdf/i);
  expect(nomFichier.length).toBe(1);
});
