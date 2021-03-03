import React from "react";
import { render, fireEvent, act } from "@testing-library/react";
import { RMCResultatsActe } from "../../../../../views/pages/rechercheMultiCriteres/acteInscription/resultats/RMCResultatsActe";
import {
  DataRMCActeAvecResultat,
  DataTableauActe
} from "../../../../../mock/data/RMCActe";

test("renders Resultat Acte Recherche Multi Critères => Avec résultat", () => {
  const { getAllByText } = render(
    <RMCResultatsActe
      dataRMCActe={DataRMCActeAvecResultat}
      dataTableauRMCActe={DataTableauActe}
    />
  );

  const rose = getAllByText("ROSE");
  expect(rose).toHaveLength(2);
});

test("Ouverture d'un acte", () => {
  global.open = () => {
    return { ...window };
  };
  global.close = jest.fn();

  const { getByTestId } = render(
    <RMCResultatsActe
      dataRMCActe={DataRMCActeAvecResultat}
      dataTableauRMCActe={DataTableauActe}
    />
  );

  const ligne = getByTestId("d8708d77-a359-4553-be72-1eb5f246d4da");

  act(() => {
    fireEvent.click(ligne);
  });
});
