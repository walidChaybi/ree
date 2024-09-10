import EspaceDelivrancePage from "@pages/requeteDelivrance/espaceDelivrance/EspaceDelivrancePage";
import { ApercuReqInfoPage } from "@pages/requeteInformation/apercuRequeteInformation/ApercuReqInfoPage";
import {
  URL_MES_REQUETES_APERCU_REQ_INFORMATION_ID,
  URL_MES_REQUETES_DELIVRANCE
} from "@router/ReceUrls";
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor
} from "@testing-library/react";
import { getUrlWithParam } from "@util/route/UrlUtil";
import { RouterProvider } from "react-router-dom";
import { expect, test } from "vitest";
import { createTestingRouter } from "../../../../__tests__utils__/testsUtil";

test("clique requete liée", async () => {
  const nouvelleFenetreSpy = vi.spyOn(window, "open");

  const router = createTestingRouter(
    [
      {
        path: URL_MES_REQUETES_APERCU_REQ_INFORMATION_ID,
        element: <ApercuReqInfoPage />
      },
      {
        path: URL_MES_REQUETES_DELIVRANCE,
        element: <EspaceDelivrancePage />
      }
    ],
    [
      getUrlWithParam(
        URL_MES_REQUETES_APERCU_REQ_INFORMATION_ID,
        "bbd05aed-8ea9-45ba-a7d7-b8d55ad10856"
      )
    ]
  );

  await act(async () => {
    render(<RouterProvider router={router} />);
  });

  const valeurRequeteLiee = screen.getByText(/LRU1A5/i);

  await waitFor(() => {
    expect(valeurRequeteLiee).toBeDefined();
  });

  fireEvent.click(valeurRequeteLiee);

  await waitFor(() => {
    expect(nouvelleFenetreSpy).toHaveBeenCalled();
  });

  nouvelleFenetreSpy.mockRestore();
});
