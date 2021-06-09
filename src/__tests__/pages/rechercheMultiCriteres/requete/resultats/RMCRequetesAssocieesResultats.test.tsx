import { render, screen } from "@testing-library/react";
import { createMemoryHistory } from "history";
import React from "react";
import { Router } from "react-router-dom";
import {
  DataRMCRequeteAvecResultat,
  DataTableauRequete
} from "../../../../../mock/data/RMCRequete";
import { RMCRequetesAssocieesResultats } from "../../../../../views/pages/rechercheMultiCriteres/autoRequetes/resultats/RMCRequetesAssocieesResultats";

test("renders Fielset Recherche Requêtes associées aux titulaires", () => {
  const history = createMemoryHistory();
  history.push("");

  render(
    <Router history={history}>
      <RMCRequetesAssocieesResultats
        dataRMCAutoRequete={DataRMCRequeteAvecResultat}
        dataTableauRMCAutoRequete={DataTableauRequete}
      />
    </Router>
  );

  expect(screen.getByText("Requêtes associées aux titulaires")).toBeDefined();
});
