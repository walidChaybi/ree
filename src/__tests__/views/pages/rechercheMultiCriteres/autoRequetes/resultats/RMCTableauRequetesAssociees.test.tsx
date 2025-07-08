import RequeteAssociee, { TRequeteAssociee } from "@model/rmc/requete/RequeteAssociee";
import { RMCTableauRequetesAssociees } from "@pages/rechercheMultiCriteres/autoRequetes/resultats/RMCTableauRequetesAssociees";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { expect, test, vi } from "vitest";
import { DataRMCRequeteAvecResultat, DataTableauRequete } from "../../../../../mock/data/RMCRequete";

test("renders Resultat Recherche requêtes associées aux titulaires => Avec résultat", () => {
  const { getAllByText } = render(
    <MemoryRouter>
      <RMCTableauRequetesAssociees
        dataRMCRequete={DataRMCRequeteAvecResultat.map(RequeteAssociee.depuisDto).filter(
          (requete): requete is TRequeteAssociee => requete !== null
        )}
        dataTableauRMCRequete={DataTableauRequete}
        setRangeRequete={vi.fn()}
        setValuesRMCRequete={vi.fn()}
        setCriteresRechercheRequete={vi.fn()}
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
        setRangeRequete={vi.fn()}
        setValuesRMCRequete={vi.fn()}
        setCriteresRechercheRequete={vi.fn()}
      />
    </MemoryRouter>
  );

  expect(getByText("Aucune requête n'a été trouvée.")).toBeDefined();
});
