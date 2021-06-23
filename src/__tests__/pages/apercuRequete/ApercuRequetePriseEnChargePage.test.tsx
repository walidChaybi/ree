import { act, render, screen, waitFor } from "@testing-library/react";
import { createMemoryHistory } from "history";
import React from "react";
import { Route, Router } from "react-router-dom";
import request from "superagent";
import { configRequetesV2 } from "../../../mock/superagent-config/superagent-mock-requetes-v2";
import { getUrlWithParam } from "../../../views/common/util/route/routeUtil";
import { storeRece } from "../../../views/common/util/storeRece";
import { ApercuRequetePriseEnChargePage } from "../../../views/pages/apercuRequete/apercuRequeteEnpriseEnCharge/ApercuRequetePriseEnChargePage";
import { URL_MES_REQUETES_APERCU_REQUETE_PRISE_EN_CHARGE_ID } from "../../../views/router/ReceUrls";

const superagentMock = require("superagent-mock")(request, configRequetesV2);

const history = createMemoryHistory();
history.push(
  getUrlWithParam(
    URL_MES_REQUETES_APERCU_REQUETE_PRISE_EN_CHARGE_ID,
    "a4cefb71-8457-4f6b-937e-34b49335d404"
  ),
  {
    dataRequetes: [],
    dataRMCAutoActe: [],
    dataTableauRMCAutoActe: {},
    dataRMCAutoInscription: [],
    dataTableauRMCAutoInscription: {}
  }
);

beforeAll(() => {
  storeRece.listeUtilisateurs = [
    {
      idUtilisateur: "7a091a3b-6835-4824-94fb-527d68926d56",
      prenom: "Ashley",
      nom: "Young"
    }
  ];
});

test("renders ApercuRequetePriseEnChargePage", async () => {
  await act(async () => {
    render(
      <>
        <Router history={history}>
          <Route
            exact={true}
            path={URL_MES_REQUETES_APERCU_REQUETE_PRISE_EN_CHARGE_ID}
          >
            <ApercuRequetePriseEnChargePage />
          </Route>
        </Router>
      </>
    );
  });

  const title = screen.getByText(/Aperçu de la requête/i);
  const bandeau = screen.getByText(
    /Requête à traiter, attribuée à Ashley YOUNG - Le : 14\/07\/2020/i
  );
  const actions = screen.getByText(/Suivi des actions/i);
  const requetes = screen.getByText(/Requêtes associées aux titulaires/i);
  const RMC = screen.getByText(/Résultats de la recherche multi-critères/i);

  await waitFor(() => {
    expect(title).toBeDefined();
    expect(bandeau).toBeDefined();
    expect(actions).toBeDefined();
    expect(requetes).toBeDefined();
    expect(RMC).toBeDefined();
  });
});

afterAll(() => {
  superagentMock.unset();
});
