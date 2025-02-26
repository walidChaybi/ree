import { ApercuReqCreationTranscriptionPriseEnChargePage } from "@pages/requeteCreation/apercuRequete/transcription/ApercuReqCreationTranscriptionPriseEnChargePage";
import { ApercuReqCreationTranscriptionSimplePage } from "@pages/requeteCreation/apercuRequete/transcription/ApercuReqCreationTranscriptionSimplePage";
import {
  PATH_APERCU_REQ_TRANSCRIPTION_SIMPLE,
  URL_MES_REQUETES_CREATION,
  URL_MES_REQUETES_CREATION_TRANSCRIPTION_APERCU_REQUETE_SIMPLE_ID,
  URL_RECHERCHE_REQUETE_APERCU_REQUETE_CREATION_TRANSCRIPTION_PRISE_CHARGE_ID
} from "@router/ReceUrls";
import { act, render, screen, waitFor } from "@testing-library/react";
import { getUrlWithParam } from "@util/route/UrlUtil";
import { RouterProvider } from "react-router-dom";
import { describe, expect, test } from "vitest";
import { createTestingRouter, elementAvecContexte } from "../../../../../__tests__utils__/testsUtil";
import { userDroitCreerActeTranscritPerimetreTousRegistres } from "../../../../../mock/data/mockConnectedUserAvecDroit";

describe.skip("Test de la page Aperçu requête transcription simple", () => {
  test("DOIT rendre le composant ApercuReqCreationTranscriptionSimplePage correctement", async () => {
    await act(async () => {
      const router = createTestingRouter(
        [
          {
            path: URL_MES_REQUETES_CREATION_TRANSCRIPTION_APERCU_REQUETE_SIMPLE_ID,
            element: <ApercuReqCreationTranscriptionSimplePage />
          }
        ],
        [
          getUrlWithParam(
            `${URL_MES_REQUETES_CREATION}/${PATH_APERCU_REQ_TRANSCRIPTION_SIMPLE}/:idRequete`,
            "dd96cc3a-9865-4c83-b634-37fad2680f41"
          )
        ]
      );

      const { container } = render(<RouterProvider router={router} />);
      expect(container.getElementsByClassName("ApercuReqCreationTranscriptionSimplePage").length).toBe(1);
    });
  });

  test("DOIT avoir tag aria-selected a true à l'arrivée sur la page", async () => {
    await act(async () => {
      const router = createTestingRouter(
        [
          {
            path: URL_MES_REQUETES_CREATION_TRANSCRIPTION_APERCU_REQUETE_SIMPLE_ID,
            element: <ApercuReqCreationTranscriptionSimplePage />
          }
        ],
        [
          getUrlWithParam(
            `${URL_MES_REQUETES_CREATION}/${PATH_APERCU_REQ_TRANSCRIPTION_SIMPLE}/:idRequete`,
            "dd96cc3a-9865-4c83-b634-37fad2680f41"
          )
        ]
      );

      render(<RouterProvider router={router} />);
    });

    const ongletPJ = screen.getAllByText("Pièces justificatives / Annexes");

    await waitFor(async () => {
      expect(ongletPJ[0].getAttribute("aria-selected")).toBe("true");
    });
  });
});

describe.skip("Test du rendu du composant RMCRequeteAssociees", () => {
  test("DOIT afficher le composant RMCRequeteAssociees QUAND l'ID de la requête est présent dans l'URL", async () => {
    await act(async () => {
      const router = createTestingRouter(
        [
          {
            path: URL_MES_REQUETES_CREATION_TRANSCRIPTION_APERCU_REQUETE_SIMPLE_ID,
            element: <ApercuReqCreationTranscriptionSimplePage />
          }
        ],
        [
          getUrlWithParam(
            `${URL_MES_REQUETES_CREATION}/${PATH_APERCU_REQ_TRANSCRIPTION_SIMPLE}/:idRequete`,
            "dd96cc3a-9865-4c83-b634-37fad2680f41"
          )
        ]
      );

      render(<RouterProvider router={router} />);
    });
    await waitFor(() => {
      expect(screen.getByText("Autres requêtes associées au titulaire")).toBeDefined();
    });
  });
  test("NE DOIT PAS afficher le composant RMCRequeteAssociees QUAND l'ID de la requête est est founi en props", async () => {
    await act(async () => {
      const router = createTestingRouter(
        [
          {
            path: URL_MES_REQUETES_CREATION_TRANSCRIPTION_APERCU_REQUETE_SIMPLE_ID,
            element: <ApercuReqCreationTranscriptionSimplePage idRequeteAAfficher="dd96cc3a-9865-4c83-b634-37fad2680f41" />
          }
        ],
        [
          getUrlWithParam(
            `${URL_MES_REQUETES_CREATION}/${PATH_APERCU_REQ_TRANSCRIPTION_SIMPLE}/:idRequete`,
            "dd96cc3a-9865-4c83-b634-37fad2680f41"
          )
        ]
      );

      render(<RouterProvider router={router} />);
    });

    await waitFor(() => {
      expect(screen.queryByText("Autres requêtes associées au titulaire")).not.toBeDefined();
    });
  });

  test("NE DOIT PAS afficher le bouton prendre en charge QUAND la requête n'est pas au statut 'PRENDRE EN CHARGE' ou 'TRANSFEREE'", async () => {
    await act(async () => {
      const router = createTestingRouter(
        [
          {
            path: URL_MES_REQUETES_CREATION_TRANSCRIPTION_APERCU_REQUETE_SIMPLE_ID,
            element: <ApercuReqCreationTranscriptionSimplePage idRequeteAAfficher="dd96cc3a-9865-4c83-b634-37fad2680f41" />
          }
        ],
        [
          getUrlWithParam(
            `${URL_MES_REQUETES_CREATION}/${PATH_APERCU_REQ_TRANSCRIPTION_SIMPLE}/:idRequete`,
            "dd96cc3a-9865-4c83-b634-37fad2680f41"
          )
        ]
      );

      render(<RouterProvider router={router} />);
    });

    await waitFor(() => {
      expect(screen.queryByText("Prendre en charge")).not.toBeDefined();
    });
  });

  test("DOIT afficher le bouton prendre en charge QUAND la requête est au statut 'A_TRAITER'", async () => {
    const router = createTestingRouter(
      [
        {
          path: URL_MES_REQUETES_CREATION_TRANSCRIPTION_APERCU_REQUETE_SIMPLE_ID,
          element: <ApercuReqCreationTranscriptionSimplePage idRequeteAAfficher="de96cc3n-9865-4c83-b634-37fad2680f41" />
        },
        {
          path: getUrlWithParam(
            URL_RECHERCHE_REQUETE_APERCU_REQUETE_CREATION_TRANSCRIPTION_PRISE_CHARGE_ID,
            "3ed9aa4e-921b-489f-b8fe-531dd703c60c"
          ),
          element: <ApercuReqCreationTranscriptionPriseEnChargePage />
        }
      ],
      [
        getUrlWithParam(
          `${URL_MES_REQUETES_CREATION}/${PATH_APERCU_REQ_TRANSCRIPTION_SIMPLE}/:idRequete`,
          "dd96cc3a-9865-4c83-b634-37fad2680f41"
        )
      ]
    );

    render(elementAvecContexte(<RouterProvider router={router} />, userDroitCreerActeTranscritPerimetreTousRegistres));

    await waitFor(() => {
      expect(screen.queryByText("Prendre en charge")).toBeDefined();
    });
  });
});
