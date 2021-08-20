import { render } from "@testing-library/react";
import React from "react";
import { Orientation } from "../../../../../model/composition/enum/Orientation";
import { IDocumentReponse } from "../../../../../model/requete/v2/IDocumentReponse";
import { DocumentsReponses } from "../../../../../views/pages/apercuRequete/contenu/document/DocumentsReponses";

test("render titulaire information", () => {
  const documents: IDocumentReponse = {
    contenu: "",
    id: "15354af3-99b5-4ae1-9ee4-127614f3e76b",
    mimeType: "application/pdf",
    nbPages: 2,
    nom: "acte de mariage",
    orientation: Orientation.PORTRAIT,
    taille: 97,
    typeDocument: "8b808725-a83e-4ce5-81a2-192cd09e0cb2"
  };
  const { getByText } = render(
    <DocumentsReponses documents={[documents]}></DocumentsReponses>
  );

  const titre = getByText(/Documents à délivrer/i);
  expect(titre).toBeDefined();

  const textTitulaire = getByText(/acte de mariage/i);
  expect(textTitulaire).toBeDefined();
});
