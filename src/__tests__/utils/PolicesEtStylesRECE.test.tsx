import { act } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import PolicesEtStylesRECE from "../../utils/PolicesEtStylesRECE";

describe("Test de l'utilitaire des polices et styles RECE", () => {
  test("Chargement des polices", async () => {
    class BaseMockFontFace {
      family: string;
      source: string;
      descriptors: unknown;

      constructor(family: string, source: string, descriptors?: unknown) {
        this.family = family;
        this.source = source;
        this.descriptors = descriptors;
      }
    }

    const mockFontFace = (enErreur: boolean = false) =>
      class MockFontFace extends BaseMockFontFace {
        load(): Promise<string> {
          return enErreur ? Promise.reject() : Promise.resolve(this.source);
        }
      };

    const mockConsoleError = vi.fn();
    const mockDocument = { fonts: new Set<BaseMockFontFace>() };

    console.error = mockConsoleError;

    globalThis.FontFace = mockFontFace() as never;
    let documentTest = { ...mockDocument };
    globalThis.document = documentTest as never;

    await act(() => {
      PolicesEtStylesRECE.chargerPolices();
    });

    expect(Array.from(documentTest.fonts.values())).toStrictEqual([
      "url('/rece/rece-ui/fonts/Marianne/Marianne-Regular.woff')",
      "url('/rece/rece-ui/fonts/Marianne/Marianne-Regular_Italic.woff')",
      "url('/rece/rece-ui/fonts/Marianne/Marianne-Bold.woff')",
      "url('/rece/rece-ui/fonts/Marianne/Marianne-Bold_Italic.woff')",
      "url('/rece/rece-ui/fonts/Liberation/LiberationMono-Regular.ttf')",
      "url('/rece/rece-ui/fonts/Liberation/LiberationMono-Italic.ttf')",
      "url('/rece/rece-ui/fonts/Liberation/LiberationMono-Bold.ttf')",
      "url('/rece/rece-ui/fonts/Liberation/LiberationMono-BoldItalic.ttf')"
    ]);

    globalThis.FontFace = mockFontFace(true) as never;
    documentTest = { ...mockDocument };
    globalThis.document = documentTest as never;

    await act(() => {
      PolicesEtStylesRECE.chargerPolices();
    });
    expect(mockConsoleError).toHaveBeenNthCalledWith(1, 'Erreur lors du chargement de la police "Marianne-Regular".');
    expect(mockConsoleError).toHaveBeenNthCalledWith(2, 'Erreur lors du chargement de la police "Marianne-Regular_Italic".');
    expect(mockConsoleError).toHaveBeenNthCalledWith(3, 'Erreur lors du chargement de la police "Marianne-Bold".');
    expect(mockConsoleError).toHaveBeenNthCalledWith(4, 'Erreur lors du chargement de la police "Marianne-Bold_Italic".');
    expect(mockConsoleError).toHaveBeenNthCalledWith(5, 'Erreur lors du chargement de la police "Liberation Regular".');
    expect(mockConsoleError).toHaveBeenNthCalledWith(6, 'Erreur lors du chargement de la police "Liberation Italic".');
    expect(mockConsoleError).toHaveBeenNthCalledWith(7, 'Erreur lors du chargement de la police "Liberation Bold".');
    expect(mockConsoleError).toHaveBeenNthCalledWith(8, 'Erreur lors du chargement de la police "Liberation BoldItalic".');
  });

  test("Test de copie des styles et polices dans une fenêtre externe", () => {
    type TElementStyle = {
      listeStyles: string[];
      appendChild: (style: string) => void;
    };

    globalThis.document = {
      fonts: ["testPolice1", "testPolice2"],
      styleSheets: [{ cssRules: [{ cssText: "feuilleStyle1" }, { cssText: "feuilleStyle2" }] }],
      createElement: () => {
        const nouvelElementStyle: TElementStyle = {
          listeStyles: [],
          appendChild: (style: string) => nouvelElementStyle.listeStyles.push(style)
        };

        return nouvelElementStyle;
      },
      createTextNode: (style: string) => style
    } as never;

    const autreFenetre = {
      document: {
        fonts: new Set<string>(),
        head: {
          appendChild: (element: TElementStyle) => autreFenetre.listeStyleCopie.push(...element.listeStyles)
        }
      },
      listeStyleCopie: [] as string[]
    };

    PolicesEtStylesRECE.copieDansFenetreExterne(autreFenetre as unknown as Window);

    expect(Array.from(autreFenetre.document.fonts.values())).toStrictEqual(["testPolice1", "testPolice2"]);
    expect(autreFenetre.listeStyleCopie).toStrictEqual(["feuilleStyle1", "feuilleStyle2"]);
  });
});
