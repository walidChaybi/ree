import { act, fireEvent, render, screen } from "@testing-library/react";
import { createMemoryHistory } from "history";
import React from "react";
import { Router } from "react-router-dom";
import request from "superagent";
import { idRequete2, requete2 } from "../../../../mock/data/RequeteV2";
import { configRequetesV2 } from "../../../../mock/superagent-config/superagent-mock-requetes-v2";
import { getUrlWithParam } from "../../../../views/common/util/route/routeUtil";
import { MenuReponseSansDelivrance } from "../../../../views/pages/apercuRequete/apercuRequeteEnpriseEnCharge/contenu/MenuReponseSansDelivrance";
import {
  URL_MES_REQUETES_APERCU_PRISE_EN_CHARGE_COURRIER,
  URL_MES_REQUETES_APERCU_REQUETE_PRISE_EN_CHARGE_ID
} from "../../../../views/router/ReceUrls";

const superagentMock = require("superagent-mock")(request, configRequetesV2);

const history = createMemoryHistory();

beforeEach(() => {
  history.push(
    getUrlWithParam(
      URL_MES_REQUETES_APERCU_REQUETE_PRISE_EN_CHARGE_ID,
      idRequete2
    )
  );
  render(
    <Router history={history}>
      <MenuReponseSansDelivrance requete={requete2} />
    </Router>
  );
});

test("renders du bloc Menu Reponse sans délivrance", async () => {
  expect(screen.getByText(/Requête incomplète+/)).toBeDefined();
  expect(screen.getByText(/Acte non détenu au SCEC+/)).toBeDefined();
  expect(screen.getByText(/Divers+/)).toBeDefined();
  expect(screen.getByText(/Ignorer la requête+/)).toBeDefined();
});

test("Réponse requête incomplète", async () => {
  await act(async () => {
    fireEvent.click(screen.getByText("Réponse sans délivrance"));
  });

  await act(async () => {
    fireEvent.click(screen.getByText(/Requête incomplète+/));
  });

  expect(history.location.pathname).toBe(
    getUrlWithParam(
      URL_MES_REQUETES_APERCU_PRISE_EN_CHARGE_COURRIER,
      idRequete2
    )
  );
});
test("Réponse acte non détenu", async () => {
  await act(async () => {
    fireEvent.click(screen.getByText("Réponse sans délivrance"));
  });

  await act(async () => {
    fireEvent.click(screen.getByText(/Acte non détenu+/));
  });

  expect(history.location.pathname).toBe(
    getUrlWithParam(
      URL_MES_REQUETES_APERCU_PRISE_EN_CHARGE_COURRIER,
      idRequete2
    )
  );
});
test("Réponse divers", async () => {
  await act(async () => {
    fireEvent.click(screen.getByText("Réponse sans délivrance"));
  });

  await act(async () => {
    fireEvent.click(screen.getByText(/Divers+/));
  });

  expect(history.location.pathname).toBe(
    getUrlWithParam(
      URL_MES_REQUETES_APERCU_PRISE_EN_CHARGE_COURRIER,
      idRequete2
    )
  );
});

afterAll(() => {
  superagentMock.unset();
});
