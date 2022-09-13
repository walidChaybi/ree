import { MenuReponseSansDelivranceEC } from "@pages/requeteDelivrance/apercuRequete/apercuRequeteEnpriseEnCharge/contenu/actions/MenuReponseSansDelivranceEC";
import {
  PATH_EDITION,
  URL_MES_REQUETES_DELIVRANCE,
  URL_MES_REQUETES_DELIVRANCE_APERCU_REQUETE_PRISE_EN_CHARGE_ID
} from "@router/ReceUrls";
import { act, fireEvent, render, screen } from "@testing-library/react";
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
      <MenuReponseSansDelivranceEC requete={requeteRDC} />
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
    fireEvent.click(screen.getByText(/Requête incomplète+/));
  });

  expect(history.location.pathname).toBe(
    `${URL_MES_REQUETES_DELIVRANCE}/${PATH_EDITION}/${idRequeteRDC}/`
  );
});

test("Réponse acte non détenu", async () => {
  await act(async () => {
    fireEvent.click(screen.getByText(/Acte non détenu+/));
  });

  expect(history.location.pathname).toBe(
    `${URL_MES_REQUETES_DELIVRANCE}/${PATH_EDITION}/${idRequeteRDC}/`
  );
});

test("Réponse divers", async () => {
  await act(async () => {
    fireEvent.click(screen.getByText(/Divers+/));
  });

  expect(history.location.pathname).toBe(
    `${URL_MES_REQUETES_DELIVRANCE}/${PATH_EDITION}/${idRequeteRDC}/`
  );
});

test("Réponse ignorer", async () => {
  await act(async () => {
    fireEvent.click(screen.getByText("Réponse sans délivrance"));
  });

  await act(async () => {
    fireEvent.click(screen.getByText(/Ignorer+/));
  });

  const valider = screen.getByText("Valider") as HTMLButtonElement;

  expect(valider.disabled).toBeTruthy();
});

afterAll(() => {
  superagentMock.unset();
});
