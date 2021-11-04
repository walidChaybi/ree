import { render } from "@testing-library/react";
import { createMemoryHistory } from "history";
import React from "react";
import { Router } from "react-router-dom";
import {
  DataRMCRequeteAvecResultat,
  DataTableauRequete
} from "../../../../../mock/data/RMCRequete";
import { RMCTableauRequetesAssociees } from "../../../../../views/pages/rechercheMultiCriteres/autoRequetes/resultats/RMCTableauRequetesAssociees";

const history = createMemoryHistory();
history.push("");

test("renders Resultat Recherche requêtes associées aux titulaires => Avec résultat", () => {
  const { getAllByText } = render(
    <Router history={history}>
      <RMCTableauRequetesAssociees
        dataRMCRequete={DataRMCRequeteAvecResultat}
        dataTableauRMCRequete={DataTableauRequete}
        setRangeRequete={jest.fn()}
        setNouvelleRMCRequete={jest.fn()}
        setValuesRMCRequete={jest.fn()}
        setCriteresRechercheRequete={jest.fn()}
        resetTableauRequete={true}
      />
    </Router>
  );

  const sousType1 = getAllByText("RCEDXR");
  expect(sousType1).toHaveLength(2);
  const sousType2 = getAllByText("RDCSD");
  expect(sousType2).toHaveLength(1);
  const sousType3 = getAllByText("Complétion requête en cours");
  expect(sousType3).toHaveLength(1);
  const sousType4 = getAllByText("RMAC");
  expect(sousType4).toHaveLength(1);
});

test("renders Resultat Recherche requêtes associées aux titulaires => Sans résultat", () => {
  const { getByText } = render(
    <Router history={history}>
      <RMCTableauRequetesAssociees
        dataRMCRequete={[]}
        dataTableauRMCRequete={{}}
        setRangeRequete={jest.fn()}
        setNouvelleRMCRequete={jest.fn()}
        setValuesRMCRequete={jest.fn()}
        setCriteresRechercheRequete={jest.fn()}
        resetTableauRequete={true}
      />
    </Router>
  );

  expect(getByText("Aucune requête n'a été trouvée")).toBeDefined();
});
