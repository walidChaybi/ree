import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import ConteneurDocument from "../../../../composants/commun/conteneurs/ConteneurDocument";
import DocumentTexte from "../../../../composants/commun/conteneurs/DocumentTexte";

describe("Test des composants conteneur de documents texte", () => {
  describe("Test de composant ConteneurDocument", () => {
    const mockImpression = (flagErreur?: "ERR_WINDOW_OPEN" | "AUCUN_DOCUMENT") => {
      type TElemPage = {
        innerHTML: string;
        style: { [cle: string]: string };
      };

      const fenetreImpression = {
        document: {
          createElement: () => ({ innerHTML: "", style: {} }),
          body: {
            appendChild: (elem: TElemPage) => fenetreImpression.pages.push(elem)
          },
          head: {
            appendChild: () => {}
          },
          close: () => {},
          title: ""
        },
        pages: [] as TElemPage[],
        focus: () => {},
        print: () => {},
        close: vi.fn()
      };

      window.open = vi.fn().mockReturnValue(flagErreur === "ERR_WINDOW_OPEN" ? null : fenetreImpression);
      document.querySelectorAll = vi.fn().mockReturnValue(flagErreur === "AUCUN_DOCUMENT" ? [] : [{ innerHTML: "Test 1" }]);

      return { dernierActionImpression: fenetreImpression.close, donneesFenetre: fenetreImpression };
    };

    test("Le conteneur affiche correctement un document", () => {
      const { container } = render(
        <ConteneurDocument>
          <div>{"Je suis un document"}</div>
        </ConteneurDocument>
      );

      expect(container.firstChild).toMatchSnapshot();
    });

    test("Le conteneur affiche correctement un document imprimable", () => {
      const { container } = render(
        <ConteneurDocument imprimable>
          <div>{"Je suis un document"}</div>
        </ConteneurDocument>
      );

      expect(container.firstChild).toMatchSnapshot();
    });

    test("Le conteneur effectue correctement l'impression du document", () => {
      render(
        <ConteneurDocument imprimable>
          <div>{"Je suis un document"}</div>
        </ConteneurDocument>
      );

      const { dernierActionImpression: derniereActionErreurWindow } = mockImpression("ERR_WINDOW_OPEN");
      fireEvent.click(screen.getByTitle("Imprimer"));

      expect(derniereActionErreurWindow).not.toHaveBeenCalled();

      const { dernierActionImpression: derniereActionErreurAucunDocument } = mockImpression("AUCUN_DOCUMENT");
      fireEvent.click(screen.getByTitle("Imprimer"));

      expect(derniereActionErreurAucunDocument).not.toHaveBeenCalled();

      const { dernierActionImpression: derniereActionValide, donneesFenetre } = mockImpression();
      fireEvent.click(screen.getByTitle("Imprimer"));

      expect(derniereActionValide).toHaveBeenCalled();
      expect(donneesFenetre.document.title).toBe("Aperçu projet acte");
      expect(donneesFenetre.pages).toStrictEqual([
        {
          style: {
            fontSize: "13px",
            height: "100vh",
            display: "flex",
            fontFamily: "Liberation Mono"
          },
          innerHTML: "Test 1"
        }
      ]);
    });
  });

  describe("Test du composant DocumentTexte", () => {
    test("Le composant s'affiche correctement", () => {
      global.ResizeObserver = vi.fn().mockImplementation(() => ({ disconnect: () => {}, observe: () => {}, unobserve: () => {} }));

      const { container } = render(
        <DocumentTexte>
          <div>{"Je suis un document"}</div>
        </DocumentTexte>
      );

      expect(container.firstChild).toMatchSnapshot();
    });
  });
});
