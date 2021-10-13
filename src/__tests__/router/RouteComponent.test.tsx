import { render, waitFor } from "@testing-library/react";
import { createMemoryHistory } from "history";
import React from "react";
import { Router } from "react-router-dom";
import mockConnectedUser from "../../mock/data/connectedUser.json";
import { IOfficier } from "../../model/agent/IOfficier";
import { Droit } from "../../model/Droit";
import { storeRece } from "../../views/common/util/storeRece";
import { URL_REQUETES_SERVICE } from "../../views/router/ReceUrls";
import { RouterComponent } from "../../views/router/RouteComponent";

const u: any = mockConnectedUser;
storeRece.utilisateurCourant = u as IOfficier;

test("L'utilisateur est redirigé vers la page d'accueil car il n'a pa le droit attribuer", () => {
  storeRece.utilisateurCourant!.habilitations[0].profil.droits = [];
  const history = createMemoryHistory();
  history.push(URL_REQUETES_SERVICE);
  const { getByText } = render(
    <Router history={history}>
      <RouterComponent />
    </Router>
  );
  expect(getByText(/Accueil/)).toBeInTheDocument();
});

test("L'utilisateur accède à la page 'Espace délivrance' car il a le droit attribuer", () => {
  storeRece.utilisateurCourant!.habilitations[0].profil.droits[0] = {
    idDroit: "d12345",
    nom: Droit.ATTRIBUER
  };
  const history = createMemoryHistory();
  history.push(URL_REQUETES_SERVICE);
  const { getByText } = render(
    <Router history={history}>
      <RouterComponent />
    </Router>
  );
  expect(getByText(/Espace délivrance/)).toBeInTheDocument();
});

test("L'utilisateur esasye d'accéder à la page 'Page qui n'existe pas', il est redirigé vers une page d'erreur ", async () => {
  storeRece.utilisateurCourant!.habilitations[0].profil.droits[0] = {
    idDroit: "d12345",
    nom: Droit.ATTRIBUER
  };
  const history = createMemoryHistory();
  history.push("url_page_existe_pas");
  const { getByText } = render(
    <Router history={history}>
      <RouterComponent />
    </Router>
  );
  await waitFor(() => {
    const txt = getByText(/Bienvenu/);
    expect(txt).toBeInTheDocument();
  });
});
