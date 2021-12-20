import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { createMemoryHistory, MemoryHistory } from "history";
import React from "react";
import { Router } from "react-router-dom";
import request from "superagent";
import officier from "../../../mock/data/connectedUser.json";
import { configFakeUrl } from "../../../mock/superagent-config/superagent-mock-fake-url";
import { OfficierContext } from "../../../views/core/contexts/OfficierContext";
import { BoutonRechercheRmc } from "../../../views/core/header/BoutonRechercheRmc";
import { URL_MES_REQUETES } from "../../../views/router/ReceUrls";

const superagentMock = require("superagent-mock")(request, configFakeUrl);

let history: MemoryHistory;
let boutonElement: HTMLElement;
const globalAny: any = global;
globalAny.open = () => {
  return { ...window };
};
globalAny.close = jest.fn();

beforeEach(async () => {
  history = createMemoryHistory();
  history.push(URL_MES_REQUETES);
  render(
    <Router history={history}>
      <OfficierContext.Provider
        value={{ officierDataState: { idSSO: officier.id_sso, ...officier } }}
      >
        <BoutonRechercheRmc></BoutonRechercheRmc>
      </OfficierContext.Provider>
    </Router>
  );
  boutonElement = screen.getByTitle("Recherche acte/inscription");
  await waitFor(() => {
    expect(boutonElement).toBeDefined();
  });
});

test("renders click bouton rmc", async () => {
  configFakeUrl[0].nbRequetes = 0;
  fireEvent.click(boutonElement);
  await waitFor(() => {
    expect(screen.getByText("Filtre titulaire")).toBeDefined();
  });
});

afterAll(() => {
  superagentMock.unset();
});
