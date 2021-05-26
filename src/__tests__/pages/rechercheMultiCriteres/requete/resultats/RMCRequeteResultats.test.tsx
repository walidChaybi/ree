import { render, screen } from "@testing-library/react";
import { createMemoryHistory } from "history";
import React from "react";
import { Router } from "react-router-dom";
import {
  DataRMCRequeteAvecResultat,
  DataTableauRequete
} from "../../../../../mock/data/RMCRequete";
import { RMCRequeteResultats } from "../../../../../views/pages/rechercheMultiCriteres/requete/resultats/RMCRequeteResultats";
import { URL_RECHERCHE_REQUETE } from "../../../../../views/router/ReceUrls";

test("renders Fielset Recherche Multi Critères Requêtes", () => {
  const history = createMemoryHistory();
  history.push(URL_RECHERCHE_REQUETE);

  const { container } = render(
    <Router history={history}>
      <RMCRequeteResultats
        dataRMCRequete={DataRMCRequeteAvecResultat}
        dataTableauRMCRequete={DataTableauRequete}
      />
    </Router>
  );

  const titre = container.getElementsByClassName("Titre").item(0)
    ?.firstElementChild?.innerHTML;
  expect(titre).toEqual("Résultats de la recherche multi-critères");

  expect(screen.getByText(/Liste des requêtes/i)).toBeDefined();
});
