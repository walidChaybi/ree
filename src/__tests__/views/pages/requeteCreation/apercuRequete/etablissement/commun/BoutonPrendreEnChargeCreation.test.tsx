import { userDroitCreerActeEtabliPerimetreMEAE } from "@mock/data/connectedUserAvecDroit";
import { requeteCreationATraiter } from "@mock/data/requeteCreation";
import { BoutonPrendreEnChargeCreation } from "@pages/requeteCreation/apercuRequete/etablissement/commun/BoutonPrendreEnChargeCreation";
import {
  URL_MES_REQUETES_CREATION_ETABLISSEMENT_APERCU_REQUETE_SIMPLE_ID,
  URL_MES_REQUETES_CREATION_ETABLISSEMENT_APERCU_SUIVI_DOSSIER_ID
} from "@router/ReceUrls";
import { act, fireEvent, render, waitFor } from "@testing-library/react";
import { getUrlWithParam } from "@util/route/UrlUtil";
import { storeRece } from "@util/storeRece";
import { RouterProvider } from "react-router-dom";
import { createTestingRouter } from "../../../../../../__tests__utils__/testsUtil";

test("DOIT rediriger sur l'appercu prise en charge QUAND on clique sur le bouton prendre en charge", async () => {
  storeRece.utilisateurCourant = userDroitCreerActeEtabliPerimetreMEAE;
  const ID = "54ddf213-d9b7-4747-8e92-68c220f66de3";
  await act(async () => {
    const router = createTestingRouter(
      [
        {
          path: URL_MES_REQUETES_CREATION_ETABLISSEMENT_APERCU_REQUETE_SIMPLE_ID,
          element: (
            <BoutonPrendreEnChargeCreation
              requete={requeteCreationATraiter}
            ></BoutonPrendreEnChargeCreation>
          )
        }
      ],
      [
        getUrlWithParam(
          URL_MES_REQUETES_CREATION_ETABLISSEMENT_APERCU_REQUETE_SIMPLE_ID,
          ID
        )
      ]
    );

    const { getByText } = render(<RouterProvider router={router} />);

    const bouttonPrendreEnCharge = getByText(
      "Prendre en charge"
    ) as HTMLButtonElement;

    await waitFor(() => {
      expect(bouttonPrendreEnCharge.disabled).toBeFalsy();
    });

    fireEvent.click(bouttonPrendreEnCharge);

    setTimeout(() => {
      act(() => {
        waitFor(() => {
          expect(router.state.location.pathname).toBe(
            getUrlWithParam(
              URL_MES_REQUETES_CREATION_ETABLISSEMENT_APERCU_SUIVI_DOSSIER_ID,
              ID
            )
          );
        });
      });
    }, 0);
  });
});