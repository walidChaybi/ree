import { OfficierContext } from "@core/contexts/OfficierContext";
import officier from "@mock/data/connectedUser.json";
import { ApercuReqInfoPage } from "@pages/requeteInformation/apercuRequeteInformation/ApercuReqInfoPage";
import EspaceInformationPage from "@pages/requeteInformation/espaceInformation/EspaceReqInfoPage";
import {
  URL_MES_REQUETES_APERCU_REQ_INFORMATION_ID,
  URL_MES_REQUETES_INFORMATION
} from "@router/ReceUrls";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { getUrlWithParam } from "@util/route/UrlUtil";
import { RouterProvider } from "react-router-dom";
import { createTestingRouter } from "../../../../__tests__utils__/testsUtil";

test("renders Page requete information et clique sur une TRANSFEREE", async () => {
  const router = createTestingRouter(
    [
      {
        path: URL_MES_REQUETES_INFORMATION,
        element: (
          <OfficierContext.Provider
            value={{
              officierDataState: { idSSO: officier.id_sso, ...officier }
            }}
          >
            <EspaceInformationPage />
          </OfficierContext.Provider>
        )
      },
      {
        path: getUrlWithParam(
          URL_MES_REQUETES_APERCU_REQ_INFORMATION_ID,
          "0b7a1f7b-b4f1-4163-8a81-e5adf53cbf62"
        ),
        element: <ApercuReqInfoPage />
      }
    ],
    [URL_MES_REQUETES_INFORMATION]
  );

  render(<RouterProvider router={router} />);

  const titreNumero = screen.getByText("N° requête");
  const pageSuivante = screen.getByTitle("Page suivante");

  await waitFor(() => {
    expect(pageSuivante).toBeDefined();
    expect(titreNumero).toBeDefined();
    expect(screen.getByText("EVIPG4")).toBeDefined();
    expect(screen.getByText("EVIPG5")).toBeDefined();
    expect(screen.getByText("NOM1 p1")).toBeDefined();
    expect(screen.getByText("NOM2 p1")).toBeDefined();
  });

  // Clic sur une ligne
  fireEvent.click(screen.getByText("EVIPG4"));

  await waitFor(() => {
    expect(router.state.location.pathname).toBe(
      getUrlWithParam(
        URL_MES_REQUETES_APERCU_REQ_INFORMATION_ID,
        "0b7a1f7b-b4f1-4163-8a81-e5adf53cbf62"
      )
    );
  });
});

test("renders Requête Service Info, Clic requête au statut PRISE_EN_CHARGE", async () => {
  const router = createTestingRouter(
    [
      {
        path: URL_MES_REQUETES_INFORMATION,
        element: (
          <OfficierContext.Provider
            value={{
              officierDataState: { idSSO: officier.id_sso, ...officier }
            }}
          >
            <EspaceInformationPage />
          </OfficierContext.Provider>
        )
      },

      {
        path: URL_MES_REQUETES_APERCU_REQ_INFORMATION_ID,
        element: <ApercuReqInfoPage />
      }
    ],
    [URL_MES_REQUETES_INFORMATION]
  );

  render(<RouterProvider router={router} />);

  await waitFor(() => {
    expect(screen.getByText("EVIPG5")).toBeInTheDocument();
  });

  // Clic sur une ligne
  fireEvent.click(screen.getByText("EVIPG5"));

  await waitFor(() => {
    expect(router.state.location.pathname).toBe(
      getUrlWithParam(
        URL_MES_REQUETES_APERCU_REQ_INFORMATION_ID,
        "0b7a1f7b-b4f1-4163-8a81-e5adf53cbf63"
      )
    );
  });
});
