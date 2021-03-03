import React from "react";
import { render, screen } from "@testing-library/react";
import { RMCActeInscriptionResultats } from "../../../../views/pages/rechercheMultiCriteres/acteInscription/resultats/RMCActeInscriptionResultats";
import {
  DataRMCActeAvecResultat,
  DataTableauActe
} from "../../../../mock/data/RMCActe";
import {
  DataRMCInscriptionAvecResultat,
  DataTableauInscription
} from "../../../../mock/data/RMCInscription";

test("renders Fielset Recherche Multi Critères => Seulement des actes", () => {
  const { container } = render(
    <RMCActeInscriptionResultats
      dataRMCActe={DataRMCActeAvecResultat}
      dataTableauRMCActe={DataTableauActe}
      dataRMCInscription={[]}
      dataTableauRMCInscription={{}}
    />
  );

  const titre = container.getElementsByClassName("Titre").item(0)
    ?.firstElementChild?.innerHTML;
  expect(titre).toEqual("Résultats de la recherche");

  expect(screen.getByText(/Recherche dans les registres/i)).toBeDefined();

  expect(
    screen.getByText(
      /Recherche dans les repertoires de greffe et registre des PACS étrangers/i
    )
  ).toBeDefined();
  expect(
    screen.getByText(
      /Aucune inscription trouvée pour ces critères de recherche/i
    )
  ).toBeDefined();
});

test("renders Fielset Recherche Multi Critères => Seulement des inscriptions", () => {
  const { container } = render(
    <RMCActeInscriptionResultats
      dataRMCActe={[]}
      dataTableauRMCActe={{}}
      dataRMCInscription={DataRMCInscriptionAvecResultat}
      dataTableauRMCInscription={DataTableauInscription}
    />
  );

  const titre = container.getElementsByClassName("Titre").item(0)
    ?.firstElementChild?.innerHTML;
  expect(titre).toEqual("Résultats de la recherche");

  expect(screen.getByText(/Recherche dans les registres/i)).toBeDefined();

  expect(
    screen.getByText(/Aucun acte trouvé pour ces critères de recherche/i)
  ).toBeDefined();

  expect(
    screen.getByText(
      /Recherche dans les repertoires de greffe et registre des PACS étrangers/i
    )
  ).toBeDefined();
});
