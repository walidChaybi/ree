import React from "react";
import * as renderer from "react-test-renderer";
import { Router } from "react-router-dom";
import { FilAriane } from "../FilAriane";
import { createMemoryHistory } from "history";
import { render, screen, waitFor } from "@testing-library/react";
import { AppUrls } from "../../../../router/UrlManager";

test("renders composant FilAriane", () => {
  const history = createMemoryHistory();
  history.push(AppUrls.ctxMesRequetesUrl);
  const component = renderer.create(
    <Router history={history}>
      <FilAriane />
    </Router>
  );
  expect(component.toJSON()).toMatchSnapshot();
});

test("renders de 2 éléments du FilAriane", async () => {
  const history = createMemoryHistory();
  history.push(AppUrls.ctxMesRequetesUrl);
  render(
    <Router history={history}>
      <FilAriane />
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
    AppUrls.ctxMesRequetesUrl + "/f254f7ef-08ba-4fef-a45f-5f6ed326f36e"
  );

  render(
    <Router history={history}>
      <FilAriane />
    </Router>
  );
  const uuidElement = screen.getByText(/Aperçu de requête/i);
  expect(uuidElement).toBeInTheDocument();
});

test("renders de 2 éléments du FilAriane et mise à jour context", () => {
  const history = createMemoryHistory();
  history.push(AppUrls.ctxMesRequetesUrl);
  function setRetourContext(retourUrl: string) {
    expect(retourUrl).toBe(AppUrls.ctxAccueilUrl);
  }
  render(
    <Router history={history}>
      <FilAriane setRetourState={setRetourContext} />
    </Router>
  );
});

test("renders d'un uudi en dernier élément du FilAriane et maj context", () => {
  const history = createMemoryHistory();
  history.push(
    AppUrls.ctxMesRequetesUrl + "/f254f7ef-08ba-4fef-a45f-5f6ed326f36e"
  );
  function setRetourContext(retourUrl: string) {
    expect(retourUrl).toBe(AppUrls.ctxMesRequetesUrl);
  }
  render(
    <Router history={history}>
      <FilAriane setRetourState={setRetourContext} />
    </Router>
  );
});
