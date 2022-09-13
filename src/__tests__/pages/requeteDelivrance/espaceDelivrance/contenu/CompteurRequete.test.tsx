import { CompteurRequete } from "@pages/requeteDelivrance/espaceDelivrance/contenu/CompteurRequete";
import { render, screen, waitFor } from "@testing-library/react";
import React from "react";
import request from "superagent";
import { configRequetes } from "../../../../../mock/superagent-config/superagent-mock-requetes";

const superagentMock = require("superagent-mock")(request, configRequetes);

test("render composant compteur requete", async () => {
  render(<CompteurRequete reloadCompteur={true} />);

  await waitFor(() => {
    expect(screen.getByText(/Total de requêtes à signer/i)).toBeDefined();
  });
});

afterAll(() => {
  superagentMock.unset();
});
