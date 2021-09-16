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
import { ApercuRequeteTraitementPage } from "../../../views/pages/apercuRequete/apercuRequeteEnTraitement/ApercuRequeteTraitementPage";
import { URL_MES_REQUETES_APERCU_REQUETE_TRAITEMENT_ID } from "../../../views/router/ReceUrls";

const superagentMock = require("superagent-mock")(request, configRequetesV2);

global.URL.createObjectURL = jest.fn();
const history = createMemoryHistory();
history.push(
  getUrlWithParam(
    URL_MES_REQUETES_APERCU_REQUETE_TRAITEMENT_ID,
    "a4cefb71-8457-4f6b-937e-34b49335d404"
  )
);

beforeAll(() => {
  storeRece.listeUtilisateurs = LISTE_UTILISATEURS;
});

test("renders ApercuRequeteTraitementPage", async () => {
  await act(async () => {
    render(
      <>
        <Router history={history}>
          <Route
            exact={true}
            path={URL_MES_REQUETES_APERCU_REQUETE_TRAITEMENT_ID}
          >
            <ApercuRequeteTraitementPage />
          </Route>
        </Router>
      </>
    );
  });

  const title = screen.getByText(/Aperçu du traitement de la requête/i);
  const bandeau = screen.getByText(
    /Requête à traiter, attribuée à Ashley YOUNG - Le : 14\/07\/2020/i
  );
  const actions = screen.getByText(/Suivi des actions/i);

  const listeAction1 = screen.getByText(
    /Saisie de la requête - 10\/03\/2020 - APP/i
  );
  const listeAction2 = screen.getByText(/A traiter - 10\/03\/2020 - BOB/i);

  const listeObservation1 = screen.getByText(
    /C'est vraiment dur de pouvo... - 02\/01\/1970/i
  );
  const listeObservation2 = screen.getByText(
    /Je fais pas 30 charactères - 02\/01\/1970 - BOB/i
  );

  await waitFor(() => {
    expect(title).toBeDefined();
    expect(bandeau).toBeDefined();
    expect(actions).toBeDefined();
    expect(listeAction1).toBeDefined();
    expect(listeAction2).toBeDefined();
    expect(listeObservation1).toBeDefined();
    expect(listeObservation2).toBeDefined();
  });
});

test("renders document réponses", async () => {
  await act(async () => {
    render(
      <>
        <Router history={history}>
          <Route
            exact={true}
            path={URL_MES_REQUETES_APERCU_REQUETE_TRAITEMENT_ID}
          >
            <ApercuRequeteTraitementPage />
          </Route>
        </Router>
      </>
    );
  });
  const title = screen.getByText(/Documents à délivrer/i);
  const doc1 = screen.getByText(/CARN_CSPAC_01/i);
  const doc2 = screen.getByText(/CERTIFICAT_INSCRIPTION_RCA/i);

  await waitFor(() => {
    expect(title).toBeDefined();
    expect(doc1).toBeDefined();
    expect(doc2).toBeDefined();
  });

  await act(async () => {
    fireEvent.click(doc1);
  });
});

test("test du bouton de modification du courrier", async () => {
  await act(async () => {
    render(
      <>
        <Router history={history}>
          <Route
            exact={true}
            path={URL_MES_REQUETES_APERCU_REQUETE_TRAITEMENT_ID}
          >
            <ApercuRequeteTraitementPage />
          </Route>
        </Router>
      </>
    );
  });

  await act(async () => {
    fireEvent.click(screen.getByText("Actions"));
  });
  await act(async () => {
    fireEvent.click(screen.getByText(/Modifier le courrier/i));
  });
  console.log(history.location.pathname);
  expect(history.location.pathname).toBe(
    "/rece/rece-ui/mesrequetesv2/apercurequetetraitement/apercucourrieraccompagnement/a4cefb71-8457-4f6b-937e-34b49335d404"
  );
});

afterAll(() => {
  superagentMock.unset();
});
