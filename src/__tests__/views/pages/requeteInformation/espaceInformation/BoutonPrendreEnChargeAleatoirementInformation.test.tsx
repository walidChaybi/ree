import { ReponseMesRequetesInformation } from "@mock/data/EspaceInformation";
import { ApercuReqInfoPage } from "@pages/requeteInformation/apercuRequeteInformation/ApercuReqInfoPage";
import { BoutonPrendreEnChargeAleatoirementInformation } from "@pages/requeteInformation/espaceInformation/BoutonPrendreEnChargeAleatoirementInformation";
import {
  URL_MES_REQUETES_APERCU_REQ_INFORMATION_ID,
  URL_MES_REQUETES_INFORMATION
} from "@router/ReceUrls";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { getUrlWithParam } from "@util/route/UrlUtil";
import { RouterProvider } from "react-router-dom";
import { expect, test } from "vitest";
import { createTestingRouter } from "../../../../__tests__utils__/testsUtil";

test("Attendu: BoutonPrendreEnChargeAleatoirement fonctionne correctement dans l'espace Information", async () => {
  const router = createTestingRouter(
    [
      {
        path: URL_MES_REQUETES_INFORMATION,
        element: <BoutonPrendreEnChargeAleatoirementInformation />
      },
      {
        path: getUrlWithParam(
          URL_MES_REQUETES_APERCU_REQ_INFORMATION_ID,
          ReponseMesRequetesInformation[1].id
        ),
        element: <ApercuReqInfoPage />
      }
    ],
    [URL_MES_REQUETES_INFORMATION]
  );

  render(<RouterProvider router={router} />);

  const bouttonPrendreEnCharge = screen.getByText(
    /Prendre en charge/i
  ) as HTMLButtonElement;

  fireEvent.click(bouttonPrendreEnCharge);

  await waitFor(() => {
    expect(router.state.location.pathname).toBe(
      getUrlWithParam(
        URL_MES_REQUETES_APERCU_REQ_INFORMATION_ID,
        ReponseMesRequetesInformation[1].id
      )
    );
  });
});
