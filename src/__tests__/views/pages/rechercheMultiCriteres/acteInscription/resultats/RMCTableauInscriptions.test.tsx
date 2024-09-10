import {
  DataRMCInscriptionAvecResultat,
  DataTableauInscription
} from "@mock/data/RMCInscription";
import { userDroitConsulterPerimetreTousRegistres } from "@mock/data/connectedUserAvecDroit";
import requeteDelivrance from "@mock/data/requeteDelivrance";
import { RMCTableauInscriptions } from "@pages/rechercheMultiCriteres/acteInscription/resultats/RMCTableauInscriptions";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { storeRece } from "@util/storeRece";
import {
  NB_LIGNES_PAR_APPEL_INSCRIPTION,
  NB_LIGNES_PAR_PAGE_INSCRIPTION
} from "@widget/tableau/TableauRece/TableauPaginationConstantes";
import { MemoryRouter } from "react-router-dom";
import { beforeAll, expect, test } from "vitest";
import { mockFenetreFicheTestFunctions } from "../../../../../__tests__utils__/testsUtil";

beforeAll(() => {
  mockFenetreFicheTestFunctions();
});

test("renders Resultat Inscription Recherche Multi Critères => Avec résultat", () => {
  render(
    <RMCTableauInscriptions
      typeRMC="Classique"
      dataRMCInscription={DataRMCInscriptionAvecResultat}
      dataTableauRMCInscription={DataTableauInscription}
      nbLignesParPage={NB_LIGNES_PAR_PAGE_INSCRIPTION}
      nbLignesParAppel={NB_LIGNES_PAR_APPEL_INSCRIPTION}
    />
  );

  const rose = screen.getAllByText("ROSE");
  expect(rose).toHaveLength(5);
});

test("Navigation dans les pages du tableau Resultat Inscription Recherche Multi Critères => Avec résultat", () => {
  render(
    <RMCTableauInscriptions
      typeRMC="Classique"
      dataRMCInscription={DataRMCInscriptionAvecResultat}
      dataTableauRMCInscription={DataTableauInscription}
      nbLignesParPage={NB_LIGNES_PAR_PAGE_INSCRIPTION}
      nbLignesParAppel={NB_LIGNES_PAR_APPEL_INSCRIPTION}
    />
  );

  const nbElementPage1 = screen.getAllByText("ROSE");
  expect(nbElementPage1).toHaveLength(5);

  const changementPageSuivantes = screen.getByTitle("Page suivante");
  fireEvent.click(changementPageSuivantes);

  const nbElementPage2 = screen.getAllByText("ROSE");
  expect(nbElementPage2).toHaveLength(1);
});

test.skip("Ouverture d'une inscription", () => {
  storeRece.utilisateurCourant = userDroitConsulterPerimetreTousRegistres;
  const { getByTestId } = render(
    <MemoryRouter>
      <RMCTableauInscriptions
        typeRMC="Classique"
        dataRMCInscription={DataRMCInscriptionAvecResultat}
        dataTableauRMCInscription={DataTableauInscription}
        nbLignesParPage={NB_LIGNES_PAR_PAGE_INSCRIPTION}
        nbLignesParAppel={NB_LIGNES_PAR_APPEL_INSCRIPTION}
      />
    </MemoryRouter>
  );

  const ligne = getByTestId("89c9d030-26c3-41d3-bdde-8b4dcc0420e0");

  fireEvent.click(ligne);

  const titreBandeau = "PACS N° 2018 - 123456";
  const titreAccordeaon = "Visualisation du PACS";

  waitFor(() => {
    const numero = screen.getByText(titreBandeau);
    expect(numero).toBeDefined();

    const vue = screen.getByText(titreAccordeaon);
    expect(vue).toBeDefined();
  });
});

test("renders Resultat Inscription Recherche Multi Critères => Sans résultat", () => {
  render(
    <RMCTableauInscriptions
      typeRMC="Classique"
      dataRMCInscription={[]}
      dataTableauRMCInscription={{}}
      nbLignesParPage={NB_LIGNES_PAR_PAGE_INSCRIPTION}
      nbLignesParAppel={NB_LIGNES_PAR_APPEL_INSCRIPTION}
    />
  );

  expect(screen.getByText(/Aucune inscription n'a été trouvée/i)).toBeDefined();
});

test("renders Resultat Inscription Recherche Multi Critères Auto => Avec résultat", () => {
  render(
    <RMCTableauInscriptions
      typeRMC="Auto"
      dataRequete={requeteDelivrance}
      dataRMCInscription={DataRMCInscriptionAvecResultat}
      dataTableauRMCInscription={DataTableauInscription}
      nbLignesParPage={NB_LIGNES_PAR_PAGE_INSCRIPTION}
      nbLignesParAppel={NB_LIGNES_PAR_APPEL_INSCRIPTION}
    />
  );

  const checkboxColumns: HTMLElement[] = screen.getAllByRole("checkbox");

  waitFor(() => {
    expect(checkboxColumns).toBeDefined();
  });

  fireEvent.click(checkboxColumns[0]);

  waitFor(() => {
    const elementsCoches = screen.getAllByText("1 élément(s) coché(s)");
    expect(elementsCoches).toBeDefined();
  });

  fireEvent.click(checkboxColumns[0]);

  waitFor(() => {
    const elementsCoches = screen.getAllByText("0 élément(s) coché(s)");
    expect(elementsCoches).toBeDefined();
  });
});
