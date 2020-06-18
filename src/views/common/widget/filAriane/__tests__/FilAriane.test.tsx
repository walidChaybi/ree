import React from "react";
import * as renderer from "react-test-renderer";
import { Router } from "react-router-dom";
import { FilAriane } from "../FilAriane";
import { createMemoryHistory } from "history";
import { render } from "@testing-library/react";
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

test("renders de 2 éléments du FilAriane", () => {
  const history = createMemoryHistory();
  history.push(AppUrls.ctxMesRequetesUrl);
  const { getByText } = render(
    <Router history={history}>
      <FilAriane />
    </Router>
  );
  setTimeout(() => {
    const linkElement = getByText(/Accueil/i);
    const textElement = getByText(/Mes requêtes/i);
    expect(linkElement).toBeInTheDocument();
    expect(textElement).toBeInTheDocument();
  }, 75);
});

test("renders d'un uudi en dernier élément du FilAriane", () => {
  const history = createMemoryHistory();
  history.push(
    AppUrls.ctxMesRequetesUrl + "/f254f7ef-08ba-4fef-a45f-5f6ed326f36e"
  );

  const { getByText } = render(
    <Router history={history}>
      <FilAriane />
    </Router>
  );
  const uuidElement = getByText(/Aperçu de requête/i);
  expect(uuidElement).toBeInTheDocument();
});
