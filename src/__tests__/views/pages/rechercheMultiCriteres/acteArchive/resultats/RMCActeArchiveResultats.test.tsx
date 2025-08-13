import { ResultatRMCActe } from "@model/rmc/acteInscription/resultat/ResultatRMCActe";
import { RMCActeArchiveResultats } from "@pages/rechercheMultiCriteres/acteArchive/resultats/RMCActeArchiveResultats";
import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import { DataRMCActeAvecResultatDto, DataTableauActe } from "../../../../../mock/data/RMCActe";

test("renders Fielset Recherche Multi Critères => Seulement des actes", () => {
  const { container } = render(
    <RMCActeArchiveResultats
      dataRMCActeArchive={DataRMCActeAvecResultatDto.map(ResultatRMCActe.depuisDto).filter(
        (acte): acte is ResultatRMCActe => acte !== null
      )}
      dataTableauRMCActeArchive={DataTableauActe}
    />
  );

  const titre = container.getElementsByClassName("Titre").item(0)?.firstElementChild?.innerHTML;
  expect(titre).toEqual("Résultats de la recherche multi-critères");

  expect(screen.getByText(/Recherche dans les registres d'état civil/i)).toBeDefined();
});
