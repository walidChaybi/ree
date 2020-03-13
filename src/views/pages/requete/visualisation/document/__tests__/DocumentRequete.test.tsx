import React from "react";
import { render } from "@testing-library/react";
import { DocumentsRequete } from "../DocumentsRequete";
import requetes from "../../../../../../api/mock/requetes.json";

test("renders documents d'une requete", async () => {
  const { getByText } = render(
    <DocumentsRequete
      piecesJustificatives={requetes.data[0].piecesJustificatives}
      documentsDelivres={requetes.data[0].reponse.documentsDelivres}
    />
  );
  let nomAccordion = getByText(/Pièces Justificatives/i);
  expect(nomAccordion).toBeInTheDocument();

  nomAccordion = getByText(/Courrier d'accompagnement/i);
  expect(nomAccordion).toBeInTheDocument();
  nomAccordion = getByText(/Document à signer/i);
  expect(nomAccordion).toBeInTheDocument();
});
