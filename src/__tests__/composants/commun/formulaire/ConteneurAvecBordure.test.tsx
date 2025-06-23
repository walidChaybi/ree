import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import ConteneurAvecBordure from "../../../../composants/commun/conteneurs/formulaire/ConteneurAvecBordure";

describe("ConteneurAvecBordure", () => {
  test("Le composant fonctionne bien", () => {
    render(
      <ConteneurAvecBordure>
        <div>Test</div>
      </ConteneurAvecBordure>
    );
    expect(screen.getByText("Test")).toBeDefined();
  });

  test("QUAND un titre d'en tête est passé, ALORS le titre s'affiche correctement", () => {
    render(<ConteneurAvecBordure titreEnTete="Mon titre" />);
    expect(screen.getByText("Mon titre")).toBeDefined();
  });

  test("QUAND la réinitialisation est activée, ALORS le bouton de réinitialisation d'affiche, et appelle bien la fonction passée au clic", () => {
    const handleReset = vi.fn();
    render(
      <ConteneurAvecBordure
        titreEnTete="Avec Bouton"
        reinitialiserDonneesBloc={handleReset}
      />
    );
    const button = screen.getByRole("button", { name: "Réinitialiser les données du bloc" });
    fireEvent.click(button);
    expect(handleReset).toHaveBeenCalled();
  });
});
