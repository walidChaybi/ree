import { Body } from "@core/body/Body";
import { OfficierContext } from "@core/contexts/OfficierContext";
import officier from "@mock/data/connectedUser.json";
import { URL_ACCUEIL } from "@router/ReceUrls";
import { act, render, screen, waitFor } from "@testing-library/react";
import { storeRece } from "@util/storeRece";
import { createMemoryHistory } from "history";
import React from "react";
import { Router } from "react-router-dom";
test("renders BoutonDeconnexion", async () => {
  const history = createMemoryHistory();
  history.push(URL_ACCUEIL);

  act(() => {
    render(
      <Router history={history}>
        <OfficierContext.Provider
          value={{ officierDataState: { idSSO: officier.id_sso, ...officier } }}
        >
          <Body />
        </OfficierContext.Provider>
      </Router>
    );
  });

  await waitFor(() => {
    const boutonElement = screen.getByText(
      /prenomConnectedUser nomConnectedUser/i
    );
    expect(boutonElement).toBeInTheDocument();
  });
});

test("renders Body", async () => {
  const history = createMemoryHistory();
  history.push(URL_ACCUEIL);

  const off = { ...officier };
  off.profils = [...off.profils];
  off.profils.push("RECE_ADMIN");

  act(() => {
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
  });

  await waitFor(() => {
    const titre = screen.getAllByText(/Accueil/i);
    expect(titre).toHaveLength(2);

    const boutonElement = screen.getAllByText("Délivrance");
    expect(boutonElement).toHaveLength(1);
  });
});

test("renders Body Connexion en cours", () => {
  const history = createMemoryHistory();
  history.push(URL_ACCUEIL);

  act(() => {
    render(
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
  });
  const titre = screen.getByText(/Connexion en cours/i);
  expect(titre).toBeInTheDocument();
});

test("renders Body erreurSysteme", () => {
  storeRece.logErrorOff = true;
  const history = createMemoryHistory();
  history.push(URL_ACCUEIL);
  const off = { ...officier };
  off.profils = [...off.profils];
  off.profils.push("RECE_ADMIN");
  act(() => {
    render(
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
  });
  const titre = screen.getByText(/Erreur Système/i);
  expect(titre).toBeDefined();
  storeRece.logErrorOff = false;
});

test("renders Body 403", () => {
  const history = createMemoryHistory();
  history.push(URL_ACCUEIL);
  const off = { ...officier };

  act(() => {
    render(
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
  });
  const titre = screen.getByText(
    /Vous n'avez pas les droits pour utiliser RECE, veuillez contacter le service BIMO/i
  );
  expect(titre).toBeDefined();
});
