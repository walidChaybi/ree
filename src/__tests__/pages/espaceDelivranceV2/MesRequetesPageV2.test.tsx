import {
  act,
  fireEvent,
  render,
  screen,
  waitFor
} from "@testing-library/react";
import { createMemoryHistory } from "history";
import React from "react";
import { Router } from "react-router-dom";
import request from "superagent";
import { configRequetesV2 } from "../../../mock/superagent-config/superagent-mock-requetes-v2";
import { MesRequetesPageV2 } from "../../../views/pages/espaceDelivrance/v2/MesRequetesPageV2";
import { URL_MES_REQUETES_V2 } from "../../../views/router/ReceUrls";

const superagentMock = require("superagent-mock")(request, configRequetesV2);
const history = createMemoryHistory();
history.push(URL_MES_REQUETES_V2);
const miseAJourCompteur = jest.fn();
const setParamsRMCAuto = jest.fn();

test("renders Page requete with all elements", async () => {
  render(
    <Router history={history}>
      <MesRequetesPageV2
        miseAJourCompteur={miseAJourCompteur}
        setParamsRMCAuto={setParamsRMCAuto}
      />
    </Router>
  );

  const titreNumero = screen.getByText("N°");
  const pageSuivante = screen.getByTitle("Page suivante");

  await waitFor(() => {
    const numero = screen.getByText("1234");
    expect(titreNumero).toBeDefined();
    expect(numero).toBeDefined();
  });

  act(() => {
    fireEvent.click(pageSuivante);
  });

  await waitFor(() => {
    const numero = screen.getByText("9021");
    expect(numero).toBeDefined();
    // Clic sur une ligne
    fireEvent.click(numero);
    // Clic sur un titre de colonne
    fireEvent.click(titreNumero);
  });
});

afterAll(() => {
  superagentMock.unset();
});
