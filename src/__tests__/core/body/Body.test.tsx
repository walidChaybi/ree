import { render, screen } from "@testing-library/react";
import { createMemoryHistory } from "history";
import React from "react";
import { Router } from "react-router-dom";
import officier from "../../../mock/data/connectedUser.json";
import { Body } from "../../../views/core/body/Body";
import { OfficierContext } from "../../../views/core/contexts/OfficierContext";
import { URL_ACCUEIL } from "../../../views/router/ReceUrls";

test("renders BoutonDeconnexion", () => {
  const history = createMemoryHistory();
  history.push(URL_ACCUEIL);

  render(
    <Router history={history}>
      <OfficierContext.Provider
        value={{ officierDataState: { idSSO: officier.id_sso, ...officier } }}
      >
        <Body />
      </OfficierContext.Provider>
    </Router>
  );
  const boutonElement = screen.getByText(
    /prenomConnectedUser nomConnectedUser/i
  );
  expect(boutonElement).toBeInTheDocument();
});

test("renders Body", () => {
  const history = createMemoryHistory();
  history.push(URL_ACCUEIL);

  const off = { ...officier };
  off.profils = [...off.profils];
  off.profils.push("RECE_ADMIN");

  render(
    <Router history={history}>
      <OfficierContext.Provider
        value={{
          officierDataState: {
            idSSO: off.id_sso,
            ...off
          }
        }}
      >
        <Body />
      </OfficierContext.Provider>
    </Router>
  );
  const titre = screen.getAllByText(/Accueil/i);
  expect(titre).toHaveLength(2);

  const boutonElement = screen.getAllByText(/Espace délivrance/);
  expect(boutonElement).toHaveLength(1);
});

test("renders Body Connexion en cours", () => {
  const history = createMemoryHistory();
  history.push(URL_ACCUEIL);

  const { getByText } = render(
    <Router history={history}>
      <OfficierContext.Provider
        value={{
          officierDataState: undefined
        }}
      >
        <Body />
      </OfficierContext.Provider>
    </Router>
  );
  const titre = getByText(/Connexion en cours/i);
  expect(titre).toBeInTheDocument();
});

test("renders Body erreurSysteme", () => {
  const history = createMemoryHistory();
  history.push(URL_ACCUEIL);
  const off = { ...officier };
  off.profils = [...off.profils];
  off.profils.push("RECE_ADMIN");
  const { getByText } = render(
    <Router history={history}>
      <OfficierContext.Provider
        value={{
          officierDataState: {
            ...off
          },
          erreurState: {
            status: "Autre (console.error LogManager)"
          }
        }}
      >
        <Body />
      </OfficierContext.Provider>
    </Router>
  );
  const titre = getByText(/Erreur Système/i);
  expect(titre).toBeDefined();
});

test("renders Body 403", () => {
  const history = createMemoryHistory();
  history.push(URL_ACCUEIL);
  const off = { ...officier };

  const { getByText } = render(
    <Router history={history}>
      <OfficierContext.Provider
        value={{
          officierDataState: {
            ...off
          },
          erreurState: {
            status: 403
          }
        }}
      >
        <Body />
      </OfficierContext.Provider>
    </Router>
  );
  const titre = getByText(
    /Vous n'avez pas les droits pour utiliser RECE, veuillez contacter le service BAG/i
  );
  expect(titre).toBeDefined();
});
