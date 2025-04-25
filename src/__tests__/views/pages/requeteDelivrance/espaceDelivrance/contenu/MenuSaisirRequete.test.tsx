import MenuSaisirRequete from "@pages/requeteDelivrance/espaceDelivrance/contenu/MenuSaisirRequete";
import { SaisirRDCPage } from "@pages/requeteDelivrance/saisirRequete/SaisirRDCPage";
import { SaisirRDCSCPage } from "@pages/requeteDelivrance/saisirRequete/SaisirRDCSCPage";
import {
  URL_MES_REQUETES_DELIVRANCE,
  URL_MES_REQUETES_DELIVRANCE_SAISIR_RDC,
  URL_MES_REQUETES_DELIVRANCE_SAISIR_RDCSC,
  URL_MES_REQUETES_DELIVRANCE_SAISIR_RDLFC,
  URL_REQUETES_DELIVRANCE_SERVICE,
  URL_REQUETES_DELIVRANCE_SERVICE_SAISIR_RDC,
  URL_REQUETES_DELIVRANCE_SERVICE_SAISIR_RDCSC,
  URL_REQUETES_DELIVRANCE_SERVICE_SAISIR_RDLFC
} from "@router/ReceUrls";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { FeatureFlag } from "@util/featureFlag/FeatureFlag";
import { gestionnaireFeatureFlag } from "@util/featureFlag/gestionnaireFeatureFlag";
import { RouterProvider } from "react-router";
import { describe, expect, test, vi } from "vitest";
import { createTestingRouter, elementAvecContexte } from "../../../../../__tests__utils__/testsUtil";
import { userDroitnonCOMEDEC } from "../../../../../mock/data/mockConnectedUserAvecDroit";

window.alert = vi.fn();

describe.skip("MenuSaisirRequete - ", () => {
  test("renders menu 'Saisir une requête' RDCSC dans Mes requetes de Délivrance", () => {
    const router = createTestingRouter(
      [
        {
          path: URL_MES_REQUETES_DELIVRANCE,
          element: <MenuSaisirRequete indexTabPanel={0} />
        },

        {
          path: URL_MES_REQUETES_DELIVRANCE_SAISIR_RDCSC,
          element: <SaisirRDCSCPage />
        }
      ],
      [URL_MES_REQUETES_DELIVRANCE]
    );

    render(<RouterProvider router={router} />);

    waitFor(() => {
      expect(gestionnaireFeatureFlag.estActif(FeatureFlag.FF_DELIVRANCE_EXTRAITS_COPIES)).toBeTruthy();
    });

    const boutonMenu = screen.getByText(/Saisir requête courrier/i);

    // Open menu
    fireEvent.click(boutonMenu);

    const RDCSC = screen.getByText("Délivrance Certificat & Attestation RC/RCA/PACS courrier");

    waitFor(() => {
      expect(RDCSC).toBeDefined();
    });

    // Click sur RDCSC
    fireEvent.click(RDCSC);

    waitFor(() => {
      expect(router.state.location.pathname).toEqual(URL_MES_REQUETES_DELIVRANCE_SAISIR_RDCSC);
    });
  });

  test("renders menu 'Saisir une requête' RDC dans Mes requetes de Délivrance", () => {
    const router = createTestingRouter(
      [
        {
          path: URL_MES_REQUETES_DELIVRANCE,
          element: <MenuSaisirRequete indexTabPanel={0} />
        },
        {
          path: URL_MES_REQUETES_DELIVRANCE_SAISIR_RDC,
          element: <SaisirRDCPage />
        }
      ],
      [URL_MES_REQUETES_DELIVRANCE]
    );

    render(<RouterProvider router={router} />);

    const boutonMenu = screen.getByText(/Saisir requête courrier/i);

    // Open menu
    fireEvent.click(boutonMenu);

    const RDC = screen.getByText("Délivrance Extrait/Copie courrier");

    waitFor(() => {
      expect(RDC).toBeDefined();
    });

    // Click sur RDC
    fireEvent.click(RDC);

    waitFor(() => {
      expect(router.state.location.pathname).toEqual(URL_MES_REQUETES_DELIVRANCE_SAISIR_RDC);
    });
  });

  test("renders menu 'Saisir une requête' RDLFC dans Mes requetes de Délivrance", () => {
    const router = createTestingRouter(
      [
        {
          path: URL_MES_REQUETES_DELIVRANCE,
          element: <MenuSaisirRequete indexTabPanel={0} />
        },
        {
          path: URL_MES_REQUETES_DELIVRANCE_SAISIR_RDLFC,
          element: <SaisirRDCSCPage />
        }
      ],
      [URL_MES_REQUETES_DELIVRANCE]
    );

    render(<RouterProvider router={router} />);

    const boutonMenu = screen.getByText(/Saisir requête courrier/i);

    // Open menu
    fireEvent.click(boutonMenu);

    const RDLFC = screen.getByText("Délivrance Livret de famille courrier");

    waitFor(() => {
      expect(RDLFC).toBeDefined();
    });

    // Click sur RDLFC
    fireEvent.click(RDLFC);

    waitFor(() => {
      expect(router.state.location.pathname).toEqual(URL_MES_REQUETES_DELIVRANCE_SAISIR_RDLFC);
    });
  });

  test("renders menu 'Saisir une requête' RDCSC dans Mes requetes de Service", () => {
    const router = createTestingRouter(
      [
        {
          path: URL_REQUETES_DELIVRANCE_SERVICE,
          element: <MenuSaisirRequete indexTabPanel={1} />
        },
        {
          path: URL_REQUETES_DELIVRANCE_SERVICE_SAISIR_RDCSC,
          element: <SaisirRDCSCPage />
        }
      ],
      [URL_REQUETES_DELIVRANCE_SERVICE]
    );

    render(elementAvecContexte(<RouterProvider router={router} />, userDroitnonCOMEDEC));

    const boutonMenu = screen.getByText(/Saisir requête courrier/i);

    // Open menu
    fireEvent.click(boutonMenu);

    const RDCSC = screen.getByText("Délivrance Certificat & Attestation RC/RCA/PACS courrier");

    waitFor(() => {
      expect(RDCSC).toBeDefined();
    });

    // Click Items menu
    fireEvent.click(RDCSC);

    waitFor(() => {
      expect(router.state.location.pathname).toEqual(URL_REQUETES_DELIVRANCE_SERVICE_SAISIR_RDCSC);
    });
  });

  test("renders menu 'Saisir une requête' RDC dans Mes requetes de Service", () => {
    const router = createTestingRouter(
      [
        {
          path: URL_REQUETES_DELIVRANCE_SERVICE,
          element: <MenuSaisirRequete indexTabPanel={1} />
        },
        {
          path: URL_REQUETES_DELIVRANCE_SERVICE_SAISIR_RDC,
          element: <SaisirRDCSCPage />
        }
      ],
      [URL_REQUETES_DELIVRANCE_SERVICE]
    );

    render(<RouterProvider router={router} />);

    const boutonMenu = screen.getByText(/Saisir requête courrier/i);

    // Open menu
    fireEvent.click(boutonMenu);

    const RDC = screen.getByText("Délivrance Extrait/Copie courrier");

    waitFor(() => {
      expect(RDC).toBeDefined();
    });

    // Click sur RDC
    fireEvent.click(RDC);

    waitFor(() => {
      expect(router.state.location.pathname).toEqual(URL_REQUETES_DELIVRANCE_SERVICE_SAISIR_RDC);
    });
  });

  test("renders menu 'Saisir une requête' RDLFC dans Mes requetes de Service", () => {
    const router = createTestingRouter(
      [
        {
          path: URL_REQUETES_DELIVRANCE_SERVICE,
          element: <MenuSaisirRequete indexTabPanel={1} />
        },
        {
          path: URL_REQUETES_DELIVRANCE_SERVICE_SAISIR_RDLFC,
          element: <MenuSaisirRequete indexTabPanel={1} />
        }
      ],
      [URL_REQUETES_DELIVRANCE_SERVICE]
    );

    render(<RouterProvider router={router} />);

    const boutonMenu = screen.getByText(/Saisir requête courrier/i);

    // Open menu
    fireEvent.click(boutonMenu);

    const RDLFC = screen.getByText("Délivrance Livret de famille courrier");

    waitFor(() => {
      expect(RDLFC).toBeDefined();
    });

    // Click sur RDLFC
    fireEvent.click(RDLFC);

    waitFor(() => {
      expect(router.state.location.pathname).toEqual(URL_REQUETES_DELIVRANCE_SERVICE_SAISIR_RDLFC);
    });
  });
});
