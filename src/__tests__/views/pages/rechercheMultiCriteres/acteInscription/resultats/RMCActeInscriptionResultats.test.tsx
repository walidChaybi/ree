import { ResultatRMCActe } from "@model/rmc/acteInscription/resultat/ResultatRMCActe";
import ResultatRMCInscription, { TResultatRMCInscription } from "@model/rmc/acteInscription/resultat/ResultatRMCInscription";
import { RMCActeInscriptionResultats } from "@pages/rechercheMultiCriteres/acteInscription/resultats/RMCActeInscriptionResultats";
import { render, screen } from "@testing-library/react";
import {
  NB_LIGNES_PAR_APPEL_ACTE,
  NB_LIGNES_PAR_APPEL_INSCRIPTION,
  NB_LIGNES_PAR_PAGE_ACTE,
  NB_LIGNES_PAR_PAGE_INSCRIPTION
} from "@widget/tableau/TableauRece/TableauPaginationConstantes";
import { expect, test } from "vitest";
import { DataRMCActeAvecResultatDto, DataTableauActe } from "../../../../../mock/data/RMCActe";
import { DataTableauInscription, MOCK_LISTE_RESULTAT_RMC_INSCRIPTION_DTO } from "../../../../../mock/data/RMCInscription";

test("renders Fielset Recherche Multi Critères => Seulement des actes", () => {
  const { container } = render(
    <RMCActeInscriptionResultats
      typeRMC="Classique"
      dataRMCActe={DataRMCActeAvecResultatDto.map(ResultatRMCActe.depuisDto).filter((acte): acte is ResultatRMCActe => acte !== null)}
      dataTableauRMCActe={DataTableauActe}
      dataRMCInscription={[]}
      dataTableauRMCInscription={{}}
      nbLignesParPageActe={NB_LIGNES_PAR_PAGE_ACTE}
      nbLignesParAppelActe={NB_LIGNES_PAR_APPEL_ACTE}
      nbLignesParPageInscription={NB_LIGNES_PAR_PAGE_INSCRIPTION}
      nbLignesParAppelInscription={NB_LIGNES_PAR_APPEL_INSCRIPTION}
      rmcActeEnCours={false}
      rmcInscriptionEnCours={false}
    />
  );

  const titre = container.getElementsByClassName("Titre").item(0)?.firstElementChild?.innerHTML;

  expect(titre).toEqual("Résultats de la recherche multi-critères");
  expect(screen.getByText(/Recherche dans les registres d'état civil/i)).toBeDefined();

  expect(screen.getByText(/Recherche dans les répertoires de greffe et registre des PACS des étrangers nés à l'étranger/i)).toBeDefined();
});

test("renders Fielset Recherche Multi Critères => Seulement des inscriptions", () => {
  const { container } = render(
    <RMCActeInscriptionResultats
      typeRMC="Classique"
      dataRMCActe={[]}
      dataTableauRMCActe={{}}
      dataRMCInscription={MOCK_LISTE_RESULTAT_RMC_INSCRIPTION_DTO.map(ResultatRMCInscription.depuisDto).filter(
        (inscription): inscription is TResultatRMCInscription => inscription !== null
      )}
      dataTableauRMCInscription={DataTableauInscription}
      nbLignesParPageActe={NB_LIGNES_PAR_PAGE_ACTE}
      nbLignesParAppelActe={NB_LIGNES_PAR_APPEL_ACTE}
      nbLignesParPageInscription={NB_LIGNES_PAR_PAGE_INSCRIPTION}
      nbLignesParAppelInscription={NB_LIGNES_PAR_APPEL_INSCRIPTION}
      rmcActeEnCours={false}
      rmcInscriptionEnCours={false}
    />
  );

  const titre = container.getElementsByClassName("Titre").item(0)?.firstElementChild?.innerHTML;
  expect(titre).toEqual("Résultats de la recherche multi-critères");

  expect(screen.getByText(/Recherche dans les registres d'état civil/i)).toBeDefined();

  expect(screen.getByText(/Recherche dans les répertoires de greffe et registre des PACS des étrangers nés à l'étranger/i)).toBeDefined();
});
