import React from "react";
import { screen, render, fireEvent, waitFor } from "@testing-library/react";
import { createMemoryHistory, MemoryHistory } from "history";
import { Router } from "react-router-dom";
import officier from "../../../mock/data/connectedUser.json";
import { BoutonDeconnexion } from "../../../views/core/header/BoutonDeconnexion";
import { OfficierContext } from "../../../views/core/contexts/OfficierContext";
import {
  URL_MES_REQUETES,
  URL_DECONNEXION
} from "../../../views/router/ReceUrls";
import request from "superagent";
import { configFakeUrl } from "../../../mock/superagent-config/superagent-mock-fake-url";

const superagentMock = require("superagent-mock")(request, configFakeUrl);

let history: MemoryHistory;
let handleClickButton: jest.Mock;
let boutonElement: HTMLElement;

beforeEach(async () => {
  history = createMemoryHistory();
  history.push(URL_MES_REQUETES);

  handleClickButton = jest.fn();
  render(
    <Router history={history}>
      <OfficierContext.Provider
        value={{ officierDataState: { idSSO: officier.id_sso, ...officier } }}
      >
        <BoutonDeconnexion onClick={handleClickButton}></BoutonDeconnexion>
      </OfficierContext.Provider>
    </Router>
  );
  boutonElement = screen.getByText(/prenomConnectedUser nomConnectedUser/i);
  await waitFor(() => {
    expect(boutonElement).toBeInTheDocument();
  });
});

test("renders click BoutonDeconnexion (nbRequetes = 0)", async () => {
  configFakeUrl[0].nbRequetes = 0;
  fireEvent.click(boutonElement);
  await waitFor(() => {
    expect(handleClickButton).toHaveBeenCalledTimes(1);
    expect(history).toHaveLength(2);
  });
  const linkElement = screen.getByText(/Déconnexion/i);
  fireEvent.click(linkElement);
  await waitFor(() => {
    expect(linkElement).toBeInTheDocument();
    expect(history).toHaveLength(3);
    expect(history.location.pathname).toBe(URL_DECONNEXION);
  });
});

test("renders click BoutonDeconnexion (nbRequetes = 1) produit une popin de confirmation et lorsque 'Oui' est cliqué la déconnexion est effective", async () => {
  configFakeUrl[0].nbRequetes = 1;
  fireEvent.click(boutonElement);
  await waitFor(() => {
    expect(handleClickButton).toHaveBeenCalledTimes(1);
    expect(history).toHaveLength(2);
  });
  const linkElement = screen.getByText(/Déconnexion/i);
  fireEvent.click(linkElement);
  await waitFor(() => {
    expect(linkElement).toBeInTheDocument();
    expect(history).toHaveLength(2);
  });
  const okElement = screen.getByText(/Oui/);
  await waitFor(() => {
    expect(okElement).toBeInTheDocument();
  });
  fireEvent.click(okElement);
  await waitFor(() => {
    expect(okElement).not.toBeInTheDocument();
  });
  await waitFor(() => {
    expect(history).toHaveLength(3);
    expect(history.location.pathname).toBe(URL_DECONNEXION);
  });
});

test("renders click BoutonDeconnexion (nbRequetes = 1) produit une popin de confirmation et lorsque 'Non' est cliqué la déconnexion n'est pas faite", async () => {
  configFakeUrl[0].nbRequetes = 1;
  fireEvent.click(boutonElement);
  await waitFor(() => {
    expect(handleClickButton).toHaveBeenCalledTimes(1);
    expect(history).toHaveLength(2);
  });
  const linkElement = screen.getByText(/Déconnexion/i);
  fireEvent.click(linkElement);
  await waitFor(() => {
    expect(linkElement).toBeInTheDocument();
    expect(history).toHaveLength(2);
  });
  const cancelElement = screen.getByText(/Non/);
  await waitFor(() => {
    expect(cancelElement).toBeInTheDocument();
  });
  fireEvent.click(cancelElement);
  await waitFor(() => {
    expect(cancelElement).not.toBeInTheDocument();
  });
  await waitFor(() => {
    expect(history).toHaveLength(3);
    expect(history.location.pathname).toBe(URL_MES_REQUETES);
  });
});
