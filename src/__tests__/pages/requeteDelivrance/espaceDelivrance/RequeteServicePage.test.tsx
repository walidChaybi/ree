import { TypeEntite } from "@model/agent/enum/TypeEntite";
import { RequetesServicePage } from "@pages/requeteDelivrance/espaceDelivrance/RequetesServicePage";
import { URL_REQUETES_DELIVRANCE_SERVICE } from "@router/ReceUrls";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { storeRece } from "@util/storeRece";
import { createMemoryHistory } from "history";
import React from "react";
import { act } from "react-dom/test-utils";
import { Router } from "react-router-dom";
import request from "superagent";
import { configAgent } from "../../../../mock/superagent-config/superagent-mock-agent";
import { configRequetes } from "../../../../mock/superagent-config/superagent-mock-requetes";

const superagentMock = require("superagent-mock")(request, [
  configRequetes[0],
  configAgent[0]
]);
let history: any;
const setParamsRMCAuto = jest.fn();

beforeAll(() => {
  storeRece.listeEntite = [
    {
      idEntite: "1234",
      type: TypeEntite.BUREAU,
      code: "1234",
      libelleEntite: "str1",
      estDansSCEC: true
    },
    {
      idEntite: "12345",
      type: TypeEntite.DEPARTEMENT,
      code: "12345",
      libelleEntite: "str2",
      estDansSCEC: true
    }
  ];
});

beforeEach(() => {
  history = createMemoryHistory();
  history.push(URL_REQUETES_DELIVRANCE_SERVICE);
});

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

test("Test Attribuée à", async () => {
  render(
    <Router history={history}>
      <RequetesServicePage setParamsRMCAuto={setParamsRMCAuto} />
    </Router>
  );

  await waitFor(() => {
    const numero = screen.getByText("1234");
    expect(numero).toBeDefined();
    expect(screen.getAllByTitle("Attribuer requête")[0]).toBeDefined();
  });

  act(() => {
    fireEvent.click(screen.getAllByTitle("Attribuer requête")[0]);
  });

  await waitFor(() => {
    expect(screen.getAllByText("À un service")[0]).toBeDefined();
  });

  act(() => {
    fireEvent.click(screen.getAllByText("À un service")[0]);
  });

  await waitFor(() => {
    expect(screen.getByText("Attribuer à un service")).toBeDefined();
  });

  const autocomplete = screen.getByTestId("autocomplete");
  const inputChampRecherche = screen.getByLabelText(
    "TransfertPopin"
  ) as HTMLInputElement;

  await waitFor(() => {
    expect(autocomplete).toBeDefined();
    expect(inputChampRecherche).toBeDefined();
    autocomplete.focus();
  });
  await act(async () => {
    fireEvent.change(inputChampRecherche, {
      target: {
        value: "s"
      }
    });
  });

  const entite = screen.getByText("str2");
  await waitFor(() => {
    expect(entite).toBeDefined();
  });
  await act(async () => {
    fireEvent.click(entite);
  });

  const valider = screen.getByText("Valider") as HTMLButtonElement;
  await waitFor(() => {
    expect(valider).toBeDefined();
  });
  await act(async () => {
    fireEvent.click(valider);
  });
});

afterAll(() => {
  superagentMock.unset();
});
