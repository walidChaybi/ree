import React from "react";
import { Router } from "react-router-dom";
import {
  FilAriane,
  getUrlFromNPathElements,
  getPathElements,
  buildPagesInfos,
  fildarianeLabel,
  gestionnaireNavigation
} from "../../../../views/common/widget/filAriane/FilAriane";
import { createMemoryHistory } from "history";
import { render, screen, waitFor } from "@testing-library/react";
import {
  URL_MES_REQUETES,
  URL_ACCUEIL,
  URL_MES_REQUETES_ID
} from "../../../../views/router/ReceUrls";
import { routesRece } from "../../../../views/router/ReceRoutes";
import { getUrlWithParam } from "../../../../views/common/util/route/routeUtil";

test("renders composant FilAriane", () => {
  const history = createMemoryHistory();
  history.push(URL_MES_REQUETES);
  render(
    <Router history={history}>
      <FilAriane routes={routesRece} />
    </Router>
  );
  expect(screen.getByLabelText(fildarianeLabel)).toBeInTheDocument();
});

test("renders de 2 éléments du FilAriane", async () => {
  const history = createMemoryHistory();
  history.push(URL_MES_REQUETES);
  render(
    <Router history={history}>
      <FilAriane routes={routesRece} />
    </Router>
  );
  await waitFor(() => {
    const linkElement = screen.getByText(/Accueil/i);
    const textElement = screen.getByText(/Mes requêtes/i);
    expect(linkElement).toBeInTheDocument();
    expect(textElement).toBeInTheDocument();
  });
});

test("renders d'un uudi en dernier élément du FilAriane", () => {
  const history = createMemoryHistory();
  history.push(
    getUrlWithParam(
      URL_MES_REQUETES_ID,
      "/f254f7ef-08ba-4fef-a45f-5f6ed326f36e"
    )
  );

  render(
    <Router history={history}>
      <FilAriane routes={routesRece} />
    </Router>
  );
  const uuidElement = screen.getByText(/Aperçu de requête/i);
  expect(uuidElement).toBeInTheDocument();
});

test("renders de 2 éléments du FilAriane et mise à jour context", () => {
  const history = createMemoryHistory();
  history.push(URL_MES_REQUETES);
  function setRetourContext(retourUrl: string) {
    expect(retourUrl).toBe(URL_ACCUEIL);
  }
  render(
    <Router history={history}>
      <FilAriane routes={routesRece} setRetourState={setRetourContext} />
    </Router>
  );
});

test("renders d'un uudi en dernier élément du FilAriane et maj context", () => {
  const history = createMemoryHistory();
  history.push(
    getUrlWithParam(URL_MES_REQUETES_ID, "f254f7ef-08ba-4fef-a45f-5f6ed326f36e")
  );
  function setRetourContext(retourUrl: string) {
    expect(retourUrl).toBe(URL_MES_REQUETES);
  }
  render(
    <Router history={history}>
      <FilAriane routes={routesRece} setRetourState={setRetourContext} />
    </Router>
  );
});

test("Attendu: getUrlFromNPathElements fonctionne correctement", () => {
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

test("Attendu: getPathElements fonctionne correctement", () => {
  expect(getPathElements("/rece/rece-ui/mesrequetes/apercurequete")).toEqual([
    "mesrequetes",
    "apercurequete"
  ]);
  expect(getPathElements("/rece/rece-ui/")).toEqual([]);
  expect(getPathElements("/rece/rece-ui")).toEqual([]);
  expect(getPathElements("/rece/rece-ui/accueil")).toEqual([]);
  expect(getPathElements("/rece/rece-ui/accueil/")).toEqual([]);
});

test("Attendu: buildPagesInfos fonctionne correctement", () => {
  gestionnaireNavigation.addUrl(
    "/rece/rece-ui/mesrequetes/apercurequete/a8c57b94-b623-4e79-b3a4-08cdf0447623"
  );
  expect(
    buildPagesInfos(
      "/rece/rece-ui/mesrequetes/apercurequete/a8c57b94-b623-4e79-b3a4-08cdf0447623",
      routesRece,
      gestionnaireNavigation
    )
  ).toEqual([
    {
      url: URL_MES_REQUETES,
      libelle: "Mes requêtes",
      derniere: false
    },
    {
      url: `${URL_MES_REQUETES}/apercurequete/a8c57b94-b623-4e79-b3a4-08cdf0447623`,
      libelle: "Aperçu de requête",
      derniere: true
    }
  ]);
});
