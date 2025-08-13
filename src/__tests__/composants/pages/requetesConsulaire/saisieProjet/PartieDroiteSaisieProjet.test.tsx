import MockRECEContextProvider from "@mock/context/MockRECEContextProvider";
import { render, screen, waitFor } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import PartieDroiteSaisieProjet from "../../../../../composants/pages/requetesConsulaire/saisieProjet/PartieDroiteSaisieProjet";

describe("PartieDroiteSaisieProjet - Tests du composant", () => {
  test("DOIT afficher l'onglet 'Saisir le projet'", async () => {
    render(
      <MockRECEContextProvider>
        <PartieDroiteSaisieProjet />
      </MockRECEContextProvider>
    );
    await waitFor(() => {
      expect(screen.getByTitle("Saisir le projet")).toBeDefined();
    });
  });
});
