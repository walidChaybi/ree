import {
  act,
  fireEvent,
  render,
  screen,
  waitFor
} from "@testing-library/react";
import { createMemoryHistory } from "history";
import React from "react";
import { Route, Router } from "react-router-dom";
import request from "superagent";
import { LISTE_UTILISATEURS } from "../../../../mock/data/ListeUtilisateurs";
import { configRequetesV2 } from "../../../../mock/superagent-config/superagent-mock-requetes-v2";
import { DocumentDelivrance } from "../../../../model/requete/v2/enum/DocumentDelivrance";
import { getUrlWithParam } from "../../../../views/common/util/route/routeUtil";
import { storeRece } from "../../../../views/common/util/storeRece";
import { ApercuCourrier } from "../../../../views/pages/apercuRequete/apercuCourrier/ApercuCourrier";
import { URL_MES_REQUETES_APERCU_PRISE_EN_CHARGE_COURRIER } from "../../../../views/router/ReceUrls";

const superagentMock = require("superagent-mock")(request, configRequetesV2);

const history = createMemoryHistory();
history.push(
  getUrlWithParam(
    URL_MES_REQUETES_APERCU_PRISE_EN_CHARGE_COURRIER,
    "a4cefb71-8457-4f6b-937e-34b49335d666"
  )
);

beforeAll(() => {
  storeRece.listeUtilisateurs = LISTE_UTILISATEURS;
  DocumentDelivrance.init();
});

test("renders apercu courrier", async () => {
  await act(async () => {
    render(
      <>
        <Router history={history}>
          <Route
            exact={true}
            path={URL_MES_REQUETES_APERCU_PRISE_EN_CHARGE_COURRIER}
          >
            <ApercuCourrier />
          </Route>
        </Router>
      </>
    );
  });

  const boutonValider = screen.getByText(/Valider/i) as HTMLButtonElement;
  const inputCourrier = screen.getByLabelText(
    "choixCourrier.courrier"
  ) as HTMLSelectElement;

  await waitFor(() => {
    expect(screen.getAllByText(/Création du courrier/i)).toBeDefined();
    expect(screen.getByText(/Numéro, type et nom de la voie/i)).toBeDefined();
    expect(screen.getByText(/Nombre d'exemplaires/i)).toBeDefined();
    expect(boutonValider).toBeDefined();
    expect(screen.getByText(/Annuler/i)).toBeDefined();
    expect(inputCourrier).toBeDefined();
  });

  expect(boutonValider.disabled).toBeFalsy();

  fireEvent.change(inputCourrier, {
    target: { value: "4b60aab4-2e9f-479c-bec6-f38edbd6e647" }
  });

  await act(async () => {
    fireEvent.click(screen.getByText(/Valider/i));
  });

  expect(
    screen.getByText(
      "Le choix d'une option standard est obligatoire pour ce courrier"
    )
  ).toBeDefined();
});

test("créer courrier", async () => {
  await act(async () => {
    render(
      <>
        <Router history={history}>
          <Route
            exact={true}
            path={URL_MES_REQUETES_APERCU_PRISE_EN_CHARGE_COURRIER}
          >
            <ApercuCourrier />
          </Route>
        </Router>
      </>
    );
  });

  await act(async () => {
    fireEvent.doubleClick(screen.getByText("Tiers non habilité"));
  });

  await act(async () => {
    fireEvent.click(screen.getByText(/Valider/i));
  });
});

afterAll(() => {
  superagentMock.unset();
});
