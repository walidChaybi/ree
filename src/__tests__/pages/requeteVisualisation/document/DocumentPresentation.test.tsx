import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import data from "./data/documentsDetails";
import request from "superagent";
import config from "../../../../api/mock/superagent-config/superagent-mock-requetes";
import { GroupementDocument } from "../../../../model/requete/GroupementDocument";
import { IDocumentDetail } from "../../../../views/common/types/IDocumentDetail";
import { DocumentPresentation } from "../../../../views/pages/requeteVisualisation/contenu/document/DocumentPresentation";
window.URL.createObjectURL = jest.fn();

const superagentMock = require("superagent-mock")(request, config);

test("renders pieces justificatives vide dans leur accordéon", async () => {
  render(
    <DocumentPresentation
      titre={"pages.requete.consultation.pieceJustificative.titre"}
      documents={[]}
      groupement={GroupementDocument.PieceJustificative}
    />
  );
  const linkElement = screen.getByText(/Pièces Justificatives/i);
  expect(linkElement).toBeInTheDocument();

  const nomFichier = screen.queryAllByText(/Pièce Justificative 0/i);
  expect(nomFichier.length).toBe(0);
});

test("renders 2 pieces justificatives dans leur accordéon", async () => {
  render(
    <DocumentPresentation
      titre={"pages.requete.consultation.pieceJustificative.titre"}
      documents={data.documentsDetails as IDocumentDetail[]}
      groupement={GroupementDocument.PieceJustificative}
    />
  );
  const linkElement = screen.getByText(/Pièces Justificatives/i);
  expect(linkElement).toBeInTheDocument();

  let nomFichier = screen.queryAllByText(/Pièce justificative 0/i);
  expect(nomFichier.length).toBe(1);
  nomFichier = screen.queryAllByText(/Pièce justificative 1/i);
  expect(nomFichier.length).toBe(1);
});

test("renders click piece justificative", async () => {
  const handleClickButton = jest.fn();
  render(
    <DocumentPresentation
      titre={"pages.requete.consultation.pieceJustificative.titre"}
      documents={data.documentsDetails as IDocumentDetail[]}
      groupement={GroupementDocument.PieceJustificative}
      setDocumentVisibleFct={handleClickButton}
    />
  );

  let nomFichier = screen.getByText(/Pièce justificative 0/i);
  fireEvent.click(nomFichier);
  await waitFor(() => {
    expect(handleClickButton).toHaveBeenCalledTimes(1);
  });
});

afterAll(() => {
  superagentMock.unset();
});
