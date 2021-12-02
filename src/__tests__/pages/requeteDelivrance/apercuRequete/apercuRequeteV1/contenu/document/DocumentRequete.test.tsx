import { render, screen } from "@testing-library/react";
import React from "react";
import request from "superagent";
import requetes from "../../../../../../../mock/data/requetes.json";
import { configRequetes } from "../../../../../../../mock/superagent-config/superagent-mock-requetes";
import { DocumentsRequete } from "../../../../../../../views/pages/requeteDelivrance/apercuRequete/apercuRequeteV1/contenu/document/DocumentsRequete";

const superagentMock = require("superagent-mock")(request, configRequetes);

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

afterAll(() => {
  superagentMock.unset();
});
