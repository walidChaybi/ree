import MockRECEContextProvider from "@mock/context/MockRECEContextProvider";
import { LISTE_UTILISATEURS } from "@mock/data/ListeUtilisateurs";
import { ApercuRequetePage } from "@pages/requeteDelivrance/apercuRequete/apercuRequete/ApercuRequetePage";
import { URL_MES_REQUETES_DELIVRANCE_APERCU_REQUETE_ID } from "@router/ReceUrls";
import { act, render, screen, waitFor } from "@testing-library/react";
import { getUrlWithParam } from "@util/route/UrlUtil";
import { RouterProvider } from "react-router-dom";
import { beforeAll, expect, test } from "vitest";
import {
  createTestingRouter,
  mockFenetreFicheTestFunctions
} from "../../../../../__tests__utils__/testsUtil";

beforeAll(() => {
  mockFenetreFicheTestFunctions();
});

const routerAvecContexte = (router: any): any => {
  return (
    <MockRECEContextProvider utilisateurs={LISTE_UTILISATEURS}>
      <RouterProvider router={router} />
    </MockRECEContextProvider>
  );
};

test("DOIT afficher un loader TANT QUE la requete n'est pas encore chargée.", () => {
  const router = createTestingRouter(
    [
      {
        path: URL_MES_REQUETES_DELIVRANCE_APERCU_REQUETE_ID,
        element: <ApercuRequetePage />
      }
    ],
    [
      getUrlWithParam(
        URL_MES_REQUETES_DELIVRANCE_APERCU_REQUETE_ID,
        "a4cefb71-8457-4f6b-937e-34b49335d404"
      )
    ]
  );

  const { container } = render(routerAvecContexte(router));

  waitFor(() => {
    expect(
      container.getElementsByClassName("OperationLocaleEnCoursSimple").length
    ).toBe(1);
  });

  waitFor(() => {
    expect(
      container.getElementsByClassName("OperationLocaleEnCoursSimple").length
    ).toBe(0);
  });
});

test("renders ApercuRequetePage", async () => {
  const router = createTestingRouter(
    [
      {
        path: URL_MES_REQUETES_DELIVRANCE_APERCU_REQUETE_ID,
        element: <ApercuRequetePage />
      }
    ],
    [
      getUrlWithParam(
        URL_MES_REQUETES_DELIVRANCE_APERCU_REQUETE_ID,
        "a4cefb71-8457-4f6b-937e-34b49335d404"
      )
    ]
  );
  // "await act..." obligatoire pour reussir a rendre l'ui
  await act(() => {
    render(routerAvecContexte(router));
  });

  const bandeau = screen.getByText(
    /Requête à traiter, attribuée à Ashley YOUNG - Le : 14\/07\/2020/i
  );
  const actions = screen.getByText(/Suivi requête/i);

  const listeAction1 = screen.getByText(
    /Saisie de la requête - 10\/03\/2020 - APP/i
  );
  const listeAction2 = screen.getByText(/À traiter - 10\/03\/2020 - BOB/i);

  const listeObservation1 = screen.getByText(
    /C'est vraiment dur de pouvo... - 02\/01\/1970/i
  );
  const listeObservation2 = screen.getByText(
    /Je fais pas 30 charactères - 02\/01\/1970 - BOB/i
  );

  await waitFor(() => {
    expect(document.title).toBe("Aperçu de la requête");
    expect(bandeau).toBeDefined();
    expect(actions).toBeDefined();
    expect(listeAction1).toBeDefined();
    expect(listeAction2).toBeDefined();
    expect(listeObservation1).toBeDefined();
    expect(listeObservation2).toBeDefined();
  });
});
