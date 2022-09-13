import { SuiviActionsRequete } from "@composant/suivis/SuiviActionsRequete";
import { render, screen, waitFor } from "@testing-library/react";
import React from "react";
import request from "superagent";
import DONNEES_REQUETE from "../../../../mock/data/requete";
import { configAgent } from "../../../../mock/superagent-config/superagent-mock-agent";

const superagentMock = require("superagent-mock")(request, configAgent);

test("renders suivi des actions requete", async () => {
  render(<SuiviActionsRequete actions={DONNEES_REQUETE.actions} />);
  const titre = screen.getByText(/Suivi requête/i);
  let elem1: HTMLElement;
  let elem2: HTMLElement;

  await waitFor(() => {
    expect(titre.textContent).toBe("Suivi requête");
    elem1 = screen.getByText(/BOB/i);
    expect(elem1).toBeDefined();
    expect(elem1.innerHTML).toBe("Saisie de la requête - 10/03/2020 - BOB");
    elem2 = screen.getByText(/APP/i);
    expect(elem2).toBeDefined();
    expect(elem2.innerHTML).toBe("À traiter - 10/03/2020 - APP");
  });
});

afterAll(() => {
  superagentMock.unset();
});
