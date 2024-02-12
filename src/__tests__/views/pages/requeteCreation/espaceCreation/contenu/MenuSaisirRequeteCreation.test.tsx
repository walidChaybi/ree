import MenuSaisirRequeteCreation from "@pages/requeteCreation/espaceCreation/contenu/MenuSaisirRequeteCreation";
import {
  URL_LES_REQUETE_CREATION_SERVICE,
  URL_MES_REQUETES_CREATION,
  URL_MES_REQUETES_CREATION_SAISIR_RCTC,
  URL_REQUETES_CREATION_SERVICE_SAISIR_RCTC
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
import React from "react";
import { RouterProvider } from "react-router-dom";
import { createTestingRouter } from "../../../../../__tests__utils__/testsUtil";

window.alert = jest.fn();
test("DOIT rendre le menu pour saisir une requete de creation transcription", async () => {
  act(async () => {
    const router = createTestingRouter(
      [
        {
          path: URL_MES_REQUETES_CREATION,
          element: <MenuSaisirRequeteCreation indexTabPanel={0} />
        }
      ],
      [URL_MES_REQUETES_CREATION]
    );

    render(<RouterProvider router={router} />);

    expect(
      gestionnaireFeatureFlag.estActif(FeatureFlag.FF_DELIV_EC_PAC)
    ).toBeTruthy();

    const boutonMenu = screen.getByText(/Saisir requête courrier/i);

    // Open menu
    await act(async () => {
      fireEvent.click(boutonMenu);
    });

    const RCTC = screen.getByText("Création suite Transcription Courrier");

    await waitFor(() => {
      expect(RCTC).toBeDefined();
    });

    await act(async () => {
      fireEvent.click(RCTC);
    });

    await waitFor(() => {
      expect(router.state.location.pathname).toEqual(
        URL_MES_REQUETES_CREATION_SAISIR_RCTC
      );
    });
  });
});

test("DOIT rendre le menu pour saisir une requete de creation transcription sur Mes Requete Service", async () => {
  act(async () => {
    const router = createTestingRouter(
      [
        {
          path: `/${URL_LES_REQUETE_CREATION_SERVICE}`,
          element: <MenuSaisirRequeteCreation indexTabPanel={1} />
        }
      ],
      [`/${URL_LES_REQUETE_CREATION_SERVICE}`]
    );

    render(<RouterProvider router={router} />);

    expect(
      gestionnaireFeatureFlag.estActif(FeatureFlag.FF_DELIV_EC_PAC)
    ).toBeTruthy();

    const boutonMenu = screen.getByText(/Saisir requête courrier/i);

    await act(async () => {
      fireEvent.click(boutonMenu);
    });

    const RCTC = screen.getByText("Création suite Transcription Courrier");

    await waitFor(() => {
      expect(RCTC).toBeDefined();
    });

    await act(async () => {
      fireEvent.click(RCTC);
    });

    await waitFor(() => {
      expect(router.state.location.pathname).toEqual(
        URL_REQUETES_CREATION_SERVICE_SAISIR_RCTC
      );
    });
  });
});
