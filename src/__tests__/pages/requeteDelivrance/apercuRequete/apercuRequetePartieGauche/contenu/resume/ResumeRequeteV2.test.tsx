import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { createMemoryHistory } from "history";
import React from "react";
import { act } from "react-dom/test-utils";
import { Route, Router } from "react-router-dom";
import request from "superagent";
import { ReponseAppelDetailRequeteCreation } from "../../../../../../../mock/data/DetailRequeteCreation";
import {
  ReponseAppelDetailRequeteDelivrance,
  ReponseAppelDetailRequeteDelivranceSansTitulairesAvecPJ,
  ReponseAppelDetailRequeteDelivranceUnTitulaire
} from "../../../../../../../mock/data/DetailRequeteDelivrance";
import { configRequetesV2 } from "../../../../../../../mock/superagent-config/superagent-mock-requetes-v2";
import { TypePieceJustificative } from "../../../../../../../model/requete/v2/enum/TypePieceJustificative";
import { getUrlWithParam } from "../../../../../../../views/common/util/route/routeUtil";
import { ResumeRequeteV2 } from "../../../../../../../views/pages/requeteDelivrance/apercuRequete/apercuRequetePartieGauche/contenu/resume/ResumeRequeteV2";
import { mappingRequeteDelivrance } from "../../../../../../../views/pages/requeteDelivrance/detailRequete/hook/DetailRequeteHook";
import { URL_MES_REQUETES_ID } from "../../../../../../../views/router/ReceUrls";

const superagentMock = require("superagent-mock")(request, configRequetesV2);
window.URL.createObjectURL = jest.fn();

beforeAll(() => {
  TypePieceJustificative.init();
});

test("renders Page requete with all elements", async () => {
  await act(async () => {
    const history = createMemoryHistory();
    history.push(
      getUrlWithParam(
        URL_MES_REQUETES_ID,
        "a4cefb71-8457-4f6b-937e-34b49335d404"
      )
    );

    render(
      <>
        <Router history={history}>
          <Route exact={true} path={URL_MES_REQUETES_ID}>
            <ResumeRequeteV2
              requete={
                await mappingRequeteDelivrance(
                  ReponseAppelDetailRequeteDelivrance.data
                )
              }
            />
          </Route>
        </Router>
      </>
    );
  });

  await waitFor(() => {
    expect(screen.getByText("Résumé requête")).toBeDefined();
    expect(screen.getByText("54j654j4jyfjtj456j4")).toBeDefined();
    expect(
      screen.getByText("Requête de Délivrance Extrait/Copie Dématérialisée")
    ).toBeDefined();
    expect(screen.getByText("Info titulaire 1")).toBeDefined();
    expect(screen.getByText("CAMPBALL")).toBeDefined();
    expect(screen.getByText("Info titulaire 2")).toBeDefined();
    expect(screen.getByText("AMBROSIA")).toBeDefined();
    expect(screen.getByText("Nature")).toBeDefined();
    expect(screen.getByText("Date de l'évènement")).toBeDefined();
    expect(screen.getByText("12/05/2019")).toBeDefined();
    expect(screen.getByText("Lieu de l'évènement")).toBeDefined();
    expect(screen.getByText("Tunis / Tunisie")).toBeDefined();
    expect(screen.getByText("Document")).toBeDefined();
    expect(screen.getByText("Motif")).toBeDefined();
    expect(screen.getByText("Canal")).toBeDefined();
    expect(screen.getByText("Nom requérant")).toBeDefined();
    expect(screen.getByText("Lien avec le titulaire")).toBeDefined();
    expect(screen.getByText("Père/mère")).toBeDefined();
    expect(screen.getByText("Pièces Justificatives")).toBeDefined();
    fireEvent.click(screen.getByText("54j654j4jyfjtj456j4"));
  });
});

test("renders Page requete with 1 titulaire", async () => {
  await act(async () => {
    const history = createMemoryHistory();
    history.push(
      getUrlWithParam(
        URL_MES_REQUETES_ID,
        "a4cefb71-8457-4f6b-937e-34b49335d404"
      )
    );

    render(
      <>
        <Router history={history}>
          <Route exact={true} path={URL_MES_REQUETES_ID}>
            <ResumeRequeteV2
              requete={
                await mappingRequeteDelivrance(
                  ReponseAppelDetailRequeteDelivranceUnTitulaire.data
                )
              }
            />
          </Route>
        </Router>
      </>
    );
  });

  await waitFor(() => {
    expect(screen.getByText("Résumé requête")).toBeDefined();
    expect(screen.getByText("54j654j4jyfjtj456j4")).toBeDefined();
    expect(
      screen.getByText("Requête de Délivrance Extrait/Copie Dématérialisée")
    ).toBeDefined();
    expect(screen.getByText("Info titulaire 1")).toBeDefined();
    expect(screen.getByText("CAMPBALL")).toBeDefined();
    expect(screen.getByText("Nature")).toBeDefined();
    expect(screen.getByText("Date de l'évènement")).toBeDefined();
    expect(screen.getByText("12/05/2019")).toBeDefined();
    expect(screen.getByText("Lieu de l'évènement")).toBeDefined();
    expect(screen.getByText("Tunis")).toBeDefined();
    expect(screen.getByText("Document")).toBeDefined();
    expect(screen.getByText("Motif")).toBeDefined();
    expect(screen.getByText("Canal")).toBeDefined();
    expect(screen.getByText("Nom requérant")).toBeDefined();
    expect(screen.getByText("Cabinet WandC")).toBeDefined();
    expect(screen.getByText("Père/mère")).toBeDefined();
    fireEvent.click(screen.getByText("54j654j4jyfjtj456j4"));
  });
});

test("renders Page requete without titulaire", async () => {
  await act(async () => {
    const history = createMemoryHistory();
    history.push(
      getUrlWithParam(
        URL_MES_REQUETES_ID,
        "a4cefb71-8457-4f6b-937e-34b49335d404"
      )
    );

    render(
      <>
        <Router history={history}>
          <Route exact={true} path={URL_MES_REQUETES_ID}>
            <ResumeRequeteV2
              requete={
                await mappingRequeteDelivrance(
                  ReponseAppelDetailRequeteDelivranceSansTitulairesAvecPJ.data
                )
              }
            />
          </Route>
        </Router>
      </>
    );
  });

  await waitFor(() => {
    expect(screen.getByText("Résumé requête")).toBeDefined();
    expect(screen.getByText("54j654j4jyfjtj456j4")).toBeDefined();
    expect(
      screen.getByText("Requête de Délivrance Extrait/Copie Dématérialisée")
    ).toBeDefined();
    expect(screen.getByText("Il n'y a pas de titulaire")).toBeDefined();
    expect(screen.getByText("Nature")).toBeDefined();
    expect(screen.getByText("Date de l'évènement")).toBeDefined();
    expect(screen.getByText("12/05/2019")).toBeDefined();
    expect(screen.getByText("Lieu de l'évènement")).toBeDefined();
    expect(screen.getByText("Tunisie")).toBeDefined();
    expect(screen.getByText("Document")).toBeDefined();
    expect(screen.getByText("Motif")).toBeDefined();
    expect(screen.getByText("Canal")).toBeDefined();
    expect(screen.getByText("Nom requérant")).toBeDefined();
    expect(screen.getByText("Lien avec le titulaire")).toBeDefined();
    expect(screen.getByText("Titulaire")).toBeDefined();
    expect(screen.getByText("Pièces Justificatives")).toBeDefined();
    fireEvent.click(screen.getByText("54j654j4jyfjtj456j4"));
  });
});

test("renders Page requete type creation", async () => {
  await act(async () => {
    const history = createMemoryHistory();
    history.push(
      getUrlWithParam(
        URL_MES_REQUETES_ID,
        "a4cefb71-8457-4f6b-937e-34b49335d404"
      )
    );

    render(
      <>
        <Router history={history}>
          <Route exact={true} path={URL_MES_REQUETES_ID}>
            <ResumeRequeteV2
              requete={
                await mappingRequeteDelivrance(
                  ReponseAppelDetailRequeteCreation.data
                )
              }
            />
          </Route>
        </Router>
      </>
    );
  });

  await waitFor(() => {
    expect(screen.getByText("Résumé requête")).toBeDefined();
    expect(screen.getByText("54j654j4jyfjtj456j4")).toBeDefined();
    expect(screen.getByText("Canal")).toBeDefined();
    expect(screen.getByText("Nom requérant")).toBeDefined();
    expect(screen.getByText("Lien avec le titulaire")).toBeDefined();
    expect(screen.getByText("Pièces Justificatives")).toBeDefined();
    fireEvent.click(screen.getByText("54j654j4jyfjtj456j4"));
  });
});

afterAll(() => {
  superagentMock.unset();
});
