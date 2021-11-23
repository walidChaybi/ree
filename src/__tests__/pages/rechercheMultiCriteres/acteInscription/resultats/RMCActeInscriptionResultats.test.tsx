import { render, screen } from "@testing-library/react";
import React from "react";
import {
  DataRMCActeAvecResultat,
  DataTableauActe
} from "../../../../../mock/data/RMCActe";
import {
  DataRMCInscriptionAvecResultat,
  DataTableauInscription
} from "../../../../../mock/data/RMCInscription";
import {
  NB_LIGNES_PAR_APPEL_ACTE,
  NB_LIGNES_PAR_APPEL_INSCRIPTION,
  NB_LIGNES_PAR_PAGE_ACTE,
  NB_LIGNES_PAR_PAGE_INSCRIPTION
} from "../../../../../views/common/widget/tableau/v2/TableauPaginationConstantes";
import { RMCActeInscriptionResultats } from "../../../../../views/pages/rechercheMultiCriteres/acteInscription/resultats/RMCActeInscriptionResultats";

test("renders Fielset Recherche Multi Critères => Seulement des actes", () => {
  const { container } = render(
    <RMCActeInscriptionResultats
      typeRMC="Classique"
      dataRMCActe={DataRMCActeAvecResultat}
      dataTableauRMCActe={DataTableauActe}
      dataRMCInscription={[]}
      dataTableauRMCInscription={{}}
      nbLignesParPageActe={NB_LIGNES_PAR_PAGE_ACTE}
      nbLignesParAppelActe={NB_LIGNES_PAR_APPEL_ACTE}
      nbLignesParPageInscription={NB_LIGNES_PAR_PAGE_INSCRIPTION}
      nbLignesParAppelInscription={NB_LIGNES_PAR_APPEL_INSCRIPTION}
    />
  );

  const titre = container.getElementsByClassName("Titre").item(0)
    ?.firstElementChild?.innerHTML;

  expect(titre).toEqual("Résultats de la recherche multi-critères");
  expect(
    screen.getByText(/Recherche dans les registres d'état civil/i)
  ).toBeDefined();

  expect(
    screen.getByText(
      /Recherche dans les répertoires de greffe et registre des PACS des étrangers nés à l'étranger/i
    )
  ).toBeDefined();
});

test("renders Fielset Recherche Multi Critères => Seulement des inscriptions", () => {
  const { container } = render(
    <RMCActeInscriptionResultats
      typeRMC="Classique"
      dataRMCActe={[]}
      dataTableauRMCActe={{}}
      dataRMCInscription={DataRMCInscriptionAvecResultat}
      dataTableauRMCInscription={DataTableauInscription}
      nbLignesParPageActe={NB_LIGNES_PAR_PAGE_ACTE}
      nbLignesParAppelActe={NB_LIGNES_PAR_APPEL_ACTE}
      nbLignesParPageInscription={NB_LIGNES_PAR_PAGE_INSCRIPTION}
      nbLignesParAppelInscription={NB_LIGNES_PAR_APPEL_INSCRIPTION}
    />
  );

  const titre = container.getElementsByClassName("Titre").item(0)
    ?.firstElementChild?.innerHTML;
  expect(titre).toEqual("Résultats de la recherche multi-critères");

  expect(
    screen.getByText(/Recherche dans les registres d'état civil/i)
  ).toBeDefined();

  expect(
    screen.getByText(
      /Recherche dans les répertoires de greffe et registre des PACS des étrangers nés à l'étranger/i
    )
  ).toBeDefined();
});
