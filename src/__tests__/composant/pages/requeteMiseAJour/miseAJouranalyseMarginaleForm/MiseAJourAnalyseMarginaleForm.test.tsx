import { IDerniereAnalyseMarginalResultat } from "@hook/requete/miseajour/DerniereAnalyseMarginaleApiHook";
import { IPrenomOrdonnes } from "@model/requete/IPrenomOrdonnes";
import { URL_RECHERCHE_ACTE_INSCRIPTION } from "@router/ReceUrls";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import messageManager from "@util/messageManager";
import { RouterProvider } from "react-router-dom";
import { expect, test, vi } from "vitest";
import { MiseAJourAnalyseMarginaleForm } from "../../../../../composants/pages/requetesMiseAJour/miseAJourAnalyseMarginaleForm/MiseAJourAnalyseMarginaleForm";
import { createTestingRouter } from "../../../../__tests__utils__/testsUtil";

const mockDerniereAnalyseMarginal: IDerniereAnalyseMarginalResultat = {
  id: "mockId",
  dateDebut: 1000,
  estValide: true,
  motif: "mockMotif",
  titulaire: {
    nom: "Doe Smith",
    prenoms: [
      { prenom: "John", numeroOrdre: 1 },
      { prenom: "Michael", numeroOrdre: 2 }
    ] as IPrenomOrdonnes[],
    ordre: 1,
    nomPartie1: "Doe",
    nomPartie2: "Smith"
  }
};

vi.mock("@util/messageManager", () => {
  return {
    __esModule: true,
    default: {
      showSuccessAndClose: vi.fn()
    }
  };
});

test("renders le formulaire avec les bonnes valeurs par defaut", () => {
  const router = createTestingRouter(
    [
      {
        path: "/",
        element: (
          <MiseAJourAnalyseMarginaleForm
            idRequete="mockId"
            derniereAnalyseMarginal={mockDerniereAnalyseMarginal}
          />
        )
      }
    ],
    ["/"]
  );

  render(<RouterProvider router={router} />);

  expect(screen.getByDisplayValue("Doe Smith")).toBeDefined();
  expect(screen.getByDisplayValue("John")).toBeDefined();
  expect(screen.queryByText("motifMock")).toBeNull();
});

test("redirige vers la page RMC au clic sur le bouton valider et terminer", async () => {
  const router = createTestingRouter(
    [
      {
        path: "/",
        element: (
          <MiseAJourAnalyseMarginaleForm
            idRequete="e5fdfe01-655b-44b9-a1fd-86c1169bb2ee"
            derniereAnalyseMarginal={mockDerniereAnalyseMarginal}
          />
        )
      },
      {
        path: URL_RECHERCHE_ACTE_INSCRIPTION,
        element: <div>Redirection effective</div>
      }
    ],
    ["/"]
  );

  render(<RouterProvider router={router} />);
  const boutonValider = screen.getByText("Valider et terminer");
  fireEvent.click(boutonValider);
  waitFor(() => {
    expect(router.state.location.pathname).toBe(URL_RECHERCHE_ACTE_INSCRIPTION);
    expect(messageManager.showSuccessAndClose).toHaveBeenCalledWith(
      "L'analyse marginale a été mise à jour avec succès"
    );
  });
});
