import { act, render, screen, waitFor } from "@testing-library/react";
import { createMemoryHistory } from "history";
import React from "react";
import { Route, Router } from "react-router-dom";
import request from "superagent";
import requeteDelivrance from "../../../../../mock/data/requeteDelivrance";
import { requeteInformation } from "../../../../../mock/data/requeteInformation";
import { configRequetes } from "../../../../../mock/superagent-config/superagent-mock-requetes";
import { getUrlWithParam } from "../../../../../views/common/util/route/routeUtil";
import { RMCRequetesAssocieesResultats } from "../../../../../views/pages/rechercheMultiCriteres/autoRequetes/resultats/RMCRequetesAssocieesResultats";
import {
  URL_MES_REQUETES_APERCU_REQUETE_PRISE_EN_CHARGE_ID,
  URL_MES_REQUETES_APERCU_REQ_INFORMATION_ID
} from "../../../../../views/router/ReceUrls";

const superagentMock = require("superagent-mock")(request, configRequetes);

test("renders Fielset Recherche requêtes associées aux titulaires d'une requêtes de délivrance", async () => {
  await act(async () => {
    const history = createMemoryHistory();
    history.push(
      getUrlWithParam(
        URL_MES_REQUETES_APERCU_REQUETE_PRISE_EN_CHARGE_ID,
        requeteDelivrance.id
      )
    );

    render(
      <Router history={history}>
        <Route
          exact={true}
          path={URL_MES_REQUETES_APERCU_REQUETE_PRISE_EN_CHARGE_ID}
        >
          <RMCRequetesAssocieesResultats requete={requeteDelivrance} />
        </Route>
      </Router>
    );
  });
});

test("renders Fielset Recherche requêtes associées aux titulaires d'une requêtes d'information", async () => {
  await act(async () => {
    const history = createMemoryHistory();
    history.push(
      getUrlWithParam(
        URL_MES_REQUETES_APERCU_REQ_INFORMATION_ID,
        requeteInformation.id
      )
    );

    render(
      <Router history={history}>
        <Route exact={true} path={URL_MES_REQUETES_APERCU_REQ_INFORMATION_ID}>
          <RMCRequetesAssocieesResultats requete={requeteInformation} />
        </Route>
      </Router>
    );
  });

  await waitFor(() => {
    expect(
      screen.getByText("Autres requêtes associées au titulaire")
    ).toBeDefined();
  });
});

afterAll(() => {
  superagentMock.unset();
});
