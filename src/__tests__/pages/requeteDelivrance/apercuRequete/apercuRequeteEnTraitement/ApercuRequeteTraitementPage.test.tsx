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
import { configRequetes } from "../../../../../mock/superagent-config/superagent-mock-requetes";
import { DocumentDelivrance } from "../../../../../model/requete/enum/DocumentDelivrance";
import { TypePieceJustificative } from "../../../../../model/requete/enum/TypePieceJustificative";
import { gestionnaireFeatureFlag } from "../../../../../views/common/util/featureFlag/gestionnaireFeatureFlag";
import { getUrlWithParam } from "../../../../../views/common/util/route/routeUtil";
import { storeRece } from "../../../../../views/common/util/storeRece";
import { ApercuRequeteTraitementPage } from "../../../../../views/pages/requeteDelivrance/apercuRequete/apercuRequeteEnTraitement/ApercuRequeteTraitementPage";
import { URL_MES_REQUETES_DELIVRANCE_APERCU_REQUETE_TRAITEMENT_ID } from "../../../../../views/router/ReceUrls";

const superagentMock = require("superagent-mock")(request, configRequetes);

const globalAny: any = global;
globalAny.URL.createObjectURL = jest.fn();

const sauvFonctionEstActive = gestionnaireFeatureFlag.estActif;

let history: any;

beforeEach(() => {
  storeRece.listeUtilisateurs = LISTE_UTILISATEURS;
  DocumentDelivrance.init();
  TypePieceJustificative.init();
  gestionnaireFeatureFlag.estActif = function () {
    return true;
  };
  history = createMemoryHistory();
  history.push(
    getUrlWithParam(
      URL_MES_REQUETES_DELIVRANCE_APERCU_REQUETE_TRAITEMENT_ID,
      "a4cefb71-8457-4f6b-937e-34b49335d494"
    )
  );
});

afterAll(() => {
  gestionnaireFeatureFlag.estActif = sauvFonctionEstActive;
  superagentMock.unset();
});

test("renders ApercuRequeteTraitementPage", async () => {
  await act(async () => {
    render(
      <>
        <Router history={history}>
          <Route
            exact={true}
            path={URL_MES_REQUETES_DELIVRANCE_APERCU_REQUETE_TRAITEMENT_ID}
          >
            <ApercuRequeteTraitementPage />
          </Route>
        </Router>
      </>
    );
  });

  const title = screen.getByText(/Aperçu de la requête en traitement/i);
  const bandeau = screen.getByText(
    "Requête à signer le 14/07/2020 par Ashley YOUNG"
  );
  const actions = screen.getByText(/Suivi requête/i);

  const listeAction1 = screen.getByText(
    /Saisie de la requête - 10\/03\/2020 - APP/i
  );
  const listeAction2 = screen.getByText(/À traiter - 10\/03\/2020 - BOB/i);

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
            path={URL_MES_REQUETES_DELIVRANCE_APERCU_REQUETE_TRAITEMENT_ID}
          >
            <ApercuRequeteTraitementPage />
          </Route>
        </Router>
      </>
    );
  });
  const title = screen.getByText(/Documents à délivrer/i);
  const doc1 = screen.getAllByText(/^Courrier$/)[1]; // Il y a deux fois le libellé Courrier: un pour le canal et un pour les documenets délivrés
  const doc2 = screen.getByText(/Certificat d'inscription au RCA/i);

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
            path={URL_MES_REQUETES_DELIVRANCE_APERCU_REQUETE_TRAITEMENT_ID}
          >
            <ApercuRequeteTraitementPage />
          </Route>
        </Router>
      </>
    );
  });
  await act(async () => {
    fireEvent.click(screen.getByText(/Modifier le courrier/i));
  });
  expect(history.location.pathname).toBe(
    "/rece/rece-ui/mesrequetes/apercucourrier/a4cefb71-8457-4f6b-937e-34b49335d494"
  );
});

test("test du bouton de validation document", async () => {
  await act(async () => {
    render(
      <>
        <Router history={history}>
          <Route
            exact={true}
            path={URL_MES_REQUETES_DELIVRANCE_APERCU_REQUETE_TRAITEMENT_ID}
          >
            <ApercuRequeteTraitementPage />
          </Route>
        </Router>
      </>
    );
  });

  await act(async () => {
    fireEvent.click(screen.getByText(/Valider le document à traiter/i));
  });
  expect(history.location.pathname).toBe(
    "/rece/rece-ui/mesrequetes/apercurequetetraitement/edition/a4cefb71-8457-4f6b-937e-34b49335d494"
  );
});

