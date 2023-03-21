import { RMCTableauInscriptions } from "@pages/rechercheMultiCriteres/acteInscription/resultats/RMCTableauInscriptions";
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor
} from "@testing-library/react";
import { storeRece } from "@util/storeRece";
import {
  NB_LIGNES_PAR_APPEL_INSCRIPTION,
  NB_LIGNES_PAR_PAGE_INSCRIPTION
} from "@widget/tableau/TableauRece/TableauPaginationConstantes";
import React from "react";
import request from "superagent";
import { userDroitConsulterPerimetreMEAE } from "../../../../../mock/data/connectedUserAvecDroit";
import requeteDelivrance from "../../../../../mock/data/requeteDelivrance";
import {
  DataRMCInscriptionAvecResultat,
  DataTableauInscription
} from "../../../../../mock/data/RMCInscription";
import { configEtatcivil } from "../../../../../mock/superagent-config/superagent-mock-etatcivil";

const superagentMock = require("superagent-mock")(request, configEtatcivil);

const globalAny: any = global;

globalAny.URL.createObjectURL = jest.fn();
globalAny.open = () => {
  return { ...window, addEventListener: jest.fn() };
};
globalAny.close = jest.fn();

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

test("Ouverture d'une inscription", async () => {
  storeRece.utilisateurCourant = userDroitConsulterPerimetreMEAE;
  const { getByTestId } = render(
    <RMCTableauInscriptions
      typeRMC="Classique"
      dataRMCInscription={DataRMCInscriptionAvecResultat}
      dataTableauRMCInscription={DataTableauInscription}
      nbLignesParPage={NB_LIGNES_PAR_PAGE_INSCRIPTION}
      nbLignesParAppel={NB_LIGNES_PAR_APPEL_INSCRIPTION}
    />
  );

  const ligne = getByTestId("89c9d030-26c3-41d3-bdde-8b4dcc0420e0");

  act(() => {
    fireEvent.click(ligne);
  });

  const titreBandeau = "PACS N° 2018 - 123456";
  const titreAccordeaon = "Visualisation du PACS";

  await waitFor(() => {
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

test("renders Resultat Inscription Recherche Multi Critères Auto => Avec résultat", async () => {
  await act(async () => {
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
  });

  const checkboxColumns: HTMLElement[] = screen.getAllByRole("checkbox");

  await waitFor(() => {
    expect(checkboxColumns).toBeDefined();
  });

  await act(async () => {
    fireEvent.click(checkboxColumns[0]);
  });

  await waitFor(() => {
    const elementsCoches = screen.getAllByText("1 élément(s) coché(s)");
    expect(elementsCoches).toBeDefined();
  });

  await act(async () => {
    fireEvent.click(checkboxColumns[0]);
  });

  await waitFor(() => {
    const elementsCoches = screen.getAllByText("0 élément(s) coché(s)");
    expect(elementsCoches).toBeDefined();
  });
});

afterAll(() => {
  superagentMock.unset();
});
