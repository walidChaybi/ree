import { render, screen, waitFor } from "@testing-library/react";
import React from "react";
import request from "superagent";
import { configRequetesV2 } from "../../../../../mock/superagent-config/superagent-mock-requetes-v2";
import { CompteurRequete } from "../../../../../views/pages/requeteDelivrance/espaceDelivrance/v2/contenu/CompteurRequeteV2";

const superagentMock = require("superagent-mock")(request, configRequetesV2);

test("render composant compteur requete", async () => {
  render(<CompteurRequete reloadCompteur={true} />);

  await waitFor(() => {
    expect(screen.getByText(/Total de requêtes à signer/i)).toBeDefined();
  });
});

afterAll(() => {
  superagentMock.unset();
});
