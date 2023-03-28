import { ApercuReqCreationTranscriptionSaisieProjetPage } from "@pages/requeteCreation/apercuRequete/transcription/ApercuReqCreationTranscriptionSaisieProjetPage";
import {
  PATH_APERCU_REQ_TRANSCRIPTION_EN_SAISIE_PROJET,
  URL_MES_REQUETES_CREATION,
  URL_MES_REQUETES_CREATION_TRANSCRIPTION_APERCU_REQUETE_SAISIE_PROJET_ID
} from "@router/ReceUrls";
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor
} from "@testing-library/react";
import { getUrlWithParam } from "@util/route/UrlUtil";
import { createMemoryHistory } from "history";
import React from "react";
import { Route, Router } from "react-router";
import request from "superagent";
import { configEtatcivil } from "../../../../../mock/superagent-config/superagent-mock-etatcivil";
import { configRequetesCreation } from "../../../../../mock/superagent-config/superagent-mock-requetes-creation";

const superagentMock = require("superagent-mock")(request, [
  configEtatcivil[0],
  configRequetesCreation[0]
]);

const history = createMemoryHistory();

describe("Test de la page Aperçu requête transcription en saisie de projet", () => {
  beforeEach(async () => {
    history.push(
      getUrlWithParam(
        `${URL_MES_REQUETES_CREATION}/${PATH_APERCU_REQ_TRANSCRIPTION_EN_SAISIE_PROJET}/:idRequete`,
        "dd96cc3a-9865-4c83-b634-37fad2680f41"
      )
    );

    await act(async () => {
      render(
        <Router history={history}>
          <Route
            exact={true}
            path={
              URL_MES_REQUETES_CREATION_TRANSCRIPTION_APERCU_REQUETE_SAISIE_PROJET_ID
            }
          >
            <ApercuReqCreationTranscriptionSaisieProjetPage />
          </Route>
        </Router>
      );
    });
  });
  test("DOIT rendre le composant ApercuReqCreationTranscriptionSaisieProjetPage correctement", async () => {
    await act(async () => {
      const { container } = render(
        <Router history={history}>
          <Route
            exact={true}
            path={
              URL_MES_REQUETES_CREATION_TRANSCRIPTION_APERCU_REQUETE_SAISIE_PROJET_ID
            }
          >
            <ApercuReqCreationTranscriptionSaisieProjetPage />
          </Route>
        </Router>
      );
      expect(
        container.getElementsByClassName(
          "ApercuReqCreationTranscriptionSaisieProjetPage"
        ).length
      ).toBe(1);
    });
  });

  test("DOIT passer le tag aria-selected a true QUAND je click sur l'onglet Echanges", async () => {
    const ongletSaisieLeProjet = screen.getByText("Saisir le projet");
    const ongletEchanges = screen.getByText("Echanges");

    await waitFor(async () => {
      expect(ongletSaisieLeProjet.getAttribute("aria-selected")).toBe("true");
    });

    fireEvent.click(ongletEchanges);

    await waitFor(async () => {
      expect(ongletEchanges.getAttribute("aria-selected")).toBe("true");
      expect(ongletSaisieLeProjet.getAttribute("aria-selected")).toBe("false");
    });
  });

  test("DOIT passer le tag aria-selected a true QUAND je click sur l'onglet Aperçu du projet", async () => {
    const ongletDescriptionRequete = screen.getByText(
      "Description de la requête"
    );
    const ongletApercuProjet = screen.getByText("Aperçu du projet");

    await waitFor(async () => {
      expect(ongletDescriptionRequete.getAttribute("aria-selected")).toBe(
        "true"
      );
    });

    fireEvent.click(ongletApercuProjet);

    await waitFor(async () => {
      expect(ongletApercuProjet.getAttribute("aria-selected")).toBe("true");
      expect(ongletDescriptionRequete.getAttribute("aria-selected")).toBe(
        "false"
      );
    });
  });
});

describe("Test de la précense du composant RMCRequeteAssociees", () => {
  test("DOIT afficher le composant RMCRequeteAssociees QUAND l'ID de la requête est présent dans l'URL", async () => {
    history.push(
      getUrlWithParam(
        `${URL_MES_REQUETES_CREATION}/${PATH_APERCU_REQ_TRANSCRIPTION_EN_SAISIE_PROJET}/:idRequete`,
        "dd96cc3a-9865-4c83-b634-37fad2680f41"
      )
    );

    await act(async () => {
      render(
        <Router history={history}>
          <Route
            exact={true}
            path={
              URL_MES_REQUETES_CREATION_TRANSCRIPTION_APERCU_REQUETE_SAISIE_PROJET_ID
            }
          >
            <ApercuReqCreationTranscriptionSaisieProjetPage />
          </Route>
        </Router>
      );
    });

    await waitFor(() => {
      expect(
        screen.getByText("Autres requêtes associées au titulaire")
      ).toBeDefined();
    });
  });
  test("NE DOIT PAS afficher le composant RMCRequeteAssociees QUAND l'ID de la requête est est founi en props", async () => {
    await act(async () => {
      render(
        <Router history={history}>
          <ApercuReqCreationTranscriptionSaisieProjetPage idRequeteAAfficher="dd96cc3a-9865-4c83-b634-37fad2680f41" />
        </Router>
      );
    });

    await waitFor(() => {
      expect(
        screen.queryByText("Autres requêtes associées au titulaire")
      ).not.toBeInTheDocument();
    });
  });
});

afterAll(() => {
  superagentMock.unset();
});
