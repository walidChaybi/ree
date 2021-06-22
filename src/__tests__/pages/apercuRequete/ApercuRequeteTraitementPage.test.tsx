import { act, render, screen, waitFor } from "@testing-library/react";
import { createMemoryHistory } from "history";
import React from "react";
import { Route, Router } from "react-router-dom";
import request from "superagent";
import { configRequetesV2 } from "../../../mock/superagent-config/superagent-mock-requetes-v2";
import { getUrlWithParam } from "../../../views/common/util/route/routeUtil";
import { ApercuRequeteTraitementPage } from "../../../views/pages/apercuRequete/apercuRequeteEnTraitement/ApercuRequeteTraitementPage";
import { URL_MES_REQUETES_APERCU_REQUETE_TRAITEMENT_ID } from "../../../views/router/ReceUrls";

const superagentMock = require("superagent-mock")(request, configRequetesV2);

const history = createMemoryHistory();
history.push(
  getUrlWithParam(
    URL_MES_REQUETES_APERCU_REQUETE_TRAITEMENT_ID,
    "a4cefb71-8457-4f6b-937e-34b49335d404"
  )
);

test("renders ApercuRequeteTraitementPage", async () => {
  await act(async () => {
    render(
      <>
        <Router history={history}>
          <Route
            exact={true}
            path={URL_MES_REQUETES_APERCU_REQUETE_TRAITEMENT_ID}
          >
            <ApercuRequeteTraitementPage />
          </Route>
        </Router>
      </>
    );
  });

  screen.debug();

  const title = screen.getByText(/Aperçu du traitement de la requête/i);
  const bandeau = screen.getByText(
    /Requête à traiter, attribuée à Prenomoec NOMOEC - Le : 14\/07\/2020/i
  );
  const actions = screen.getByText(/Suivi des actions/i);

  await waitFor(() => {
    expect(title).toBeDefined();
    expect(bandeau).toBeDefined();
    expect(actions).toBeDefined();
  });
});

afterAll(() => {
  superagentMock.unset();
});
