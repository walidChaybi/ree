import { fireEvent, render } from "@testing-library/react";
import React from "react";
import { act } from "react-dom/test-utils";
import {
  DataRMCRequeteAvecResultat,
  DataTableauRequete,
  DataTableauRequeteVide
} from "../../../../../mock/data/RMCRequete";
import { RMCRequeteResultats } from "../../../../../views/pages/rechercheMultiCriteres/requete/resultats/RMCRequeteResultats";

test("renders Resultat Acte Recherche Multi Critères => Avec résultat", () => {
  const { getAllByText } = render(
    <RMCRequeteResultats
      dataRMCRequete={DataRMCRequeteAvecResultat}
      dataTableauRMCRequete={DataTableauRequete}
    />
  );

  const numero1 = getAllByText("1234");
  expect(numero1).toHaveLength(1);
  const numero2 = getAllByText("2090860");
  expect(numero2).toHaveLength(1);
  const numero3 = getAllByText("9876");
  expect(numero3).toHaveLength(1);
  const numero4 = getAllByText("9012");
  expect(numero4).toHaveLength(1);
});

test("renders Resultat Acte Recherche Multi Critères => DataTableauRequete vide", () => {
  const { getAllByText } = render(
    <RMCRequeteResultats
      dataRMCRequete={DataRMCRequeteAvecResultat}
      dataTableauRMCRequete={DataTableauRequeteVide}
    />
  );

  const numero1 = getAllByText("1234");
  expect(numero1).toHaveLength(1);
  const numero2 = getAllByText("2090860");
  expect(numero2).toHaveLength(1);
  const numero3 = getAllByText("9876");
  expect(numero3).toHaveLength(1);
  const numero4 = getAllByText("9012");
  expect(numero4).toHaveLength(1);
});

test("Ouverture d'une inscription", async () => {
  global.open = () => {
    return { ...window };
  };
  global.close = jest.fn();

  const { getByTestId } = render(
    <RMCRequeteResultats
      dataRMCRequete={DataRMCRequeteAvecResultat}
      dataTableauRMCRequete={DataTableauRequete}
    />
  );

  const ligne = getByTestId("8ef11b8b-652c-4c6a-ad27-a544fce635d0");

  act(() => {
    fireEvent.click(ligne);
  });
});
