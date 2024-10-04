// MiseAJourAnalyseMarginaleForm.test.tsx
import { IDerniereAnalyseMarginalResultat } from "@hook/requete/miseajour/DerniereAnalyseMarginaleApiHook";
import { IPrenomOrdonnes } from "@model/requete/IPrenomOrdonnes";
import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";
import { MiseAJourAnalyseMarginaleForm } from "../../../../../composants/pages/requetesMiseAJour/miseAJourAnalyseMarginaleForm/MiseAJourAnalyseMarginaleForm";

// Mock Data
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

it("renders le formulaire avec les bonnes valeurs par defaut", () => {
  render(
    <MiseAJourAnalyseMarginaleForm
      derniereAnalyseMarginal={mockDerniereAnalyseMarginal}
    />
  );
  expect(screen.getByDisplayValue("Doe Smith")).toBeDefined();
  expect(screen.getByDisplayValue("John")).toBeDefined();
  expect(screen.queryByText("motifMock")).toBeNull();
});
