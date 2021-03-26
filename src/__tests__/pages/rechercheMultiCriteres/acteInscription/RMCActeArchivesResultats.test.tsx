import React from "react";
import { render, screen } from "@testing-library/react";
import { RMCActeArchiveResultats } from "../../../../views/pages/rechercheMultiCriteres/acteArchive/resultats/RMCActeArchiveResultats";
import {
  DataRMCActeAvecResultat,
  DataTableauActe
} from "../../../../mock/data/RMCActe";

test("renders Fielset Recherche Multi Critères => Seulement des actes", () => {
  const { container } = render(
    <RMCActeArchiveResultats
      dataRMCActe={DataRMCActeAvecResultat}
      dataTableauRMCActe={DataTableauActe}
    />
  );

  const titre = container.getElementsByClassName("Titre").item(0)
    ?.firstElementChild?.innerHTML;
  expect(titre).toEqual("Résultats de la recherche");

  expect(screen.getByText(/Recherche dans les registres/i)).toBeDefined();
});
