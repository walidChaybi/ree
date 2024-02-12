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
import { RouterProvider } from "react-router-dom";
import { createTestingRouter } from "../../../../../__tests__utils__/testsUtil";

describe("Test de la page Aperçu requête transcription en saisie de projet", () => {
  test("DOIT rendre le composant ApercuReqCreationTranscriptionSaisieProjetPage correctement", async () => {
    await act(async () => {
      const router = createTestingRouter(
        [
          {
            path: URL_MES_REQUETES_CREATION_TRANSCRIPTION_APERCU_REQUETE_SAISIE_PROJET_ID,
            element: <ApercuReqCreationTranscriptionSaisieProjetPage />
          }
        ],
        [
          getUrlWithParam(
            `${URL_MES_REQUETES_CREATION}/${PATH_APERCU_REQ_TRANSCRIPTION_EN_SAISIE_PROJET}/:idRequete`,
            "dd96cc3a-9865-4c83-b634-37fad2680f41"
          )
        ]
      );

      const { container } = render(<RouterProvider router={router} />);

      expect(
        container.getElementsByClassName(
          "ApercuReqCreationTranscriptionSaisieProjetPage"
        ).length
      ).toBe(1);
    });
  });

  test("DOIT passer le tag aria-selected a true QUAND je click sur l'onglet Echanges", async () => {
    await act(async () => {
      const router = createTestingRouter(
        [
          {
            path: URL_MES_REQUETES_CREATION_TRANSCRIPTION_APERCU_REQUETE_SAISIE_PROJET_ID,
            element: <ApercuReqCreationTranscriptionSaisieProjetPage />
          }
        ],
        [
          getUrlWithParam(
            `${URL_MES_REQUETES_CREATION}/${PATH_APERCU_REQ_TRANSCRIPTION_EN_SAISIE_PROJET}/:idRequete`,
            "dd96cc3a-9865-4c83-b634-37fad2680f41"
          )
        ]
      );

      render(<RouterProvider router={router} />);
    });

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
    await act(async () => {
      const router = createTestingRouter(
        [
          {
            path: URL_MES_REQUETES_CREATION_TRANSCRIPTION_APERCU_REQUETE_SAISIE_PROJET_ID,
            element: <ApercuReqCreationTranscriptionSaisieProjetPage />
          }
        ],
        [
          getUrlWithParam(
            `${URL_MES_REQUETES_CREATION}/${PATH_APERCU_REQ_TRANSCRIPTION_EN_SAISIE_PROJET}/:idRequete`,
            "dd96cc3a-9865-4c83-b634-37fad2680f41"
          )
        ]
      );

      render(<RouterProvider router={router} />);
    });

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
    await act(async () => {
      const router = createTestingRouter(
        [
          {
            path: URL_MES_REQUETES_CREATION_TRANSCRIPTION_APERCU_REQUETE_SAISIE_PROJET_ID,
            element: <ApercuReqCreationTranscriptionSaisieProjetPage />
          }
        ],
        [
          getUrlWithParam(
            `${URL_MES_REQUETES_CREATION}/${PATH_APERCU_REQ_TRANSCRIPTION_EN_SAISIE_PROJET}/:idRequete`,
            "dd96cc3a-9865-4c83-b634-37fad2680f41"
          )
        ]
      );

      render(<RouterProvider router={router} />);
    });

    await waitFor(() => {
      expect(
        screen.getByText("Autres requêtes associées au titulaire")
      ).toBeDefined();
    });
  });
  test("NE DOIT PAS afficher le composant RMCRequeteAssociees QUAND l'ID de la requête est est founi en props", async () => {
    await act(async () => {
      const router = createTestingRouter(
        [
          {
            path: URL_MES_REQUETES_CREATION_TRANSCRIPTION_APERCU_REQUETE_SAISIE_PROJET_ID,
            element: (
              <ApercuReqCreationTranscriptionSaisieProjetPage idRequeteAAfficher="dd96cc3a-9865-4c83-b634-37fad2680f41" />
            )
          }
        ],
        [
          getUrlWithParam(
            `${URL_MES_REQUETES_CREATION}/${PATH_APERCU_REQ_TRANSCRIPTION_EN_SAISIE_PROJET}/:idRequete`,
            "dd96cc3a-9865-4c83-b634-37fad2680f41"
          )
        ]
      );

      render(<RouterProvider router={router} />);
    });

    await waitFor(() => {
      expect(
        screen.queryByText("Autres requêtes associées au titulaire")
      ).not.toBeInTheDocument();
    });
  });
});


