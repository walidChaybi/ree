import { ApercuReqCreationTranscriptionPriseEnChargePage } from "@pages/requeteCreation/apercuRequete/transcription/ApercuReqCreationTranscriptionPriseEnChargePage";
import {
  PATH_APERCU_REQ_TRANSCRIPTION_EN_PRISE_CHARGE,
  URL_MES_REQUETES_CREATION,
  URL_MES_REQUETES_CREATION_TRANSCRIPTION_APERCU_PRISE_EN_CHARGE_ID
} from "@router/ReceUrls";
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor
} from "@testing-library/react";
import { getUrlWithParam } from "@util/route/routeUtil";
import { createMemoryHistory } from "history";
import React from "react";
import { Route, Router } from "react-router";
import request from "superagent";
import { configEtatcivil } from "../../../../mock/superagent-config/superagent-mock-etatcivil";
import { configRequetesCreation } from "../../../../mock/superagent-config/superagent-mock-requetes-creation";

const superagentMock = require("superagent-mock")(request, [
  configEtatcivil[0],
  configRequetesCreation[0]
]);
afterAll(() => {
  superagentMock.unset();
});

describe("Test de la page Aperçu requête transcription en prise en charge", () => {
  test("DOIT rendre le composant ApercuReqCreationTranscriptionPriseEnChargePage correctement", async () => {
    const history = createMemoryHistory();
    history.push(
      getUrlWithParam(
        `${URL_MES_REQUETES_CREATION}/${PATH_APERCU_REQ_TRANSCRIPTION_EN_PRISE_CHARGE}/:idRequete`,
        "dd96cc3a-9865-4c83-b634-37fad2680f41"
      )
    );
    await act(async () => {
      const { container } = render(
        <Router history={history}>
          <ApercuReqCreationTranscriptionPriseEnChargePage />
        </Router>
      );
      expect(
        container.getElementsByClassName(
          "ApercuReqCreationTranscriptionPriseEnChargePage"
        ).length
      ).toBe(1);
    });
  });

  test("DOIT passer le tag aria-selected a true QUAND je click sur l'onglet Analyse du dossier", async () => {
    const history = createMemoryHistory();
    history.push(
      getUrlWithParam(
        `${URL_MES_REQUETES_CREATION}/${PATH_APERCU_REQ_TRANSCRIPTION_EN_PRISE_CHARGE}/:idRequete`,
        "dd96cc3a-9865-4c83-b634-37fad2680f41"
      )
    );

    await act(async () => {
      render(
        <Router history={history}>
          <Route
            exact={true}
            path={
              URL_MES_REQUETES_CREATION_TRANSCRIPTION_APERCU_PRISE_EN_CHARGE_ID
            }
          >
            <ApercuReqCreationTranscriptionPriseEnChargePage />
          </Route>
        </Router>
      );
    });

    const ongletPJ = screen.getByText("Pièces justificatives / Annexes");
    const ongletAnalyseDuDossier = screen.getByText("Analyse du dossier");

    await waitFor(async () => {
      expect(ongletPJ.getAttribute("aria-selected")).toBe("true");
    });

    fireEvent.click(ongletAnalyseDuDossier);

    await waitFor(async () => {
      expect(ongletAnalyseDuDossier.getAttribute("aria-selected")).toBe("true");
      expect(ongletPJ.getAttribute("aria-selected")).toBe("false");
    });
  });

  test("DOIT sélectionner l'onglet RMC QUAND je clique dessus.", async () => {
    const history = createMemoryHistory();
    history.push(
      getUrlWithParam(
        `${URL_MES_REQUETES_CREATION}/${PATH_APERCU_REQ_TRANSCRIPTION_EN_PRISE_CHARGE}/:idRequete`,
        "dd96cc3a-9865-4c83-b634-37fad2680f41"
      )
    );

    await act(async () => {
      render(
        <Router history={history}>
          <Route
            exact={true}
            path={
              URL_MES_REQUETES_CREATION_TRANSCRIPTION_APERCU_PRISE_EN_CHARGE_ID
            }
          >
            <ApercuReqCreationTranscriptionPriseEnChargePage />
          </Route>
        </Router>
      );
    });

    const ongletPJ = screen.getByText("Pièces justificatives / Annexes");
    const ongletRMC = screen.getByText("RMC");

    await waitFor(async () => {
      expect(ongletPJ.getAttribute("aria-selected")).toBe("true");
      expect(ongletRMC.getAttribute("aria-selected")).toBe("false");
    });

    fireEvent.click(ongletRMC);

    await waitFor(async () => {
      expect(ongletRMC.getAttribute("aria-selected")).toBe("true");
      expect(ongletPJ.getAttribute("aria-selected")).toBe("false");
    });
  });
});
