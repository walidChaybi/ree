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


const history = createMemoryHistory();

describe("Test de la page Aperçu requête transcription simple", () => {
  beforeEach(async () => {
    history.push(
      getUrlWithParam(
        `${URL_MES_REQUETES_CREATION}/${PATH_APERCU_REQ_TRANSCRIPTION_SIMPLE}/:idRequete`,
        "dd96cc3a-9865-4c83-b634-37fad2680f41"
      )
    );

    await act(async () => {
      render(
        <Router history={history}>
          <ApercuReqCreationTranscriptionSimplePage />
        </Router>
      );
    });
  });
  test("DOIT rendre le composant ApercuReqCreationTranscriptionSimplePage correctement", async () => {
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

describe("Test du rendu du composant RMCRequeteAssociees", () => {
  test("DOIT afficher le composant RMCRequeteAssociees QUAND l'ID de la requête est présent dans l'URL", async () => {
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
          <ApercuReqCreationTranscriptionSimplePage idRequeteAAfficher="dd96cc3a-9865-4c83-b634-37fad2680f41" />
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

