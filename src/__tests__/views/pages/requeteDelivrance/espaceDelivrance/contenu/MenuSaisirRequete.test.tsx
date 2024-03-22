import { userDroitnonCOMEDEC } from "@mock/data/connectedUserAvecDroit";
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
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor
} from "@testing-library/react";
import { FeatureFlag } from "@util/featureFlag/FeatureFlag";
import { gestionnaireFeatureFlag } from "@util/featureFlag/gestionnaireFeatureFlag";
import { storeRece } from "@util/storeRece";
import { RouterProvider } from "react-router-dom";
import { createTestingRouter } from "../../../../../__tests__utils__/testsUtil";

window.alert = jest.fn();

test("renders menu 'Saisir une requête' RDCSC dans Mes requetes de Délivrance", async () => {
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

  await act(async () => {
    render(<RouterProvider router={router} />);
  });

  expect(
    gestionnaireFeatureFlag.estActif(FeatureFlag.FF_DELIV_EC_PAC)
  ).toBeTruthy();

  const boutonMenu = screen.getByText(/Saisir requête courrier/i);

  // Open menu
  await act(async () => {
    fireEvent.click(boutonMenu);
  });

  const RDCSC = screen.getByText(
    "Délivrance Certificat & Attestation RC/RCA/PACS courrier"
  );

  await waitFor(() => {
    expect(RDCSC).toBeDefined();
  });

  // Click sur RDCSC
  await act(async () => {
    fireEvent.click(RDCSC);
  });

  await waitFor(() => {
    expect(router.state.location.pathname).toEqual(
      URL_MES_REQUETES_DELIVRANCE_SAISIR_RDCSC
    );
  });
});

test("renders menu 'Saisir une requête' RDC dans Mes requetes de Délivrance", async () => {
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

  await act(async () => {
    render(<RouterProvider router={router} />);
  });

  const boutonMenu = screen.getByText(/Saisir requête courrier/i);

  // Open menu
  await act(async () => {
    fireEvent.click(boutonMenu);
  });

  const RDC = screen.getByText("Délivrance Extrait/Copie courrier");

  await waitFor(() => {
    expect(RDC).toBeDefined();
  });

  // Click sur RDC
  await act(async () => {
    fireEvent.click(RDC);
  });

  await waitFor(() => {
    expect(router.state.location.pathname).toEqual(
      URL_MES_REQUETES_DELIVRANCE_SAISIR_RDC
    );
  });
});

test("renders menu 'Saisir une requête' RDLFC dans Mes requetes de Délivrance", async () => {
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

  await act(async () => {
    render(<RouterProvider router={router} />);
  });
  const boutonMenu = screen.getByText(/Saisir requête courrier/i);

  // Open menu
  await act(async () => {
    fireEvent.click(boutonMenu);
  });

  const RDLFC = screen.getByText("Délivrance Livret de famille courrier");

  await waitFor(() => {
    expect(RDLFC).toBeDefined();
  });

  // Click sur RDLFC
  await act(async () => {
    fireEvent.click(RDLFC);
  });

  await waitFor(() => {
    expect(router.state.location.pathname).toEqual(
      URL_MES_REQUETES_DELIVRANCE_SAISIR_RDLFC
    );
  });
});

test("renders menu 'Saisir une requête' RDCSC dans Mes requetes de Service", async () => {
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

  await act(async () => {
    render(<RouterProvider router={router} />);
  });
  storeRece.utilisateurCourant = userDroitnonCOMEDEC;

  const boutonMenu = screen.getByText(/Saisir requête courrier/i);

  // Open menu
  await act(async () => {
    fireEvent.click(boutonMenu);
  });

  const RDCSC = screen.getByText(
    "Délivrance Certificat & Attestation RC/RCA/PACS courrier"
  );

  await waitFor(() => {
    expect(RDCSC).toBeDefined();
  });

  // Click Items menu
  await act(async () => {
    fireEvent.click(RDCSC);
  });

  await waitFor(() => {
    expect(router.state.location.pathname).toEqual(
      URL_REQUETES_DELIVRANCE_SERVICE_SAISIR_RDCSC
    );
  });
});

test("renders menu 'Saisir une requête' RDC dans Mes requetes de Service", async () => {
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

  await act(async () => {
    render(<RouterProvider router={router} />);
  });

  const boutonMenu = screen.getByText(/Saisir requête courrier/i);

  // Open menu
  await act(async () => {
    fireEvent.click(boutonMenu);
  });

  const RDC = screen.getByText("Délivrance Extrait/Copie courrier");

  await waitFor(() => {
    expect(RDC).toBeDefined();
  });

  // Click sur RDC
  await act(async () => {
    fireEvent.click(RDC);
  });

  await waitFor(() => {
    expect(router.state.location.pathname).toEqual(
      URL_REQUETES_DELIVRANCE_SERVICE_SAISIR_RDC
    );
  });
});

test("renders menu 'Saisir une requête' RDLFC dans Mes requetes de Service", async () => {
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

  await act(async () => {
    render(<RouterProvider router={router} />);
  });

  const boutonMenu = screen.getByText(/Saisir requête courrier/i);

  // Open menu
  await act(async () => {
    fireEvent.click(boutonMenu);
  });

  const RDLFC = screen.getByText("Délivrance Livret de famille courrier");

  await waitFor(() => {
    expect(RDLFC).toBeDefined();
  });

  // Click sur RDLFC
  await act(async () => {
    fireEvent.click(RDLFC);
  });

  await waitFor(() => {
    expect(router.state.location.pathname).toEqual(
      URL_REQUETES_DELIVRANCE_SERVICE_SAISIR_RDLFC
    );
  });
});
