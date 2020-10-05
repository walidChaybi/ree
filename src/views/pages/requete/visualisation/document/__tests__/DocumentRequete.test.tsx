import React from "react";
import { render, screen } from "@testing-library/react";
import { DocumentsRequete, extraitALireParDefault } from "../DocumentsRequete";
import requetes from "../../../../../../api/mock/requetes.json";
import { IDocumentDelivre } from "../../RequeteType";
window.URL.createObjectURL = jest.fn();

test("renders documents d'une requete", async () => {
  render(
    <DocumentsRequete
      piecesJustificatives={requetes.data[0].piecesJustificatives}
      documentsDelivres={requetes.data[0].reponse.documentsDelivres}
    />
  );
  let nomAccordeon = screen.getByText(/Pièces Justificatives/i);
  expect(nomAccordeon).toBeInTheDocument();

  nomAccordeon = screen.getByText(/Documents à délivrer/i);
  expect(nomAccordeon).toBeInTheDocument();
});
