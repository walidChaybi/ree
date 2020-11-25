import React from "react";

import { render, waitFor, screen } from "@testing-library/react";
import { CompteurRequete } from "../../../../views/pages/espaceDelivrance/contenu/CompteurRequete";
import connectedUser from "../../../../mock/data/connectedUser.json";
import request from "superagent";
import config from "../../../../mock/superagent-config/superagent-mock-requetes";

const off = { idSSO: connectedUser.id_sso, ...connectedUser };

const superagentMock = require("superagent-mock")(request, config);

test("render composant compteur requete", async () => {
  render(<CompteurRequete officier={off} />);

  await waitFor(() => {
    expect(screen.getByText(/Total de requêtes à signer/i)).toBeDefined();
  });
});

afterAll(() => {
  superagentMock.unset();
});
