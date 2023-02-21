import { ChoixAction } from "@pages/requeteDelivrance/apercuRequete/apercuRequeteEnpriseEnCharge/contenu/actions/ChoixAction";
import { URL_MES_REQUETES_DELIVRANCE_APERCU_REQUETE_PRISE_EN_CHARGE_ID } from "@router/ReceUrls";
import { render, screen, waitFor } from "@testing-library/react";
import { getUrlWithParam } from "@util/route/UrlUtil";
import { createMemoryHistory } from "history";
import React from "react";
import { Router } from "react-router-dom";
import request from "superagent";
import {
  idRequeteRDCSC,
  requeteRDCSC
} from "../../../../../../mock/data/requeteDelivrance";
import { configRequetes } from "../../../../../../mock/superagent-config/superagent-mock-requetes";

const superagentMock = require("superagent-mock")(request, configRequetes);

test("renders du bloc choix des actions", async () => {
  const history = createMemoryHistory();
  history.push(
    getUrlWithParam(
      URL_MES_REQUETES_DELIVRANCE_APERCU_REQUETE_PRISE_EN_CHARGE_ID,
      idRequeteRDCSC
    )
  );

  render(
    <Router history={history}>
      <ChoixAction requete={requeteRDCSC} />
    </Router>
  );

  await waitFor(() => {
    let menuDelivrer = screen.getByText("Délivrer");
    let menuReponseSansDelivranceCS = screen.getByText(
      "Réponse sans délivrance"
    );
    expect(menuDelivrer).toBeDefined();
    expect(menuReponseSansDelivranceCS).toBeDefined();
  });
});

afterAll(() => {
  superagentMock.unset();
});
