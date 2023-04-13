import { OfficierContext } from "@core/contexts/OfficierContext";
import { BoutonRechercheRmc } from "@core/header/BoutonRechercheRmc";
import officier from "@mock/data/connectedUser.json";
import { configFakeUrl } from "@mock/superagent-config/superagent-mock-fake-url";
import { URL_MES_REQUETES_DELIVRANCE } from "@router/ReceUrls";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryHistory, createMemoryHistory } from "history";
import React from "react";
import { Router } from "react-router-dom";

let history: MemoryHistory;
let boutonElement: HTMLElement;
const globalAny: any = global;
globalAny.open = () => {
  return { ...window, addEventListener: jest.fn() };
};
globalAny.close = jest.fn();

beforeEach(async () => {
  history = createMemoryHistory();
  history.push(URL_MES_REQUETES_DELIVRANCE);
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
