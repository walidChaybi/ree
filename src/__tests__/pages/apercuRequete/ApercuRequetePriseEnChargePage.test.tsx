import { act, render, screen, waitFor } from "@testing-library/react";
import { createMemoryHistory } from "history";
import React from "react";
import { Route, Router } from "react-router-dom";
import { getUrlWithParam } from "../../../views/common/util/route/routeUtil";
import { ApercuRequetePriseEnChargePage } from "../../../views/pages/apercuRequete/apercuRequeteEnpriseEnCharge/ApercuRequetePriseEnChargePage";
import { URL_MES_REQUETES_APERCU_REQUETE_PRISE_EN_CHARGE_ID } from "../../../views/router/ReceUrls";

test("renders Page aperçu requête with all elements", async () => {
  act(() => {
    const history = createMemoryHistory();
    history.push(
      getUrlWithParam(
        URL_MES_REQUETES_APERCU_REQUETE_PRISE_EN_CHARGE_ID,
        "requeteTest"
      ),
      {
        dataRequetes: [],
        dataRMCAutoActe: [],
        dataTableauRMCAutoActe: {},
        dataRMCAutoInscription: [],
        dataTableauRMCAutoInscription: {}
      }
    );

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

  await waitFor(() => {
    expect(
      screen.getAllByText("Aperçu de la requête en prise en charge")
    ).toHaveLength(1);
  });
});
