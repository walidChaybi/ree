import React from "react";
import { render, screen } from "@testing-library/react";
import requetes from "../../../../mock/data/requetes.json";
import request from "superagent";
import config from "../../../../mock/superagent-config/superagent-mock-requetes";
import { DocumentsRequete } from "../../../../views/pages/apercuRequete/contenu/document/DocumentsRequete";

const superagentMock = require("superagent-mock")(request, config);

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
