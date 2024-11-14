import { ApercuRequeteEtablissementSuiviDossierPage } from "@pages/requeteCreation/apercuRequete/etablissement/apercuPriseEnCharge/ApercuRequeteEtablissementSuiviDossierPage";
import {
  PATH_APERCU_REQ_ETABLISSEMENT_SUIVI_DOSSIER,
  URL_MES_REQUETES_CREATION,
  URL_MES_REQUETES_CREATION_ETABLISSEMENT_APERCU_SUIVI_DOSSIER_ID
} from "@router/ReceUrls";
import { render, screen, waitFor } from "@testing-library/react";
import { getUrlWithParam } from "@util/route/UrlUtil";
import { RouterProvider } from "react-router-dom";
import { describe, expect, test } from "vitest";
import { createTestingRouter } from "../../../../../../__tests__utils__/testsUtil";

describe("Test de la page Aperçu requête etablissement suivi dossier", () => {
  test("DOIT afficher les onglets avec pièce justificative active QUAND on arrive sur la page", () => {
    afficherPageRequeteCreationEtablissment();

    waitFor(() => {
      expect(screen.getByText("Pièces justificatives / Annexes")).toBeDefined();
      expect(screen.getByText("RMC")).toBeDefined();
      expect(
        screen.getByText("Suivi dossier").getAttribute("aria-selected")
      ).toBe("true");
      expect(screen.getByText("Echanges")).toBeDefined();
    });
  });
});

function afficherPageRequeteCreationEtablissment() {
  const router = createTestingRouter(
    [
      {
        path: URL_MES_REQUETES_CREATION_ETABLISSEMENT_APERCU_SUIVI_DOSSIER_ID,
        element: <ApercuRequeteEtablissementSuiviDossierPage />
      }
    ],
    [
      getUrlWithParam(
        `${URL_MES_REQUETES_CREATION}/${PATH_APERCU_REQ_ETABLISSEMENT_SUIVI_DOSSIER}/:idRequete`,
        "3ed9aa4e-921b-489f-b8fe-531dd703c60c"
      )
    ]
  );

  render(<RouterProvider router={router} />);
}
