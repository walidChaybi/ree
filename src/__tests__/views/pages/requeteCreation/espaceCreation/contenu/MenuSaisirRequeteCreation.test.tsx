import MenuSaisirRequeteCreation from "@pages/requeteCreation/espaceCreation/contenu/MenuSaisirRequeteCreation";
import { SaisirRCTCPage } from "@pages/requeteCreation/saisirRequete/SaisirRCTCPage";
import {
  URL_MES_REQUETES_CREATION,
  URL_MES_REQUETES_CREATION_SAISIR_RCTC,
  URL_REQUETES_CREATION_SERVICE,
  URL_REQUETES_CREATION_SERVICE_SAISIR_RCTC
} from "@router/ReceUrls";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { FeatureFlag } from "@util/featureFlag/FeatureFlag";
import { gestionnaireFeatureFlag } from "@util/featureFlag/gestionnaireFeatureFlag";
import { RouterProvider } from "react-router-dom";
import { describe, expect, test, vi } from "vitest";
import { createTestingRouter } from "../../../../../__tests__utils__/testsUtil";

window.alert = vi.fn();
describe.skip("MenuSaisirRequeteCreation - ", () => {
  test("DOIT rendre le menu pour saisir une requete de creation transcription.", () => {
    const router = createTestingRouter(
      [
        {
          path: URL_MES_REQUETES_CREATION,
          element: <MenuSaisirRequeteCreation indexTabPanel={0} />
        },
        {
          path: URL_MES_REQUETES_CREATION_SAISIR_RCTC,
          element: <SaisirRCTCPage />
        }
      ],
      [URL_MES_REQUETES_CREATION]
    );

    render(<RouterProvider router={router} />);

    waitFor(() => {
      expect(
        gestionnaireFeatureFlag.estActif(
          FeatureFlag.FF_DELIVRANCE_EXTRAITS_COPIES
        )
      ).toBeTruthy();
    });

    const boutonMenu = screen.getByText(/Saisir requête courrier/i);
    // Open menu
    fireEvent.click(boutonMenu);

    const RCTC = screen.getByText("Création suite Transcription Courrier");

    waitFor(() => {
      expect(RCTC).toBeDefined();
    });

    fireEvent.click(RCTC);

    waitFor(() => {
      expect(router.state.location.pathname).toEqual(
        URL_MES_REQUETES_CREATION_SAISIR_RCTC
      );
    });
  });

  test("DOIT rendre le menu pour saisir une requete de creation transcription sur Mes Requete Service.", () => {
    const router = createTestingRouter(
      [
        {
          path: URL_REQUETES_CREATION_SERVICE,
          element: <MenuSaisirRequeteCreation indexTabPanel={1} />
        },
        {
          path: URL_REQUETES_CREATION_SERVICE_SAISIR_RCTC,
          element: <SaisirRCTCPage />
        }
      ],
      [URL_REQUETES_CREATION_SERVICE]
    );

    render(<RouterProvider router={router} />);

    waitFor(() => {
      expect(
        gestionnaireFeatureFlag.estActif(
          FeatureFlag.FF_DELIVRANCE_EXTRAITS_COPIES
        )
      ).toBeTruthy();
    });

    const boutonMenu = screen.getByText(/Saisir requête courrier/i);

    fireEvent.click(boutonMenu);

    const RCTC = screen.getByText("Création suite Transcription Courrier");

    waitFor(() => {
      expect(RCTC).toBeDefined();
    });

    fireEvent.click(RCTC);

    waitFor(() => {
      expect(router.state.location.pathname).toEqual(
        URL_REQUETES_CREATION_SERVICE_SAISIR_RCTC
      );
    });
  });
});

