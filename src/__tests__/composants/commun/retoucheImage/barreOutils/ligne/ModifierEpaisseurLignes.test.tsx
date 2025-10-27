import EtatImage from "@model/retoucheImage/EtatImage";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import ModifierEpaisseurLignes from "../../../../../../composants/commun/retoucheImage/barreOutils/ligne/ModifierEpaisseurLignes";

const mockImage = {
  width: 300,
  height: 600
} as HTMLImageElement;

describe("Test du composant ModifierEpaisseurLignes", () => {
  test("Lorsque je sélectionne une nouvelle valeur pour l'épaisseur de mes lignes, mon état maître est appelé avec cette nouvelle valeur", () => {
    const mockCtx = {
      drawImage: vi.fn()
    };

    Object.defineProperty(HTMLCanvasElement.prototype, "getContext", {
      value: vi.fn(() => mockCtx),
      configurable: true
    });

    const mockEtatImage = new EtatImage(mockImage.width, mockImage.height, mockImage);

    const spyChangerEpaisseurLignes = vi.spyOn(mockEtatImage, "changerEpaisseurLignes");

    const mockRedessiner = vi.fn();

    render(
      <ModifierEpaisseurLignes
        etatImage={mockEtatImage}
        redessiner={mockRedessiner}
      />
    );

    const inputEpaisseur = screen.getByTitle("Modifier l'épaisseur des lignes");

    const nouvelleEpaisseur = "2";

    fireEvent.change(inputEpaisseur, { target: { value: nouvelleEpaisseur } });

    expect(spyChangerEpaisseurLignes).toHaveBeenCalledWith(Number(nouvelleEpaisseur));
    expect(mockRedessiner).toHaveBeenCalled();
  });
});
