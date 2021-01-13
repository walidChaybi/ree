import React from "react";
import { render, waitFor, screen } from "@testing-library/react";
import { CompteurRequete } from "../../../../views/pages/espaceDelivrance/contenu/CompteurRequete";
import request from "superagent";
import { configRequetes } from "../../../../mock/superagent-config/superagent-mock-requetes";

const superagentMock = require("superagent-mock")(request, configRequetes);

test("render composant compteur requete", async () => {
  render(<CompteurRequete />);

  await waitFor(() => {
    expect(screen.getByText(/Total de requêtes à signer/i)).toBeDefined();
  });
});

afterAll(() => {
  superagentMock.unset();
});
