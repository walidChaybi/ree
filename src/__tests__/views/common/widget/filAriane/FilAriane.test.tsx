import { routesRece } from "@router/ReceRoutes";
import {
  URL_ACCUEIL,
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
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";

const setIsDirty = (isDirty = false) => {};

test("renders composant FilAriane", () => {
  const history = createMemoryHistory();
  history.push(URL_MES_REQUETES_DELIVRANCE);
  render(
    <Router history={history}>
      <FilAriane
        routes={routesRece}
        isDirty={false}
        setIsDirty={function (isDirty: boolean): void {
          throw new Error("Function not implemented.");
        }}
      />
    </Router>
  );
  expect(screen.getByLabelText(fildarianeLabel)).toBeInTheDocument();
});

test("renders de 2 éléments du FilAriane", async () => {
  const history = createMemoryHistory();
  history.push(URL_MES_REQUETES_DELIVRANCE);
  render(
    <Router history={history}>
      <FilAriane routes={routesRece} isDirty={false} setIsDirty={setIsDirty} />
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
      URL_MES_REQUETES_DELIVRANCE_APERCU_REQUETE_ID,
      "/f254f7ef-08ba-4fef-a45f-5f6ed326f36e"
    )
  );

  render(
    <Router history={history}>
      <FilAriane routes={routesRece} isDirty={false} setIsDirty={setIsDirty} />
    </Router>
  );
  const uuidElement = screen.getByText(/Aperçu de requête/i);
  expect(uuidElement).toBeInTheDocument();
});

test("renders de 2 éléments du FilAriane et mise à jour context", () => {
  const history = createMemoryHistory();
  history.push(URL_MES_REQUETES_DELIVRANCE);
  function setRetourContext(retourUrl: string) {
    expect(retourUrl).toBe(URL_ACCUEIL);
  }
  render(
    <Router history={history}>
      <FilAriane
        routes={routesRece}
        setRetourState={setRetourContext}
        isDirty={false}
        setIsDirty={setIsDirty}
      />
    </Router>
  );
});

test("renders d'un uudi en dernier élément du FilAriane et maj context", () => {
  const history = createMemoryHistory();
  history.push(
    getUrlWithParam(
      URL_MES_REQUETES_DELIVRANCE_APERCU_REQUETE_ID,
      "f254f7ef-08ba-4fef-a45f-5f6ed326f36e"
    )
  );
  function setRetourContext(retourUrl: string) {
    expect(retourUrl).toBe(URL_MES_REQUETES_DELIVRANCE);
  }
  render(
    <Router history={history}>
      <FilAriane
        routes={routesRece}
        setRetourState={setRetourContext}
        isDirty={false}
        setIsDirty={setIsDirty}
      />
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
  expect(
    getPathElements("/rece/rece-ui/mesrequetes/apercurequetedelivrance")
  ).toEqual(["mesrequetes", "apercurequetedelivrance"]);
  expect(getPathElements("/rece/rece-ui/")).toEqual([]);
  expect(getPathElements("/rece/rece-ui")).toEqual([]);
  expect(getPathElements("/rece/rece-ui/accueil")).toEqual([]);
  expect(getPathElements("/rece/rece-ui/accueil/")).toEqual([]);
});

test("Attendu: buildPagesInfos fonctionne correctement", () => {
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
