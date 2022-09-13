import { MenuAutre } from "@pages/requeteDelivrance/apercuRequete/apercuRequeteEnpriseEnCharge/contenu/actions/MenuAutre";
import { URL_MES_REQUETES_DELIVRANCE_APERCU_REQUETE_PRISE_EN_CHARGE_ID } from "@router/ReceUrls";
import { fireEvent, render, screen } from "@testing-library/react";
import { getUrlWithParam } from "@util/route/routeUtil";
import { createMemoryHistory } from "history";
import React from "react";
import { Router } from "react-router-dom";
import request from "superagent";
import {
  idRequeteRDC,
  requeteRDC
} from "../../../../../../mock/data/requeteDelivrance";
import { configRequetes } from "../../../../../../mock/superagent-config/superagent-mock-requetes";

const superagentMock = require("superagent-mock")(request, configRequetes);

const history = createMemoryHistory();

beforeEach(() => {
  history.push(
    getUrlWithParam(
      URL_MES_REQUETES_DELIVRANCE_APERCU_REQUETE_PRISE_EN_CHARGE_ID,
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
