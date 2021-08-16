import {
  act,
  fireEvent,
  render,
  screen,
  waitFor
} from "@testing-library/react";
import { createMemoryHistory } from "history";
import React from "react";
import { Router } from "react-router-dom";
import request from "superagent";
import { reponseNegativeMariage } from "../../../../mock/data/Composition";
import requeteDelivrance from "../../../../mock/data/requeteDelivrance";
import { idRequete1, requete1 } from "../../../../mock/data/RequeteV2";
import { configEtatcivil } from "../../../../mock/superagent-config/superagent-mock-etatcivil";
import { configMultiAPi } from "../../../../mock/superagent-config/superagent-mock-multi-apis";
import { configRequetesV2 } from "../../../../mock/superagent-config/superagent-mock-requetes-v2";
import { ParametreBaseRequete } from "../../../../model/parametres/enum/ParametresBaseRequete";
import { IResultatRMCActe } from "../../../../model/rmc/acteInscription/resultat/IResultatRMCActe";
import { getUrlWithParam } from "../../../../views/common/util/route/routeUtil";
import {
  createReponseNegativePourCompositionApiMariage,
  MenuReponseNegative
} from "../../../../views/pages/apercuRequete/apercuRequeteEnpriseEnCharge/contenu/MenuReponseNegative";
import {
  URL_MES_REQUETES_APERCU_REQUETE_PRISE_EN_CHARGE_ID,
  URL_MES_REQUETES_APERCU_REQUETE_TRAITEMENT_ID
} from "../../../../views/router/ReceUrls";

const superagentMock = require("superagent-mock")(request, configMultiAPi);
const superagentMock2 = require("superagent-mock")(request, configRequetesV2);
const superagentMock3 = require("superagent-mock")(request, configEtatcivil);

const history = createMemoryHistory();
history.push(
  getUrlWithParam(
    URL_MES_REQUETES_APERCU_REQUETE_PRISE_EN_CHARGE_ID,
    idRequete1
  )
);

beforeEach(() => {
  render(
    <Router history={history}>
      <MenuReponseNegative requete={requete1} />
    </Router>
  );
});
test("renders du bloc Menu Reponse Negative", async () => {
  let menuReponseNegative: HTMLElement;
  let choixRequeteIncomplete: HTMLElement;
  let choixTraceMariage: HTMLElement;

  await waitFor(() => {
    menuReponseNegative = screen.getByText("Réponse négative");
    expect(menuReponseNegative).toBeDefined();
  });

  await waitFor(() => {
    choixRequeteIncomplete = screen.getByText(
      /Requête incomplète ou illisible.+/
    );
    choixTraceMariage = screen.getByText(/Trace d'un mariage actif.+/);
    expect(choixRequeteIncomplete).toBeDefined();
    expect(choixTraceMariage).toBeDefined();
  });
});

test("Réponse négative demande incomplète", async () => {
  let menuReponseNegative = screen.getByText("Réponse négative");
  let choixRequeteIncomplete: HTMLElement;

  await act(async () => {
    fireEvent.click(menuReponseNegative);
  });

  await act(async () => {
    choixRequeteIncomplete = screen.getByText(
      /Requête incomplète ou illisible.+/
    );
    fireEvent.click(choixRequeteIncomplete);
  });

  await waitFor(() => {
    expect(history.location.pathname).toBe(
      getUrlWithParam(URL_MES_REQUETES_APERCU_REQUETE_TRAITEMENT_ID, idRequete1)
    );
  });
});

test("Reponse négative mariage", async () => {
  let menuReponseNegative = screen.getByText("Réponse négative");
  let choixTraceMariage: HTMLElement;

  await act(async () => {
    fireEvent.click(menuReponseNegative);
  });

  await waitFor(() => {
    choixTraceMariage = screen.getByText(/Trace d'un mariage actif.+/);
  });

  await act(async () => {
    fireEvent.click(choixTraceMariage);
  });

  await waitFor(() => {
    expect(screen.getByRole("dialog")).toBeDefined();
  });
});

test("test de création réponse négative mariage", async () => {
  await ParametreBaseRequete.init();
  const requete = requeteDelivrance;
  const acte = { idActe: "b41079a5-9e8d-478c-b04c-c4c2ac671348" };
  const reponseNegative = await createReponseNegativePourCompositionApiMariage(
    requete,
    acte as any as IResultatRMCActe
  );
  expect(reponseNegative).toStrictEqual(reponseNegativeMariage);
});

afterAll(() => {
  superagentMock.unset();
  superagentMock2.unset();
  superagentMock3.unset();
});
