import { IQueryParametersPourRequetes } from "@api/appels/requeteApi";
import { ApercuReqInfoPage } from "@pages/requeteInformation/apercuRequeteInformation/ApercuReqInfoPage";
import { StatutsRequetesInformation } from "@pages/requeteInformation/espaceInformation/EspaceReqInfoParams";
import { ReqInfoServicePage } from "@pages/requeteInformation/espaceInformation/ReqInfoServicePage";
import { URL_REQUETES_INFORMATION_SERVICE, URL_REQUETES_INFORMATION_SERVICE_APERCU_REQUETE_ID } from "@router/ReceUrls";
import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { getUrlWithParam } from "@util/route/UrlUtil";
import { NB_LIGNES_PAR_APPEL_DEFAUT } from "@widget/tableau/TableauRece/TableauPaginationConstantes";
import { RouterProvider } from "react-router";
import { expect, test } from "vitest";
import { createTestingRouter } from "../../../../__tests__utils__/testsUtil";
import MockRECEContextProvider from "../../../../mock/context/MockRECEContextProvider";

const parametresReqInfo = {
  statuts: StatutsRequetesInformation,
  tri: "dateCreation",
  sens: "ASC",
  range: `0-${NB_LIGNES_PAR_APPEL_DEFAUT}`
} as IQueryParametersPourRequetes;

const routerAvecContexte = (router: any): any => {
  return (
    <MockRECEContextProvider>
      <RouterProvider router={router} />
    </MockRECEContextProvider>
  );
};

test("renders Requête Service Info, Clic requête au statut TRANSFEREE", async () => {
  const router = createTestingRouter(
    [
      {
        path: URL_REQUETES_INFORMATION_SERVICE,
        element: <ReqInfoServicePage parametresReqInfo={parametresReqInfo} />
      },
      {
        path: getUrlWithParam(URL_REQUETES_INFORMATION_SERVICE_APERCU_REQUETE_ID, "0b7a1f7b-b4f1-4163-8a81-e5adf53cbf62"),
        element: <ApercuReqInfoPage />
      }
    ],
    [URL_REQUETES_INFORMATION_SERVICE]
  );

  render(routerAvecContexte(router));

  act(() => {
    fireEvent.click(screen.getByTestId("loupeBouton"));
  });

  await waitFor(() => {
    expect(screen.getByTitle("Page suivante")).toBeDefined();
    expect(screen.getByText("N° requête")).toBeDefined();
    expect(screen.getByText("EVIPG4")).toBeDefined();
    expect(screen.getByText("EVIPG5")).toBeDefined();
    expect(screen.getByText("NOM1 p1")).toBeDefined();
    expect(screen.getByText("NOM2 p1")).toBeDefined();
  });

  // Clic sur une ligne
  fireEvent.click(screen.getByText("EVIPG4"));

  await waitFor(() => {
    expect(router.state.location.pathname).toBe(
      getUrlWithParam(URL_REQUETES_INFORMATION_SERVICE_APERCU_REQUETE_ID, "0b7a1f7b-b4f1-4163-8a81-e5adf53cbf62")
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
        path: getUrlWithParam(URL_REQUETES_INFORMATION_SERVICE_APERCU_REQUETE_ID, "0b7a1f7b-b4f1-4163-8a81-e5adf53cbf63"),
        element: <ApercuReqInfoPage />
      }
    ],
    [URL_REQUETES_INFORMATION_SERVICE]
  );
  render(routerAvecContexte(router));

  act(() => {
    fireEvent.click(screen.getByTestId("loupeBouton"));
  });

  await waitFor(() => {
    expect(screen.getByText("EVIPG5")).toBeDefined();
  });

  // Clic sur une ligne
  fireEvent.click(screen.getByText("EVIPG5"));

  await waitFor(() => {
    expect(router.state.location.pathname).toBe(
      getUrlWithParam(URL_REQUETES_INFORMATION_SERVICE_APERCU_REQUETE_ID, "0b7a1f7b-b4f1-4163-8a81-e5adf53cbf63")
    );
  });
});

test("DOIT mettre a jour la liste des requetes QUAND on change le filtre 'Sous-Type'", async () => {
  const router = createTestingRouter(
    [
      {
        path: URL_REQUETES_INFORMATION_SERVICE,
        element: <ReqInfoServicePage parametresReqInfo={parametresReqInfo} />
      },
      {
        path: getUrlWithParam(URL_REQUETES_INFORMATION_SERVICE_APERCU_REQUETE_ID, "0b7a1f7b-b4f1-4163-8a81-e5adf53cbf63"),
        element: <ApercuReqInfoPage />
      }
    ],
    [URL_REQUETES_INFORMATION_SERVICE]
  );
  render(routerAvecContexte(router));

  act(() => {
    fireEvent.change(screen.getByTestId("sousType"), {
      target: {
        value: "INFORMATION"
      }
    });
  });

  act(() => {
    fireEvent.click(screen.getByTestId("loupeBouton"));
  });

  await waitFor(() => {
    expect(screen.getByText("AZERTY1")).toBeDefined();
    expect(screen.getByText("AZERTY2")).toBeDefined();
    expect(screen.getByText("AZERTY3")).toBeDefined();
  });
});

test("DOIT mettre a jour la liste des requetes QUAND on change le filtre 'Objet'", async () => {
  const router = createTestingRouter(
    [
      {
        path: URL_REQUETES_INFORMATION_SERVICE,
        element: <ReqInfoServicePage parametresReqInfo={parametresReqInfo} />
      },
      {
        path: getUrlWithParam(URL_REQUETES_INFORMATION_SERVICE_APERCU_REQUETE_ID, "0b7a1f7b-b4f1-4163-8a81-e5adf53cbf63"),
        element: <ApercuReqInfoPage />
      }
    ],
    [URL_REQUETES_INFORMATION_SERVICE]
  );
  render(routerAvecContexte(router));

  act(() => {
    fireEvent.change(screen.getByTestId("objet"), {
      target: {
        value: "DEMANDE_COPIE_ACTE"
      }
    });
  });

  act(() => {
    fireEvent.click(screen.getByTestId("loupeBouton"));
  });

  await waitFor(() => {
    expect(screen.getByText("AZERTY123")).toBeDefined();
    expect(screen.getByText("AZERTY456")).toBeDefined();
    expect(screen.getByText("AZERTY789")).toBeDefined();
    expect(screen.getByText("URANUS")).toBeDefined();
  });
});

test("DOIT mettre a jour la liste des requetes QUAND on change le filtre 'Statut'", async () => {
  const router = createTestingRouter(
    [
      {
        path: URL_REQUETES_INFORMATION_SERVICE,
        element: <ReqInfoServicePage parametresReqInfo={parametresReqInfo} />
      },
      {
        path: getUrlWithParam(URL_REQUETES_INFORMATION_SERVICE_APERCU_REQUETE_ID, "0b7a1f7b-b4f1-4163-8a81-e5adf53cbf63"),
        element: <ApercuReqInfoPage />
      }
    ],
    [URL_REQUETES_INFORMATION_SERVICE]
  );
  render(routerAvecContexte(router));

  act(() => {
    fireEvent.change(screen.getByTestId("statut"), {
      target: {
        value: "PRISE_EN_CHARGE"
      }
    });
  });

  act(() => {
    fireEvent.click(screen.getByTestId("loupeBouton"));
  });

  await waitFor(() => {
    expect(screen.getByText("EMANUMERLE1")).toBeDefined();
    expect(screen.getByText("EMANUMERLE2")).toBeDefined();
    expect(screen.getByText("EMANUMERLE3")).toBeDefined();
    expect(screen.getByText("EMANUMERLE4")).toBeDefined();
  });
});

test("DOIT mettre a jour la liste des requetes QUAND on change le filtre 'typeRequerant'", async () => {
  const router = createTestingRouter(
    [
      {
        path: URL_REQUETES_INFORMATION_SERVICE,
        element: <ReqInfoServicePage parametresReqInfo={parametresReqInfo} />
      },
      {
        path: getUrlWithParam(URL_REQUETES_INFORMATION_SERVICE_APERCU_REQUETE_ID, "0b7a1f7b-b4f1-4163-8a81-e5adf53cbf63"),
        element: <ApercuReqInfoPage />
      }
    ],
    [URL_REQUETES_INFORMATION_SERVICE]
  );
  render(routerAvecContexte(router));

  act(() => {
    fireEvent.change(screen.getByTestId("typeRequerant"), {
      target: {
        value: "AVOCAT"
      }
    });
  });

  act(() => {
    fireEvent.click(screen.getByTestId("loupeBouton"));
  });

  await waitFor(() => {
    expect(screen.getByText("AVOCAT1")).toBeDefined();
    expect(screen.getByText("AVOCAT2")).toBeDefined();
    expect(screen.getByText("AVOCAT3")).toBeDefined();
    expect(screen.getByText("AVOCAT4")).toBeDefined();
  });
});
