import { ApercuReqCreationTranscriptionPriseEnChargePage } from "@pages/requeteCreation/apercuRequete/transcription/ApercuReqCreationTranscriptionPriseEnChargePage";
import { URL_MES_REQUETES_CREATION_TRANSCRIPTION_APERCU_PRISE_EN_CHARGE_ID } from "@router/ReceUrls";
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

describe("Test de la page Aperçu requête transcription en prise en charge", () => {
  test("DOIT rendre le composant ApercuReqCreationTranscriptionPriseEnChargePage correctement", async () => {
    await act(async () => {
      const router = createTestingRouter(
        [
          {
            path: URL_MES_REQUETES_CREATION_TRANSCRIPTION_APERCU_PRISE_EN_CHARGE_ID,
            element: <ApercuReqCreationTranscriptionPriseEnChargePage />
          }
        ],
        [
          getUrlWithParam(
            URL_MES_REQUETES_CREATION_TRANSCRIPTION_APERCU_PRISE_EN_CHARGE_ID,
            "dd96cc3a-9865-4c83-b634-37fad2680f41"
          )
        ]
      );

      const { container } = render(<RouterProvider router={router} />);

      expect(
        container.getElementsByClassName(
          "ApercuReqCreationTranscriptionPriseEnChargePage"
        ).length
      ).toBe(1);
    });
  });

  test("DOIT afficher l'onglet RMC par defaut QUAND j'affiche la page", async () => {
    await act(async () => {
      const router = createTestingRouter(
        [
          {
            path: URL_MES_REQUETES_CREATION_TRANSCRIPTION_APERCU_PRISE_EN_CHARGE_ID,
            element: <ApercuReqCreationTranscriptionPriseEnChargePage />
          }
        ],
        [
          getUrlWithParam(
            URL_MES_REQUETES_CREATION_TRANSCRIPTION_APERCU_PRISE_EN_CHARGE_ID,
            "dd96cc3a-9865-4c83-b634-37fad2680f41"
          )
        ]
      );

      render(<RouterProvider router={router} />);
    });

    const ongletRMC = screen.getByText("RMC");

    await waitFor(async () => {
      expect(ongletRMC.getAttribute("aria-selected")).toBe("true");
    });
  });

  test("DOIT passer le tag aria-selected a true QUAND je click sur l'onglet Analyse du dossier", async () => {
    await act(async () => {
      const router = createTestingRouter(
        [
          {
            path: URL_MES_REQUETES_CREATION_TRANSCRIPTION_APERCU_PRISE_EN_CHARGE_ID,
            element: <ApercuReqCreationTranscriptionPriseEnChargePage />
          }
        ],
        [
          getUrlWithParam(
            URL_MES_REQUETES_CREATION_TRANSCRIPTION_APERCU_PRISE_EN_CHARGE_ID,
            "dd96cc3a-9865-4c83-b634-37fad2680f41"
          )
        ]
      );

      render(<RouterProvider router={router} />);
    });

    const ongletRMC = screen.getByText("RMC");
    const ongletAnalyseDuDossier = screen.getByText("Analyse du dossier");

    await waitFor(async () => {
      expect(ongletRMC.getAttribute("aria-selected")).toBe("true");
    });

    fireEvent.click(ongletAnalyseDuDossier);

    await waitFor(async () => {
      expect(ongletAnalyseDuDossier.getAttribute("aria-selected")).toBe("true");
      expect(ongletRMC.getAttribute("aria-selected")).toBe("false");
    });
  });

  test("DOIT sélectionner l'onglet Pieces justificatives / annexes QUAND je clique dessus.", async () => {
    await act(async () => {
      const router = createTestingRouter(
        [
          {
            path: URL_MES_REQUETES_CREATION_TRANSCRIPTION_APERCU_PRISE_EN_CHARGE_ID,
            element: <ApercuReqCreationTranscriptionPriseEnChargePage />
          }
        ],
        [
          getUrlWithParam(
            URL_MES_REQUETES_CREATION_TRANSCRIPTION_APERCU_PRISE_EN_CHARGE_ID,
            "dd96cc3a-9865-4c83-b634-37fad2680f41"
          )
        ]
      );

      render(<RouterProvider router={router} />);
    });

    const ongletPJ = screen.getByText("Pièces justificatives / Annexes");
    const ongletRMC = screen.getByText("RMC");

    await waitFor(async () => {
      expect(ongletPJ.getAttribute("aria-selected")).toBe("false");
      expect(ongletRMC.getAttribute("aria-selected")).toBe("true");
    });

    fireEvent.click(ongletPJ);

    await waitFor(async () => {
      expect(ongletRMC.getAttribute("aria-selected")).toBe("false");
      expect(ongletPJ.getAttribute("aria-selected")).toBe("true");
    });
  });
});

describe("Test du rendu du composant RMCRequeteAssociees", () => {
  test("DOIT afficher le composant RMCRequeteAssociees QUAND l'ID de la requête est présent dans l'URL", async () => {
    await act(async () => {
      const router = createTestingRouter(
        [
          {
            path: URL_MES_REQUETES_CREATION_TRANSCRIPTION_APERCU_PRISE_EN_CHARGE_ID,
            element: <ApercuReqCreationTranscriptionPriseEnChargePage />
          }
        ],
        [
          getUrlWithParam(
            URL_MES_REQUETES_CREATION_TRANSCRIPTION_APERCU_PRISE_EN_CHARGE_ID,
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
            path: URL_MES_REQUETES_CREATION_TRANSCRIPTION_APERCU_PRISE_EN_CHARGE_ID,
            element: (
              <ApercuReqCreationTranscriptionPriseEnChargePage idRequeteAAfficher="dd96cc3a-9865-4c83-b634-37fad2680f41" />
            )
          }
        ],
        [
          getUrlWithParam(
            URL_MES_REQUETES_CREATION_TRANSCRIPTION_APERCU_PRISE_EN_CHARGE_ID,
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
