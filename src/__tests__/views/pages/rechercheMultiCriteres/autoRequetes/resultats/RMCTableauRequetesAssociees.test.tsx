import {
  DataRMCRequeteAvecResultat,
  DataTableauRequete
} from "@mock/data/RMCRequete";
import { RMCTableauRequetesAssociees } from "@pages/rechercheMultiCriteres/autoRequetes/resultats/RMCTableauRequetesAssociees";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

test("renders Resultat Recherche requêtes associées aux titulaires => Avec résultat", () => {
  const { getAllByText } = render(
    <MemoryRouter>
      <RMCTableauRequetesAssociees
        dataRMCRequete={DataRMCRequeteAvecResultat}
        dataTableauRMCRequete={DataTableauRequete}
        setRangeRequete={jest.fn()}
        setNouvelleRMCRequete={jest.fn()}
        setValuesRMCRequete={jest.fn()}
        setCriteresRechercheRequete={jest.fn()}
        resetTableauRequete={true}
      />
    </MemoryRouter>
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
    <MemoryRouter>
      <RMCTableauRequetesAssociees
        dataRMCRequete={[]}
        dataTableauRMCRequete={{}}
        setRangeRequete={jest.fn()}
        setNouvelleRMCRequete={jest.fn()}
        setValuesRMCRequete={jest.fn()}
        setCriteresRechercheRequete={jest.fn()}
        resetTableauRequete={true}
      />
    </MemoryRouter>
  );

  expect(getByText("Aucune requête n'a été trouvée.")).toBeDefined();
});
