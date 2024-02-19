import requeteDelivrance from "@mock/data/requeteDelivrance";
import { DataRMCActeAvecResultat, DataTableauActe } from "@mock/data/RMCActe";
import { RMCTableauActes } from "@pages/rechercheMultiCriteres/acteInscription/resultats/RMCTableauActes";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import {
  NB_LIGNES_PAR_APPEL_ACTE,
  NB_LIGNES_PAR_PAGE_ACTE
} from "@widget/tableau/TableauRece/TableauPaginationConstantes";
import { RouterProvider } from "react-router-dom";
import {
  createTestingRouter,
  mockFenetreFicheTestFunctions
} from "../../../../../__tests__utils__/testsUtil";

beforeAll(async () => {
  mockFenetreFicheTestFunctions();
});

test("renders Resultat Acte Recherche Multi Critères => Avec résultat", () => {
  const router = createTestingRouter(
    [
      {
        path: "/",
        element: (
          <RMCTableauActes
            typeRMC="Classique"
            dataRMCActe={DataRMCActeAvecResultat}
            dataTableauRMCActe={DataTableauActe}
            nbLignesParPage={NB_LIGNES_PAR_PAGE_ACTE}
            nbLignesParAppel={NB_LIGNES_PAR_APPEL_ACTE}
          />
        )
      }
    ],
    ["/"]
  );

  const { getAllByText } = render(<RouterProvider router={router} />);
  const rose = getAllByText("ROSE");
  expect(rose).toHaveLength(5);
});

test("Ouverture d'un acte", () => {
  const router = createTestingRouter(
    [
      {
        path: "/",
        element: (
          <RMCTableauActes
            typeRMC="Classique"
            dataRMCActe={DataRMCActeAvecResultat}
            dataTableauRMCActe={DataTableauActe}
            nbLignesParPage={NB_LIGNES_PAR_PAGE_ACTE}
            nbLignesParAppel={NB_LIGNES_PAR_APPEL_ACTE}
          />
        )
      }
    ],
    ["/"]
  );

  const { getByTestId } = render(<RouterProvider router={router} />);

  const ligne = getByTestId("b41079a5-9e8d-478c-b04c-c4c2ac67134f");

  fireEvent.click(ligne);

  const titreBandeau = "CSL.DX.1922.NA.T.410.681";

  waitFor(() => {
    expect(screen.getByTestId("titreBandeau").innerHTML).toBe(titreBandeau);

    const vue = screen.getByText("Résumé de l'acte");
    expect(vue).toBeDefined();
  });
});

test("Ouverture d'un acte et navigation via bouton Suivant", () => {
  const router = createTestingRouter(
    [
      {
        path: "/",
        element: (
          <RMCTableauActes
            typeRMC="Classique"
            dataRMCActe={DataRMCActeAvecResultat}
            dataTableauRMCActe={DataTableauActe}
            nbLignesParPage={NB_LIGNES_PAR_PAGE_ACTE}
            nbLignesParAppel={NB_LIGNES_PAR_APPEL_ACTE}
          />
        )
      }
    ],
    ["/"]
  );

  const { getByTestId } = render(<RouterProvider router={router} />);

  const ligne = getByTestId("d8708d77-a359-4553-be72-1eb5f246d4dc");

  fireEvent.click(ligne);

  const titreBandeau = "CSL.DX.NA.T.411.681";

  waitFor(() => {
    expect(screen.getByTestId("titreBandeau").innerHTML).toBe(titreBandeau);

    const vue = screen.getByText("Résumé de l'acte");
    expect(vue).toBeDefined();
  });

  fireEvent.click(screen.getByTitle("Page suivante"));

  const titreBandeau2 = "CSL.DX.NA.T.412.681";

  waitFor(() => {
    expect(screen.getByTestId("titreBandeau").innerHTML).toBe(titreBandeau2);

    const vue = screen.getByText("Résumé de l'acte");
    expect(vue).toBeDefined();
  });
});

test("Ouverture d'un acte et navigation via bouton Précédent", () => {
  const router = createTestingRouter(
    [
      {
        path: "/",
        element: (
          <RMCTableauActes
            typeRMC="Classique"
            dataRMCActe={DataRMCActeAvecResultat}
            dataTableauRMCActe={DataTableauActe}
            nbLignesParPage={NB_LIGNES_PAR_PAGE_ACTE}
            nbLignesParAppel={NB_LIGNES_PAR_APPEL_ACTE}
          />
        )
      }
    ],
    ["/"]
  );

  const { getByTestId } = render(<RouterProvider router={router} />);
  const ligne = getByTestId("2748bb45-22cd-41ea-90db-0483b8ffc8a9");

  fireEvent.click(ligne);

  const titreBandeau = "CSL.DX.NA.T.414.681";

  waitFor(() => {
    expect(screen.getByTestId("titreBandeau").innerHTML).toBe(titreBandeau);

    const vue = screen.getByText("Résumé de l'acte");
    expect(vue).toBeDefined();
  });

  const precedent = screen.getByTitle("Page précédente");

  fireEvent.click(precedent);

  const titreBandeau2 = "CSL.DX.NA.T.413.681";

  waitFor(() => {
    expect(screen.getByTestId("titreBandeau").innerHTML).toBe(titreBandeau2);

    const vue = screen.getByText("Résumé de l'acte");
    expect(vue).toBeDefined();
  });
});

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

test("renders Resultat Acte Recherche Multi Critères Auto => Avec résultat", () => {
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
  const checkboxColumns: HTMLElement[] = screen.getAllByRole("checkbox");

  waitFor(() => {
    expect(checkboxColumns).toBeDefined();
  });

  waitFor(() => {
    fireEvent.click(checkboxColumns[0]);
  });

  waitFor(() => {
    const elementsCoches = screen.getAllByText("1 élément(s) coché(s)");
    expect(elementsCoches).toBeDefined();
  });

  waitFor(() => {
    fireEvent.click(checkboxColumns[0]);
  });

  waitFor(() => {
    const elementsCoches = screen.getAllByText("0 élément(s) coché(s)");
    expect(elementsCoches).toBeDefined();
  });
});