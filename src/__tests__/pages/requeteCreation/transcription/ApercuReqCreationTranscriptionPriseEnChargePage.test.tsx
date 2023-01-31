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

  test("DOIT afficher le tableau RMC Personne QUAND je clique sur l'onglet RMC.", async () => {
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

    await waitFor(() => {
      expect(screen.getByText("RMC")).toBeInTheDocument();

      expect(screen.queryByText("Nom")).not.toBeInTheDocument();
      expect(screen.queryByText("Autres noms")).not.toBeInTheDocument();
      expect(screen.queryByText("Prénoms")).not.toBeInTheDocument();
      expect(screen.queryByText("Sexe")).not.toBeInTheDocument();
      expect(screen.queryByText("Date de naissance")).not.toBeInTheDocument();
      expect(screen.queryByText("Lieu de naissance")).not.toBeInTheDocument();
      expect(screen.queryByText("Nature")).not.toBeInTheDocument();
      expect(screen.queryByText("Référence")).not.toBeInTheDocument();
      expect(screen.queryByText("Statut / Type")).not.toBeInTheDocument();
    });

    await act(async () => {
      fireEvent.click(screen.getByText("RMC"));
    });

    await waitFor(() => {
      expect(screen.getByText("Nom")).toBeInTheDocument();
      expect(screen.getByText("Autres noms")).toBeInTheDocument();
      expect(screen.getByText("Prénoms")).toBeInTheDocument();
      expect(screen.getByText("Sexe")).toBeInTheDocument();
      expect(screen.getByText("Date de naissance")).toBeInTheDocument();
      expect(screen.getByText("Lieu de naissance")).toBeInTheDocument();
      expect(screen.getByText("Nature")).toBeInTheDocument();
      expect(screen.getByText("Référence")).toBeInTheDocument();
      expect(screen.getByText("Statut / Type")).toBeInTheDocument();
    });
  });
});
