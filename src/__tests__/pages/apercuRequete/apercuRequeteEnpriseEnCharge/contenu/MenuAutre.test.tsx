import { fireEvent, render, screen } from "@testing-library/react";
import { createMemoryHistory } from "history";
import React from "react";
import { Router } from "react-router-dom";
import request from "superagent";
import { idRequeteRDC, requeteRDC } from "../../../../../mock/data/RequeteV2";
import { configRequetesV2 } from "../../../../../mock/superagent-config/superagent-mock-requetes-v2";
import { getUrlWithParam } from "../../../../../views/common/util/route/routeUtil";
import { MenuAutre } from "../../../../../views/pages/apercuRequete/apercuRequeteEnpriseEnCharge/contenu/actions/MenuAutre";
import { URL_MES_REQUETES_APERCU_REQUETE_PRISE_EN_CHARGE_ID } from "../../../../../views/router/ReceUrls";

const superagentMock = require("superagent-mock")(request, configRequetesV2);

const history = createMemoryHistory();

beforeEach(() => {
  history.push(
    getUrlWithParam(
      URL_MES_REQUETES_APERCU_REQUETE_PRISE_EN_CHARGE_ID,
      idRequeteRDC
    )
  );
  render(
    <Router history={history}>
      <MenuAutre requete={requeteRDC} />
    </Router>
  );
});

test("renders du bloc Menu Autre", async () => {
  const mettreAJour = screen.getByText(/Mettre à jour/i);

  expect(mettreAJour).toBeDefined();
  expect(screen.getByText(/Rédiger une réponse à l'usager+/)).toBeDefined();
  fireEvent.click(mettreAJour);
});

afterAll(() => {
  superagentMock.unset();
});
