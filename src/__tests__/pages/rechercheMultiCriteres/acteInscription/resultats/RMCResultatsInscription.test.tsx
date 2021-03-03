import React from "react";
import { render, act, screen, fireEvent } from "@testing-library/react";
import { RMCResultatsInscription } from "../../../../../views/pages/rechercheMultiCriteres/acteInscription/resultats/RMCResultatsInscription";
import {
  DataRMCInscriptionAvecResultat,
  DataTableauInscription
} from "../../../../../mock/data/RMCInscription";

test("renders Resultat Inscription Recherche Multi Critères => Avec résultat", () => {
  render(
    <RMCResultatsInscription
      dataRMCInscription={DataRMCInscriptionAvecResultat}
      dataTableauRMCInscription={DataTableauInscription}
    />
  );

  const rose = screen.getAllByText("ROSE");
  expect(rose).toHaveLength(5);
});

test("Navigation dans les pages du tableau Resultat Inscription Recherche Multi Critères => Avec résultat", () => {
  render(
    <RMCResultatsInscription
      dataRMCInscription={DataRMCInscriptionAvecResultat}
      dataTableauRMCInscription={DataTableauInscription}
    />
  );

  const nbElementPage1 = screen.getAllByText("ROSE");
  expect(nbElementPage1).toHaveLength(5);

  const changementPageSuivantes = screen.getByTitle("Page suivante");
  fireEvent.click(changementPageSuivantes);

  const nbElementPage2 = screen.getAllByText("ROSE");
  expect(nbElementPage2).toHaveLength(1);
});

test("Ouverture d'une inscription", async () => {
  global.open = () => {
    return { ...window };
  };
  global.close = jest.fn();

  const { getByTestId } = render(
    <RMCResultatsInscription
      dataRMCInscription={DataRMCInscriptionAvecResultat}
      dataTableauRMCInscription={DataTableauInscription}
    />
  );

  const ligne = getByTestId("85160d6e-893b-47c2-a9a8-b25573189f0c");

  act(() => {
    fireEvent.click(ligne);
  });
});
