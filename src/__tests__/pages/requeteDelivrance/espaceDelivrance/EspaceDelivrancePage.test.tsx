import { OfficierContext } from "@core/contexts/OfficierContext";
import EspaceDelivrancePage from "@pages/requeteDelivrance/espaceDelivrance/EspaceDelivrancePage";
import { URL_ACCUEIL } from "@router/ReceUrls";
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
import { configRequetes } from "../../../../mock/superagent-config/superagent-mock-requetes";

const superagentMock = require("superagent-mock")(request, configRequetes);

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
            <EspaceDelivrancePage
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
  const requetesService = screen.getByText(
    /Les requêtes de délivrance de mon service/i
  );

  await waitFor(() => {
    expect(title).toBeDefined();
    expect(mesRequetes).toBeDefined();
    expect(requetesService).toBeDefined();
    expect(compteur).toBeDefined();
  });

  act(() => {
    fireEvent.click(requetesService);
  });

  const attribueA = screen.getByText(/Attribuée à/i);

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
