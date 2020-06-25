import React from "react";
import { render, screen } from "@testing-library/react";
import { DocumentsRequete } from "../DocumentsRequete";
import requetes from "../../../../../../api/mock/requetes.json";
window.URL.createObjectURL = jest.fn();

test("renders documents d'une requete", async () => {
  render(
    <DocumentsRequete
      piecesJustificatives={requetes.data[0].piecesJustificatives}
      documentsDelivres={requetes.data[0].reponse.documentsDelivres}
    />
  );
  let nomAccordion = screen.getByText(/Pièces Justificatives/i);
  expect(nomAccordion).toBeInTheDocument();

  nomAccordion = screen.getByText(/Courrier d'accompagnement/i);
  expect(nomAccordion).toBeInTheDocument();
  nomAccordion = screen.getByText(/Document à signer/i);
  expect(nomAccordion).toBeInTheDocument();
});
