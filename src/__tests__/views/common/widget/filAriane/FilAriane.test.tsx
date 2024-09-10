import { ApercuRequetePage } from "@pages/requeteDelivrance/apercuRequete/apercuRequete/ApercuRequetePage";
import { routesRece } from "@router/ReceRoutes";
import {
  URL_MES_REQUETES_CREATION,
  URL_MES_REQUETES_CREATION_ETABLISSEMENT_APERCU_REQUETE_SIMPLE_ID,
  URL_MES_REQUETES_DELIVRANCE,
  URL_MES_REQUETES_DELIVRANCE_APERCU_REQUETE_ID
} from "@router/ReceUrls";
import { render, screen, waitFor } from "@testing-library/react";
import { getUrlWithParam } from "@util/route/UrlUtil";
import {
  FilAriane,
  buildPagesInfos,
  fildarianeLabel,
  gestionnaireNavigation,
  getPathElements,
  getUrlFromNPathElements
} from "@widget/filAriane/FilAriane";
import { RouterProvider } from "react-router-dom";
import { expect, test } from "vitest";
import { createTestingRouter } from "../../../../__tests__utils__/testsUtil";

test("renders composant FilAriane.", () => {
  const router = createTestingRouter(
    [
      {
        path: URL_MES_REQUETES_DELIVRANCE,
        element: <FilAriane routes={routesRece} />
      }
    ],
    [URL_MES_REQUETES_DELIVRANCE]
  );

  render(<RouterProvider router={router} />);

  expect(screen.getByLabelText(fildarianeLabel)).toBeDefined();
});

test("renders de 2 éléments du FilAriane.", () => {
  const router = createTestingRouter(
    [
      {
        path: URL_MES_REQUETES_DELIVRANCE,
        element: <FilAriane routes={routesRece} />
      }
    ],
    [URL_MES_REQUETES_DELIVRANCE]
  );

  render(<RouterProvider router={router} />);

  waitFor(() => {
    const linkElement = screen.getByText(/Accueil/i);
    const textElement = screen.getByText(/Mes requêtes/i);
    expect(linkElement).toBeDefined();
    expect(textElement).toBeDefined();
  });
});

test("renders d'un uudi en dernier élément du FilAriane.", () => {
  // ici on utilise la creation plutot que la delivrance
  const router = createTestingRouter(
    [
      {
        path: URL_MES_REQUETES_CREATION,
        element: <FilAriane routes={routesRece} />
      },
      {
        path: URL_MES_REQUETES_CREATION_ETABLISSEMENT_APERCU_REQUETE_SIMPLE_ID,
        element: <FilAriane routes={routesRece} />
      }
    ],
    [
      URL_MES_REQUETES_CREATION,
      getUrlWithParam(
        URL_MES_REQUETES_CREATION_ETABLISSEMENT_APERCU_REQUETE_SIMPLE_ID,
        "3ed9aa4e-921b-489f-b8fe-531dd703c60c"
      )
    ]
  );

  render(<RouterProvider router={router} />);

  waitFor(() => {
    const uuidElement = screen.getAllByText(/Aperçu de requête/i)[0];
    expect(uuidElement).toBeDefined();
  });
});

test("renders de 2 éléments du FilAriane et mise à jour context.", () => {
  const router = createTestingRouter(
    [
      {
        path: URL_MES_REQUETES_DELIVRANCE,
        element: <FilAriane routes={routesRece} />
      }
    ],
    [URL_MES_REQUETES_DELIVRANCE]
  );

  render(<RouterProvider router={router} />);
});
test("renders d'un uudi en dernier élément du FilAriane et maj context.", () => {
  const router = createTestingRouter(
    [
      {
        path: URL_MES_REQUETES_DELIVRANCE,
        element: <FilAriane routes={routesRece} />
      },
      {
        path: getUrlWithParam(
          URL_MES_REQUETES_DELIVRANCE_APERCU_REQUETE_ID,
          "f254f7ef-08ba-4fef-a45f-5f6ed326f36e"
        ),
        element: <ApercuRequetePage />
      }
    ],
    [
      getUrlWithParam(
        URL_MES_REQUETES_DELIVRANCE_APERCU_REQUETE_ID,
        "f254f7ef-08ba-4fef-a45f-5f6ed326f36e"
      )
    ]
  );
  render(<RouterProvider router={router} />);
});

test("Attendu: getUrlFromNPathElements fonctionne correctement.", () => {
  expect(getUrlFromNPathElements(["p1"], 0)).toBe("/rece/rece-ui/p1");
  expect(getUrlFromNPathElements(["p1", "p2"], 0)).toBe("/rece/rece-ui/p1");
  expect(getUrlFromNPathElements(["p1", "p2"], 1)).toBe("/rece/rece-ui/p1/p2");
  expect(getUrlFromNPathElements(["p1", "p2", "p3"], 0)).toBe(
    "/rece/rece-ui/p1"
  );
  expect(getUrlFromNPathElements(["p1", "p2", "p3"], 1)).toBe(
    "/rece/rece-ui/p1/p2"
  );
  expect(getUrlFromNPathElements(["p1", "p2", "p3"], 2)).toBe(
    "/rece/rece-ui/p1/p2/p3"
  );
});

test("Attendu: getPathElements fonctionne correctement.", () => {
  expect(
    getPathElements("/rece/rece-ui/mesrequetes/apercurequetedelivrance")
  ).toEqual(["mesrequetes", "apercurequetedelivrance"]);
  expect(getPathElements("/rece/rece-ui/")).toEqual([]);
  expect(getPathElements("/rece/rece-ui")).toEqual([]);
});

test("Attendu: buildPagesInfos fonctionne correctement.", () => {
  gestionnaireNavigation.addUrl(
    "/rece/rece-ui/mesrequetes/apercurequetedelivrance/a8c57b94-b623-4e79-b3a4-08cdf0447623"
  );
  expect(
    buildPagesInfos(
      "/rece/rece-ui/mesrequetes/apercurequetedelivrance/a8c57b94-b623-4e79-b3a4-08cdf0447623",
      routesRece,
      gestionnaireNavigation
    )
  ).toEqual([
    {
      url: URL_MES_REQUETES_DELIVRANCE,
      libelle: "Mes requêtes de délivrance",
      derniere: false
    },
    {
      url: `${URL_MES_REQUETES_DELIVRANCE}/apercurequetedelivrance/a8c57b94-b623-4e79-b3a4-08cdf0447623`,
      libelle: "Aperçu de requête",
      derniere: true
    }
  ]);
});
