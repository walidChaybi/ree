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
import { idRequeteRDC, requeteRDC } from "../../../../../mock/data/RequeteV2";
import { DataRMCInscriptionAvecUnRCA } from "../../../../../mock/data/RMCInscription";
import { configEtatcivil } from "../../../../../mock/superagent-config/superagent-mock-etatcivil";
import { configRequetesV2 } from "../../../../../mock/superagent-config/superagent-mock-requetes-v2";
import { DocumentDelivrance } from "../../../../../model/requete/v2/enum/DocumentDelivrance";
import { getUrlWithParam } from "../../../../../views/common/util/route/routeUtil";
import {
  estChoixExtraitAvecOuSansFiliation,
  MenuDelivrer,
  nonVide,
  unActeEtUnSeulSelectionne
} from "../../../../../views/pages/apercuRequete/apercuRequeteEnpriseEnCharge/contenu/actions/MenuDelivrer";
import { URL_MES_REQUETES_APERCU_REQUETE_PRISE_EN_CHARGE_ID } from "../../../../../views/router/ReceUrls";

const superagentMock = require("superagent-mock")(request, configRequetesV2);
const superagentMockRequete = require("superagent-mock")(
  request,
  configRequetesV2
);
const superagentMockEtatCivil = require("superagent-mock")(
  request,
  configEtatcivil
);

beforeAll(() => {
  DocumentDelivrance.init();
});

test("renders du bloc Menu Delivrer pour une requête de délivrance de sous-type RDD", async () => {
  const history = createMemoryHistory();
  history.push(
    getUrlWithParam(
      URL_MES_REQUETES_APERCU_REQUETE_PRISE_EN_CHARGE_ID,
      idRequeteRDC
    )
  );

  await act(async () => {
    render(
      <Router history={history}>
        <MenuDelivrer
          requete={requeteRDC}
          inscriptions={DataRMCInscriptionAvecUnRCA}
        />
      </Router>
    );
  });

  let menuDelivrer = screen.getByText("Délivrer");
  let copieIntergale: HTMLElement;
  let extraitAvecFiliation: HTMLElement;
  let extraitSansFiliation: HTMLElement;
  let extraitPlurilingue: HTMLElement;
  let copieArchive: HTMLElement;

  await waitFor(() => {
    expect(menuDelivrer).toBeDefined();
    copieIntergale = screen.getByText(/Copie intégrale/i);
    extraitAvecFiliation = screen.getByText(/Extrait avec filiation/i);
    extraitSansFiliation = screen.getByText(/Extrait sans filiation/i);
    extraitPlurilingue = screen.getByText(/Extrait plurilingue/i);
    copieArchive = screen.getByText(/Copie archive \(118\)/i);

    expect(copieIntergale).toBeDefined();
    expect(extraitAvecFiliation).toBeDefined();
    expect(extraitSansFiliation).toBeDefined();
    expect(extraitPlurilingue).toBeDefined();
    expect(copieArchive).toBeDefined();
  });

  await act(async () => {
    fireEvent.click(copieIntergale);
  });

  await waitFor(() => {
    expect(screen.getByRole("dialog")).toBeDefined();
  });
});

test("unActeEtUnSeulSelectionne", () => {
  expect(unActeEtUnSeulSelectionne([null], [null])).toBe(false);
});
test("estChoixExtraitAvecOuSansFiliation", () => {
  expect(estChoixExtraitAvecOuSansFiliation(0)).toBe(false);
});
test("nonVide", () => {
  expect(nonVide(["salut"])).toBe(true);
});

afterAll(() => {
  superagentMock.unset();
  superagentMockRequete.unset();
  superagentMockEtatCivil.unset();
});
