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
import { LISTE_UTILISATEURS } from "../../../mock/data/ListeUtilisateurs";
import { configRequetesV2 } from "../../../mock/superagent-config/superagent-mock-requetes-v2";
import { getUrlWithParam } from "../../../views/common/util/route/routeUtil";
import { storeRece } from "../../../views/common/util/storeRece";
import { ApercuCourrierAccompagnement } from "../../../views/pages/apercuRequete/apercuCourrierAccompagnement/ApercuCourrierAccompagnement";
import { URL_MES_REQUETES_APERCU_PRISE_EN_CHARGE_COURRIER } from "../../../views/router/ReceUrls";

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
});

test("renders apercu courrier accompagnement", async () => {
  await act(async () => {
    render(
      <>
        <Router history={history}>
          <Route
            exact={true}
            path={URL_MES_REQUETES_APERCU_PRISE_EN_CHARGE_COURRIER}
          >
            <ApercuCourrierAccompagnement />
          </Route>
        </Router>
      </>
    );
  });

  await waitFor(() => {
    expect(screen.getAllByText(/Création du courrier/i)).toBeDefined();
    expect(screen.getByText(/Numéro, type et nom de la voie/i)).toBeDefined();
    expect(screen.getByText(/Nombre d'exemplaires/i)).toBeDefined();
    expect(screen.getByText(/Valider/i)).toBeDefined();
    expect(screen.getByText(/Annuler/i)).toBeDefined();
  });

  await act(async () => {
    fireEvent.click(screen.getByText(/Valider/i));
  });
});

afterAll(() => {
  superagentMock.unset();
});
