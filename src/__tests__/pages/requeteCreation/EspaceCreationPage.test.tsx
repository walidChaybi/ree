import { act, render, screen, waitFor } from "@testing-library/react";
import { createMemoryHistory } from "history";
import React from "react";
import { Router } from "react-router-dom";
import request from "superagent";
import { leBiannic } from "../../../mock/data/connectedUserAvecDroit";
import { configRequetes } from "../../../mock/superagent-config/superagent-mock-requetes";
import { OfficierContext } from "../../../views/core/contexts/OfficierContext";
import EspaceCreationPage from "../../../views/pages/requeteCreation/EspaceCreation/EspaceCreationPage";
import { URL_ACCUEIL } from "../../../views/router/ReceUrls";

const superagentMock = require("superagent-mock")(request, configRequetes);

test("renders creationPage", async () => {
  const history = createMemoryHistory();
  history.push(URL_ACCUEIL);

  await act(async () => {
    render(
      <>
        <Router history={history}>
          <OfficierContext.Provider
            value={{
              officierDataState: { idSSO: leBiannic.id_sso, ...leBiannic }
            }}
          >
            <EspaceCreationPage selectedTab={0} />
          </OfficierContext.Provider>
        </Router>
      </>
    );
  });

  const title = screen.getByText(/Espace création/i);
  const mesRequetes = screen.getByText(/Mes requêtes de création/i);
  /*const requetesService = screen.getByText(
    /Les requêtes de délivrance de mon service/i
  );*/

  await waitFor(() => {
    expect(title).toBeDefined();
    expect(mesRequetes).toBeDefined();
  });

  /*act(() => {
    fireEvent.click(requetesService);
  });

  const attribueA = screen.getByText(/Attribuée à/i);

  await waitFor(() => {
    expect(title).toBeDefined();
    expect(mesRequetes).toBeDefined();
    expect(requetesService).toBeDefined();
    expect(attribueA).toBeDefined();
  });*/
});

afterAll(() => {
  superagentMock.unset();
});
