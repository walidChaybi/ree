import { render } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import FenetreExterne from "../../../../composants/commun/conteneurs/FenetreExterne";

describe("Test du composant FenetreExterne", () => {
  test("La fenêtre externe affiche correctement son contenu", () => {
    const mockWindowOpen = vi.fn().mockReturnValue({
      document: document,
      addEventListener: (nomEvent: string, listener: () => void) => (nomEvent === "load" ? listener() : null),
      removeEventListener: () => {},
      close: () => {}
    });
    globalThis.window.open = mockWindowOpen;

    render(
      <FenetreExterne
        largeur={100}
        hauteur={200}
        ratioLargeur={0.5}
        ratioHauteur={0.5}
        gauche={100}
        haut={100}
      >
        <div>{"Contenu fenêtre externe"}</div>
      </FenetreExterne>
    );

    expect(mockWindowOpen).toHaveBeenCalledWith("/rece/rece-ui/fenetre-externe.html", "_blank", "width=50,height=100,left=100,top=100");
    expect(document.body.lastChild).toMatchSnapshot();
  });
});
