import {
  act,
  fireEvent,
  render,
  screen,
  waitFor
} from "@testing-library/react";
import React from "react";
import request from "superagent";
import { userDroitConsulterPerimetreMEAE } from "../../../../../mock/data/connectedUserAvecDroit";
import requeteDelivrance from "../../../../../mock/data/requeteDelivrance";
import {
  DataRMCInscriptionAvecResultat,
  DataTableauInscription
} from "../../../../../mock/data/RMCInscription";
import { configEtatcivil } from "../../../../../mock/superagent-config/superagent-mock-etatcivil";
import { storeRece } from "../../../../../views/common/util/storeRece";
import {
  NB_LIGNES_PAR_APPEL_INSCRIPTION,
  NB_LIGNES_PAR_PAGE_INSCRIPTION
} from "../../../../../views/common/widget/tableau/v2/TableauPaginationConstantes";
import { RMCTableauInscriptions } from "../../../../../views/pages/rechercheMultiCriteres/acteInscription/resultats/RMCTableauInscriptions";

const superagentMock = require("superagent-mock")(request, configEtatcivil);

const globalAny: any = global;

globalAny.URL.createObjectURL = jest.fn();
globalAny.open = () => {
  return { ...window };
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
  const titreAccordeaon = "Vue du PACS";

  await waitFor(() => {
    const numero = screen.getByText(titreBandeau);
    expect(numero).toBeDefined();

    const vue = screen.getByText(titreAccordeaon);
    expect(vue).toBeDefined();
  });

  act(() => {
    const event = new CustomEvent("beforeunload");
    window.top.dispatchEvent(event);
  });

  await waitFor(() => {
    const numero = screen.queryByText(titreBandeau);
    expect(numero).toBeNull();

    const vue = screen.queryByText(titreAccordeaon);
    expect(vue).toBeNull();
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

  await waitFor(() => {
    expect(checkboxColumns).toBeDefined();
  });

  act(() => {
    fireEvent.click(checkboxColumns[0], {
      target: {
        checked: true
      }
    });
  });

  await waitFor(() => {
    const elementsCoches = screen.getAllByText("1 élément(s) coché(s)");
    expect(elementsCoches).toBeDefined();
  });

  act(() => {
    fireEvent.click(checkboxColumns[0], {
      target: {
        checked: false
      }
    });
  });

  await waitFor(() => {
    const elementsCoches = screen.getAllByText("0 élément(s) coché(s)");
    expect(elementsCoches).toBeDefined();
  });
});

afterAll(() => {
  superagentMock.unset();
});
