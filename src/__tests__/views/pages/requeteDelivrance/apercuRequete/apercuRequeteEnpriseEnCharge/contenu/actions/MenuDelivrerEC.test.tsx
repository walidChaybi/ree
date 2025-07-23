import ResultatRMCInscription from "@model/rmc/acteInscription/resultat/ResultatRMCInscription";
import { MenuDelivrerEC } from "@pages/requeteDelivrance/apercuRequete/apercuRequeteEnpriseEnCharge/contenu/actions/MenuDelivrerEC";
import { URL_MES_REQUETES_DELIVRANCE_APERCU_REQUETE_PRISE_EN_CHARGE_ID } from "@router/ReceUrls";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { getUrlWithParam } from "@util/route/UrlUtil";
import { RouterProvider } from "react-router";
import { expect, test } from "vitest";
import { createTestingRouter } from "../../../../../../../__tests__utils__/testsUtil";
import { MOCK_RESULTAT_RMC_INSCRIPTION_RCA } from "../../../../../../../mock/data/RMCInscription";
import { idRequeteRDC, requeteRDC } from "../../../../../../../mock/data/requeteDelivrance";

test("renders du bloc Menu Delivrer pour une requête de délivrance de sous-type RDD", () => {
  const router = createTestingRouter(
    [
      {
        path: URL_MES_REQUETES_DELIVRANCE_APERCU_REQUETE_PRISE_EN_CHARGE_ID,
        element: (
          <MenuDelivrerEC
            requete={requeteRDC}
            inscriptions={[ResultatRMCInscription.depuisDto(MOCK_RESULTAT_RMC_INSCRIPTION_RCA)!]}
          />
        )
      }
    ],
    [getUrlWithParam(URL_MES_REQUETES_DELIVRANCE_APERCU_REQUETE_PRISE_EN_CHARGE_ID, idRequeteRDC)]
  );

  render(<RouterProvider router={router} />);

  waitFor(() => {
    expect(screen.getByText("Délivrer")).toBeDefined();
    expect(screen.getByText(/Copie intégrale/i)).toBeDefined();
    expect(screen.getByText(/Extrait avec filiation/i)).toBeDefined();
    expect(screen.getByText(/Extrait sans filiation/i)).toBeDefined();
    expect(screen.getByText(/Extrait plurilingue/i)).toBeDefined();
    expect(screen.getByText(/Copie archive \(118\)/i)).toBeDefined();
  });

  fireEvent.click(screen.getByText(/Copie intégrale/i));

  waitFor(() => {
    expect(screen.getByRole("dialog")).toBeDefined();
  });
});
