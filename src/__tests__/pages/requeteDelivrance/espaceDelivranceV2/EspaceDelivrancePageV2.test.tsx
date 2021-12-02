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
import officier from "../../../../mock/data/connectedUser.json";
import { configRequetesV2 } from "../../../../mock/superagent-config/superagent-mock-requetes-v2";
import { OfficierContext } from "../../../../views/core/contexts/OfficierContext";
import EspaceDelivrancePageV2 from "../../../../views/pages/requeteDelivrance/espaceDelivrance/v2/EspaceDelivrancePageV2";
import { URL_ACCUEIL } from "../../../../views/router/ReceUrls";

const superagentMock = require("superagent-mock")(request, configRequetesV2);

test("renders delivrancePage", async () => {
  const history = createMemoryHistory();
  history.push(URL_ACCUEIL);

  await act(async () => {
    render(
      <>
        <Router history={history}>
          <OfficierContext.Provider
            value={{
              officierDataState: { idSSO: officier.id_sso, ...officier }
            }}
          >
            <EspaceDelivrancePageV2
              match={{
                isExact: true,
                path: "",
                url: "",
                params: { idRequete: "req2" }
              }}
              history={history}
              location={history.location}
              selectedTab={0}
            />
          </OfficierContext.Provider>
        </Router>
      </>
    );
  });

  const title = screen.getByText(/Espace délivrance/i);
  const mesRequetes = screen.getByText(/Mes requêtes de délivrance/i);
  const compteur = screen.getByText(/Total de requêtes à signer/i);
  const requetesService = screen.getByText(/Requêtes de mon service/i);

  await waitFor(() => {
    expect(title).toBeDefined();
    expect(mesRequetes).toBeDefined();
    expect(requetesService).toBeDefined();
    expect(compteur).toBeDefined();
  });

  act(() => {
    fireEvent.click(requetesService);
  });

  const attribueA = screen.getByText(/Attribué à/i);

  await waitFor(() => {
    expect(title).toBeDefined();
    expect(mesRequetes).toBeDefined();
    expect(requetesService).toBeDefined();
    expect(attribueA).toBeDefined();
  });
});

afterAll(() => {
  superagentMock.unset();
});
