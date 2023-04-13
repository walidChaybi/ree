import {
  DataRMCRequeteAvecResultat,
  DataTableauRequete
} from "@mock/data/RMCRequete";
import { RMCRequeteResultats } from "@pages/rechercheMultiCriteres/requete/resultats/RMCRequeteResultats";
import { URL_RECHERCHE_REQUETE } from "@router/ReceUrls";
import { render, screen } from "@testing-library/react";
import { createMemoryHistory } from "history";
import React from "react";
import { Router } from "react-router-dom";

test("renders Fielset Recherche Multi Critères Requêtes", () => {
  const history = createMemoryHistory();
  history.push(URL_RECHERCHE_REQUETE);

  const { container } = render(
    <Router history={history}>
      <RMCRequeteResultats
        dataRMCRequete={DataRMCRequeteAvecResultat}
        dataTableauRMCRequete={DataTableauRequete}
        setRangeRequete={jest.fn()}
        resetRMC={true}
      />
    </Router>
  );

  const titre = container.getElementsByClassName("Titre").item(0)
    ?.firstElementChild?.innerHTML;
  expect(titre).toEqual("Résultats de la recherche multi-critères");

  expect(screen.getByText(/Liste des requêtes/i)).toBeDefined();
});
