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
import officier from "../../../mock/data/connectedUser.json";
import { configRequetesInformation } from "../../../mock/superagent-config/superagent-mock-requetes-information";
import { getUrlWithParam } from "../../../views/common/util/route/routeUtil";
import { OfficierContext } from "../../../views/core/contexts/OfficierContext";
import EspaceInformationPage from "../../../views/pages/requeteInformation/espaceInformation/EspaceReqInfoPage";
import {
  URL_MES_REQUETES_INFORMATION,
  URL_MES_REQUETES_INFORMATION_APERCU_ID
} from "../../../views/router/ReceUrls";

const superagentMock = require("superagent-mock")(
  request,
  configRequetesInformation
);
const history = createMemoryHistory();
history.push(URL_MES_REQUETES_INFORMATION);

test("renders Page requete information et clique sur une A_TRAITER", async () => {
  render(
    <Router history={history}>
      <OfficierContext.Provider
        value={{
          officierDataState: { idSSO: officier.id_sso, ...officier }
        }}
      >
        <EspaceInformationPage />
      </OfficierContext.Provider>
    </Router>
  );

  const titreNumero = screen.getByText("N°");
  const pageSuivante = screen.getByTitle("Page suivante");
  expect(pageSuivante).toBeDefined();
  expect(titreNumero).toBeDefined();

  await waitFor(() => {
    expect(screen.getByText("EVIPG4")).toBeDefined();
    expect(screen.getByText("EVIPG5")).toBeDefined();
    expect(screen.getByText("NOM1 p1")).toBeDefined();
    expect(screen.getByText("NOM2 p1")).toBeDefined();
  });

  act(() => {
    // Clic sur un titre de colonne
    fireEvent.click(titreNumero);
    // Clic sur une ligne
    fireEvent.click(screen.getByText("EVIPG4"));
  });

  await waitFor(() => {
    expect(history.location.pathname).toBe(
      getUrlWithParam(
        URL_MES_REQUETES_INFORMATION_APERCU_ID,
        "0b7a1f7b-b4f1-4163-8a81-e5adf53cbf62"
      )
    );
  });
});

afterAll(() => {
  superagentMock.unset();
});
