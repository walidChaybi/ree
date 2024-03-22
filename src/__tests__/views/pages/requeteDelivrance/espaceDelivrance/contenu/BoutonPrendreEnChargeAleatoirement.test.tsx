import { mappingOfficier } from "@core/login/LoginHook";
import {
  resultatHeaderUtilistateurLaurenceBourdeau,
  resultatRequeteUtilistateurLaurenceBourdeau
} from "@mock/data/connectedUserAvecDroit";
import { ReponseAppelMesRequetes } from "@mock/data/EspaceDelivrance";
import { ApercuRequeteEtablissementSuiviDossierPage } from "@pages/requeteCreation/apercuRequete/etablissement/apercuPriseEnCharge/ApercuRequeteEtablissementSuiviDossierPage";
import { BoutonPrendreEnChargeAleatoirement } from "@pages/requeteDelivrance/espaceDelivrance/contenu/BoutonPrendreEnChargeAleatoirement";
import {
  URL_MES_REQUETES_DELIVRANCE,
  URL_MES_REQUETES_DELIVRANCE_APERCU_REQUETE_PRISE_EN_CHARGE_ID
} from "@router/ReceUrls";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { getUrlWithParam } from "@util/route/UrlUtil";
import { storeRece } from "@util/storeRece";
import { RouterProvider } from "react-router-dom";
import { createTestingRouter } from "../../../../../__tests__utils__/testsUtil";

test("Attendu: BoutonPrendreEnChargeAleatoirement fonctionne correctement dans l'espace Délivrance", async () => {
  storeRece.utilisateurCourant = mappingOfficier(
    resultatHeaderUtilistateurLaurenceBourdeau,
    resultatRequeteUtilistateurLaurenceBourdeau.data
  );

  const router = createTestingRouter(
    [
      {
        path: URL_MES_REQUETES_DELIVRANCE,
        element: <BoutonPrendreEnChargeAleatoirement />
      },
      {
        path: getUrlWithParam(
          URL_MES_REQUETES_DELIVRANCE_APERCU_REQUETE_PRISE_EN_CHARGE_ID,
          ReponseAppelMesRequetes[1].id
        ),
        element: <ApercuRequeteEtablissementSuiviDossierPage />
      }
    ],
    [URL_MES_REQUETES_DELIVRANCE]
  );

  render(<RouterProvider router={router} />);

  const bouttonPrendreEnCharge = screen.getByText(
    /Prendre en charge/i
  ) as HTMLButtonElement;

  fireEvent.click(bouttonPrendreEnCharge);

  await waitFor(() => {
    expect(router.state.location.pathname).toBe(
      getUrlWithParam(
        URL_MES_REQUETES_DELIVRANCE_APERCU_REQUETE_PRISE_EN_CHARGE_ID,
        ReponseAppelMesRequetes[1].id
      )
    );
  });
});
