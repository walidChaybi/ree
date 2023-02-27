import { ApercuReqCreationTranscriptionSimplePage } from "@pages/requeteCreation/apercuRequete/transcription/ApercuReqCreationTranscriptionSimplePage";
import {
  PATH_APERCU_REQ_TRANSCRIPTION_SIMPLE,
  URL_MES_REQUETES_CREATION,
  URL_MES_REQUETES_CREATION_TRANSCRIPTION_APERCU_REQUETE_SIMPLE_ID
} from "@router/ReceUrls";
import { act, render, screen, waitFor } from "@testing-library/react";
import { getUrlWithParam } from "@util/route/UrlUtil";
import { createMemoryHistory } from "history";
import React from "react";
import { Route, Router } from "react-router";
import request from "superagent";
import { configRequetesCreation } from "../../../../../mock/superagent-config/superagent-mock-requetes-creation";
const superagentMock = require("superagent-mock")(
  request,
  configRequetesCreation
);
afterAll(() => {
  superagentMock.unset();
});

describe("Test de la page Aperçu requête transcription simple", () => {
  test("DOIT rendre le composant ApercuReqCreationTranscriptionSimplePage correctement", async () => {
    const history = createMemoryHistory();
    history.push(
      getUrlWithParam(
        `${URL_MES_REQUETES_CREATION}/${PATH_APERCU_REQ_TRANSCRIPTION_SIMPLE}/:idRequete`,
        "dd96cc3a-9865-4c83-b634-37fad2680f41"
      )
    );
    await act(async () => {
      const { container } = render(
        <Router history={history}>
          <ApercuReqCreationTranscriptionSimplePage />
        </Router>
      );
      expect(
        container.getElementsByClassName(
          "ApercuReqCreationTranscriptionSimplePage"
        ).length
      ).toBe(1);
    });
  });

  test("DOIT avoir tag aria-selected a true à l'arrivée sur la page", async () => {
    const history = createMemoryHistory();
    history.push(
      getUrlWithParam(
        `${URL_MES_REQUETES_CREATION}/${PATH_APERCU_REQ_TRANSCRIPTION_SIMPLE}/:idRequete`,
        "dd96cc3a-9865-4c83-b634-37fad2680f41"
      )
    );

    await act(async () => {
      render(
        <Router history={history}>
          <Route
            exact={true}
            path={
              URL_MES_REQUETES_CREATION_TRANSCRIPTION_APERCU_REQUETE_SIMPLE_ID
            }
          >
            <ApercuReqCreationTranscriptionSimplePage />
          </Route>
        </Router>
      );
    });

    const ongletPJ = screen.getAllByText("Pièces justificatives / Annexes");

    await waitFor(async () => {
      expect(ongletPJ[0].getAttribute("aria-selected")).toBe("true");
    });
  });
});
