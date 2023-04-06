import { Droit } from "@model/agent/enum/Droit";
import { IOfficier } from "@model/agent/IOfficier";
import { URL_REQUETES_DELIVRANCE_SERVICE } from "@router/ReceUrls";
import { RouterComponent } from "@router/RouteComponent";
import { act, render, screen, waitFor } from "@testing-library/react";
import { storeRece } from "@util/storeRece";
import { createMemoryHistory } from "history";
import React from "react";
import { Router } from "react-router-dom";
import mockConnectedUser from "../../mock/data/connectedUser.json";
const u: any = mockConnectedUser;
storeRece.utilisateurCourant = u as IOfficier;

test("L'utilisateur est redirigé vers la page d'accueil car il n'a pa le droit attribuer", async () => {
  storeRece.utilisateurCourant!.habilitations[0].profil.droits = [];
  const history = createMemoryHistory();

  history.push(URL_REQUETES_DELIVRANCE_SERVICE);
  act(() => {
    render(
      <Router history={history}>
        <RouterComponent />
      </Router>
    );
  });
  await waitFor(() => {
    expect(screen.getByText(/Accueil/)).toBeInTheDocument();
  });
});

test("L'utilisateur accède à la page 'Espace délivrance' car il a le droit attribuer", async () => {
  storeRece.utilisateurCourant!.habilitations[0].profil.droits[0] = {
    idDroit: "d12345",
    nom: Droit.ATTRIBUER
  };
  const history = createMemoryHistory();

  history.push(URL_REQUETES_DELIVRANCE_SERVICE);
  act(() => {
    render(
      <Router history={history}>
        <RouterComponent />
      </Router>
    );
  });
  await waitFor(() => {
    expect(screen.getByText(/Délivrance/)).toBeInTheDocument();
  });
});

test("L'utilisateur esasye d'accéder à la page 'Page qui n'existe pas', il est redirigé vers une page d'erreur ", async () => {
  storeRece.utilisateurCourant!.habilitations[0].profil.droits[0] = {
    idDroit: "d12345",
    nom: Droit.ATTRIBUER
  };
  const history = createMemoryHistory();
  history.push("url_page_existe_pas");
  act(() => {
    render(
      <Router history={history}>
        <RouterComponent />
      </Router>
    );
  });
  await waitFor(() => {
    const txt = screen.getByText(/Bienvenu/);
    expect(txt).toBeInTheDocument();
  });
});


