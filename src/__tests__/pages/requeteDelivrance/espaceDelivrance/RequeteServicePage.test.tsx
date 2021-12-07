import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { createMemoryHistory } from "history";
import React from "react";
import { act } from "react-dom/test-utils";
import { Router } from "react-router-dom";
import request from "superagent";
import { configRequetes } from "../../../../mock/superagent-config/superagent-mock-requetes";
import { RequetesServicePage } from "../../../../views/pages/requeteDelivrance/espaceDelivrance/RequetesServicePage";
import { URL_REQUETES_SERVICE } from "../../../../views/router/ReceUrls";

const superagentMock = require("superagent-mock")(request, configRequetes);
const history = createMemoryHistory();
history.push(URL_REQUETES_SERVICE);
const setParamsRMCAuto = jest.fn();

test("renders Page requete interactions works, no errors returned", async () => {
  render(
    <Router history={history}>
      <RequetesServicePage setParamsRMCAuto={setParamsRMCAuto} />
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
  });

  act(() => {
    // Clic sur une ligne
    fireEvent.click(screen.getByText("9021"));
  });
  await waitFor(() => {
    expect(screen.getByText("9021")).toBeDefined();
  });

  act(() => {
    // Clic sur un titre de colonne
    fireEvent.click(titreNumero);
  });
  await waitFor(() => {
    expect(screen.getByText("9021")).toBeDefined();
  });
});

afterAll(() => {
  superagentMock.unset();
});
