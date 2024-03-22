import { IQueryParametersPourRequetes } from "@api/appels/requeteApi";
import { ApercuReqInfoPage } from "@pages/requeteInformation/apercuRequeteInformation/ApercuReqInfoPage";
import { StatutsRequetesInformation } from "@pages/requeteInformation/espaceInformation/EspaceReqInfoParams";
import { ReqInfoServicePage } from "@pages/requeteInformation/espaceInformation/ReqInfoServicePage";
import {
  URL_REQUETES_INFORMATION_SERVICE,
  URL_REQUETES_INFORMATION_SERVICE_APERCU_REQUETE_ID
} from "@router/ReceUrls";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { getUrlWithParam } from "@util/route/UrlUtil";
import { NB_LIGNES_PAR_APPEL_DEFAUT } from "@widget/tableau/TableauRece/TableauPaginationConstantes";
import { RouterProvider } from "react-router-dom";
import { createTestingRouter } from "../../../../__tests__utils__/testsUtil";

const parametresReqInfo = {
  statuts: StatutsRequetesInformation,
  tri: "dateCreation",
  sens: "ASC",
  range: `0-${NB_LIGNES_PAR_APPEL_DEFAUT}`
} as IQueryParametersPourRequetes;

test("renders Requête Service Info, Clic requête au statut TRANSFEREE", async () => {
  const router = createTestingRouter(
    [
      {
        path: URL_REQUETES_INFORMATION_SERVICE,
        element: <ReqInfoServicePage parametresReqInfo={parametresReqInfo} />
      },
      {
        path: getUrlWithParam(
          URL_REQUETES_INFORMATION_SERVICE_APERCU_REQUETE_ID,
          "0b7a1f7b-b4f1-4163-8a81-e5adf53cbf62"
        ),
        element: <ApercuReqInfoPage />
      }
    ],
    [URL_REQUETES_INFORMATION_SERVICE]
  );

  render(<RouterProvider router={router} />);

  await waitFor(() => {
    expect(screen.getByTitle("Page suivante")).toBeInTheDocument();
    expect(screen.getByText("N° requête")).toBeInTheDocument();
    expect(screen.getByText("EVIPG4")).toBeInTheDocument();
    expect(screen.getByText("EVIPG5")).toBeInTheDocument();
    expect(screen.getByText("NOM1 p1")).toBeInTheDocument();
    expect(screen.getByText("NOM2 p1")).toBeInTheDocument();
  });

  // Clic sur une ligne
  fireEvent.click(screen.getByText("EVIPG4"));

  await waitFor(() => {
    expect(router.state.location.pathname).toBe(
      getUrlWithParam(
        URL_REQUETES_INFORMATION_SERVICE_APERCU_REQUETE_ID,
        "0b7a1f7b-b4f1-4163-8a81-e5adf53cbf62"
      )
    );
  });
});

test("renders Requête Service Info, Clic requête au statut PRISE_EN_CHARGE", async () => {
  const router = createTestingRouter(
    [
      {
        path: URL_REQUETES_INFORMATION_SERVICE,
        element: <ReqInfoServicePage parametresReqInfo={parametresReqInfo} />
      },
      {
        path: getUrlWithParam(
          URL_REQUETES_INFORMATION_SERVICE_APERCU_REQUETE_ID,
          "0b7a1f7b-b4f1-4163-8a81-e5adf53cbf63"
        ),
        element: <ApercuReqInfoPage />
      }
    ],
    [URL_REQUETES_INFORMATION_SERVICE]
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
        URL_REQUETES_INFORMATION_SERVICE_APERCU_REQUETE_ID,
        "0b7a1f7b-b4f1-4163-8a81-e5adf53cbf63"
      )
    );
  });
});


