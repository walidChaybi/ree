import React from "react";
import { createMemoryHistory } from "history";
import {
  URL_REQUETES_SERVICE,
  URL_MES_REQUETES_ID,
  URL_MES_REQUETES
} from "../../views/router/ReceUrls";
import { render } from "@testing-library/react";
import { RouterComponent } from "../../views/router/RouteComponent";
import { Router } from "react-router-dom";
import { screen } from "@testing-library/react";
import mockConnectedUser from "../../mock/data/connectedUser.json";
import { IOfficierSSOApi } from "../../model/IOfficierSSOApi";
import { storeRece } from "../../views/common/util/storeRece";
import { Droit } from "../../model/Droit";

const u: any = mockConnectedUser;
storeRece.utilisateurCourant = u as IOfficierSSOApi;

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
