import { RMCActeArchiveResultats } from "@pages/rechercheMultiCriteres/acteArchive/resultats/RMCActeArchiveResultats";
import { render, screen } from "@testing-library/react";
import React from "react";
import {
  DataRMCActeAvecResultat,
  DataTableauActe
} from "../../../../../mock/data/RMCActe";

test("renders Fielset Recherche Multi Critères => Seulement des actes", () => {
  const { container } = render(
    <RMCActeArchiveResultats
      dataRMCActeArchive={DataRMCActeAvecResultat}
      dataTableauRMCActeArchive={DataTableauActe}
    />
  );

  const titre = container.getElementsByClassName("Titre").item(0)
    ?.firstElementChild?.innerHTML;
  expect(titre).toEqual("Résultats de la recherche multi-critères");

  expect(
    screen.getByText(/Recherche dans les registres d'état civil/i)
  ).toBeDefined();
});
