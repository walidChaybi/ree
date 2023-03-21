import { RMCTableauActes } from "@pages/rechercheMultiCriteres/acteInscription/resultats/RMCTableauActes";
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor
} from "@testing-library/react";
import {
  NB_LIGNES_PAR_APPEL_ACTE,
  NB_LIGNES_PAR_PAGE_ACTE
} from "@widget/tableau/TableauRece/TableauPaginationConstantes";
import React from "react";
import request from "superagent";
import requeteDelivrance from "../../../../../mock/data/requeteDelivrance";
import {
  DataRMCActeAvecResultat,
  DataTableauActe
} from "../../../../../mock/data/RMCActe";
import { configEtatcivil } from "../../../../../mock/superagent-config/superagent-mock-etatcivil";

const superagentMock = require("superagent-mock")(request, configEtatcivil);

const globalAny: any = global;
globalAny.open = () => {
  return {
    ...window,
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn()
  };
};
globalAny.close = jest.fn();

afterAll(() => {
  superagentMock.unset();
});

test("renders Resultat Acte Recherche Multi Critères => Avec résultat", () => {
  const { getAllByText } = render(
    <RMCTableauActes
      typeRMC="Classique"
      dataRMCActe={DataRMCActeAvecResultat}
      dataTableauRMCActe={DataTableauActe}
      nbLignesParPage={NB_LIGNES_PAR_PAGE_ACTE}
      nbLignesParAppel={NB_LIGNES_PAR_APPEL_ACTE}
    />
  );

  const rose = getAllByText("ROSE");
  expect(rose).toHaveLength(5);
});

test("Ouverture d'un acte", async () => {
  const { getByTestId } = render(
    <RMCTableauActes
      typeRMC="Classique"
      dataRMCActe={DataRMCActeAvecResultat}
      dataTableauRMCActe={DataTableauActe}
      nbLignesParPage={NB_LIGNES_PAR_PAGE_ACTE}
      nbLignesParAppel={NB_LIGNES_PAR_APPEL_ACTE}
    />
  );

  const ligne = getByTestId("b41079a5-9e8d-478c-b04c-c4c2ac67134f");

  act(() => {
    fireEvent.click(ligne);
  });

  const titreBandeau = "CSL.DX.1922.NA.T.410.681";

  await verifieFiche(titreBandeau);
});

test("Ouverture d'un acte et navigation via bouton Suivant", async () => {
  const { getByTestId } = render(
    <RMCTableauActes
      typeRMC="Classique"
      dataRMCActe={DataRMCActeAvecResultat}
      dataTableauRMCActe={DataTableauActe}
      nbLignesParPage={NB_LIGNES_PAR_PAGE_ACTE}
      nbLignesParAppel={NB_LIGNES_PAR_APPEL_ACTE}
    />
  );

  const ligne = getByTestId("d8708d77-a359-4553-be72-1eb5f246d4dc");

  act(() => {
    fireEvent.click(ligne);
  });

  const titreBandeau = "CSL.DX.NA.T.411.681";

  await verifieFiche(titreBandeau);

  const suivant = screen.getByTitle("Suivant");

  act(() => {
    fireEvent.click(suivant);
  });

  const titreBandeau2 = "CSL.DX.NA.T.412.681";

  await verifieFiche(titreBandeau2);
});

test("Ouverture d'un acte et navigation via bouton Précédent", async () => {
  const { getByTestId } = render(
    <RMCTableauActes
      typeRMC="Classique"
      dataRMCActe={DataRMCActeAvecResultat}
      dataTableauRMCActe={DataTableauActe}
      nbLignesParPage={NB_LIGNES_PAR_PAGE_ACTE}
      nbLignesParAppel={NB_LIGNES_PAR_APPEL_ACTE}
    />
  );

  const ligne = getByTestId("2748bb45-22cd-41ea-90db-0483b8ffc8a9");

  act(() => {
    fireEvent.click(ligne);
  });

  const titreBandeau = "CSL.DX.NA.T.414.681";

  await verifieFiche(titreBandeau);

  const precedent = screen.getByTitle("Précédent");

  await act(async () => {
    fireEvent.click(precedent);
  });

  const titreBandeau2 = "CSL.DX.NA.T.413.681";

  await verifieFiche(titreBandeau2);
});

async function verifieFiche(titreBandeau: string) {
  await waitFor(() => {
    expect(screen.getByTestId("titreBandeau").innerHTML).toBe(titreBandeau);

    const vue = screen.getByText("Résumé de l'acte");
    expect(vue).toBeDefined();
  });
}

test("renders Resultat Acte Recherche Multi Critères => Sans résultat", () => {
  render(
    <RMCTableauActes
      typeRMC="Classique"
      dataRMCActe={[]}
      dataTableauRMCActe={{}}
      nbLignesParPage={NB_LIGNES_PAR_PAGE_ACTE}
      nbLignesParAppel={NB_LIGNES_PAR_APPEL_ACTE}
    />
  );

  expect(screen.getByText(/Aucun acte n'a été trouvé/i)).toBeDefined();
});

test("renders Resultat Acte Recherche Multi Critères Auto => Avec résultat", async () => {
  await act(async () => {
    render(
      <RMCTableauActes
        typeRMC="Auto"
        dataRequete={requeteDelivrance}
        dataRMCActe={DataRMCActeAvecResultat}
        dataTableauRMCActe={DataTableauActe}
        nbLignesParPage={NB_LIGNES_PAR_PAGE_ACTE}
        nbLignesParAppel={NB_LIGNES_PAR_APPEL_ACTE}
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
