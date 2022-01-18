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
import { LISTE_UTILISATEURS } from "../../../../../mock/data/ListeUtilisateurs";
import { configComposition } from "../../../../../mock/superagent-config/superagent-mock-composition";
import { configRequetes } from "../../../../../mock/superagent-config/superagent-mock-requetes";
import { DocumentDelivrance } from "../../../../../model/requete/enum/DocumentDelivrance";
import { getUrlWithParam } from "../../../../../views/common/util/route/routeUtil";
import { storeRece } from "../../../../../views/common/util/storeRece";
import { ApercuCourrier } from "../../../../../views/pages/requeteDelivrance/apercuRequete/apercuCourrier/ApercuCourrier";
import { URL_MES_REQUETES_DELIVRANCE_COURRIER_ID } from "../../../../../views/router/ReceUrls";

const superagentMock = require("superagent-mock")(request, [
  configRequetes[0],
  configComposition[0]
]);

const history = createMemoryHistory();
history.push(
  getUrlWithParam(
    URL_MES_REQUETES_DELIVRANCE_COURRIER_ID,
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
          <Route exact={true} path={URL_MES_REQUETES_DELIVRANCE_COURRIER_ID}>
            <ApercuCourrier />
          </Route>
        </Router>
      </>
    );
  });

  const boutonValider = screen.getByText(/Valider/i) as HTMLButtonElement;
  const inputCourrier = screen.getByTestId("choixCourrier.courrier")
    .childNodes[0] as HTMLSelectElement;

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
          <Route exact={true} path={URL_MES_REQUETES_DELIVRANCE_COURRIER_ID}>
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
