import EtatImage from "@model/retoucheImage/EtatImage";
import { fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import Canvas from "../../../../../../composants/commun/retoucheImage/Canvas";
import UtilitaireRetoucheImage from "../../../../../../utils/UtilitaireRetoucheImage";

const mockImage = {
  width: 300,
  height: 600
} as HTMLImageElement;

const rendreComposant = (etatImage?: EtatImage) => {
  const mockEtatImage = etatImage ?? new EtatImage(mockImage.width, mockImage.height, mockImage);

  return render(
    <Canvas
      tailleCanvas={{ largeur: 300, hauteur: 600 }}
      etatImage={mockEtatImage}
      pageCourante={0}
    />
  );
};

describe("Test du composant SelectionRectangulaire", () => {
  beforeEach(() => {
    const mockCtx: Partial<CanvasRenderingContext2D> = {
      drawImage: vi.fn(),
      beginPath: vi.fn(),
      moveTo: vi.fn(),
      lineTo: vi.fn(),
      stroke: vi.fn(),
      setTransform: vi.fn(),
      clearRect: vi.fn(),
      setLineDash: vi.fn(),
      save: vi.fn(),
      restore: vi.fn()
    };

    Object.defineProperty(HTMLCanvasElement.prototype, "getContext", {
      value: vi.fn(() => mockCtx),
      configurable: true
    });

    Object.defineProperty(HTMLCanvasElement.prototype, "toDataURL", {
      value: vi.fn(() => "data:image/png;base64,MOCK_IMAGE"),
      configurable: true
    });

    global.Image = class {
      src = "";
    } as unknown as typeof Image;
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  test("Lorsque je clique sur le canvas une première fois, je débute une sélection rectangulaire entre le point cliqué et la position de ma souris", () => {
    const { container } = rendreComposant();

    const canvas = screen.getByLabelText("Image en cours de retouche");

    const spyRedessiner = vi.spyOn(UtilitaireRetoucheImage, "redessiner");

    fireEvent.click(screen.getByTitle("Sélection rectangulaire"));

    const debutSelectionRectangulaire = {
      clientX: 20,
      clientY: 32
    };

    const positionSouris = {
      clientX: 40,
      clientY: 64
    };

    fireEvent.mouseDown(canvas, debutSelectionRectangulaire);
    fireEvent.mouseMove(canvas, positionSouris);

    expect(container.querySelector("#selection-rectangulaire-temporaire")).not.toBeNull();
    expect(container.querySelector("#selection-rectangulaire")).toBeNull();

    expect(spyRedessiner).toHaveBeenCalled();

    const parametresRedessiner = spyRedessiner.mock.calls[spyRedessiner.mock.calls.length - 1][0];

    expect(parametresRedessiner.outilSelectionne).toBe("selectionRectangulaire");
    expect(parametresRedessiner.positionSouris).toStrictEqual({ x: positionSouris.clientX, y: positionSouris.clientY });
  });

  test("Lorsque j'ai une sélection rectangulaire en cours et que je clique une seconde fois sur mon canvas, un sélection rectangulaire définitivee est créée entre les deux points cliqués", () => {
    const { container } = rendreComposant();

    const canvas = screen.getByLabelText("Image en cours de retouche");

    const spyRedessiner = vi.spyOn(UtilitaireRetoucheImage, "redessiner");

    fireEvent.click(screen.getByTitle("Sélection rectangulaire"));

    const debutSelectionRectangulaire = {
      clientX: 20,
      clientY: 32
    };

    const finSelectionRectangulaire = {
      clientX: 40,
      clientY: 64
    };

    fireEvent.mouseDown(canvas, debutSelectionRectangulaire);
    fireEvent.mouseDown(canvas, finSelectionRectangulaire);

    expect(container.querySelector("#selection-rectangulaire-temporaire")).toBeNull();
    expect(container.querySelector("#selection-rectangulaire")).not.toBeNull();

    expect(spyRedessiner).toHaveBeenCalledTimes(2);
  });
});
