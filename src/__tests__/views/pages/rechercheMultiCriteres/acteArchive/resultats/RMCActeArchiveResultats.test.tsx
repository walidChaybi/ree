import { RMCActeArchiveResultats } from "@pages/rechercheMultiCriteres/acteArchive/resultats/RMCActeArchiveResultats";
import { render, screen } from "@testing-library/react";
import { NB_LIGNES_PAR_APPEL_REQUETE, NB_LIGNES_PAR_PAGE_REQUETE } from "@widget/tableau/TableauRece/TableauPaginationConstantes";
import { expect, test } from "vitest";
import { DataRMCActeAvecResultat, DataTableauActe } from "../../../../../mock/data/RMCActe";

test("renders Fielset Recherche Multi Critères => Seulement des actes", () => {
  const { container } = render(
    <RMCActeArchiveResultats
      dataRMCActeArchive={DataRMCActeAvecResultat}
      dataTableauRMCActeArchive={DataTableauActe}
      nbLignesParAppel={NB_LIGNES_PAR_APPEL_REQUETE}
      nbLignesParPage={NB_LIGNES_PAR_PAGE_REQUETE}
    />
  );

  const titre = container.getElementsByClassName("Titre").item(0)?.firstElementChild?.innerHTML;
  expect(titre).toEqual("Résultats de la recherche multi-critères");

  expect(screen.getByText(/Recherche dans les registres d'état civil/i)).toBeDefined();
});
