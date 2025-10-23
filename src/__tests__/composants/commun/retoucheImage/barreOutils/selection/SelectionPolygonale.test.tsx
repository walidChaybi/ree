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

let mockCtx: Partial<CanvasRenderingContext2D>;

describe("Test du composant SelectionPolygonale", () => {
  beforeEach(() => {
    mockCtx = {
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

  test("Lorsque j'ai créé un point et que je bouge ma souris, une ligne temporaire apparaît entre le point précédent et la position de ma souris", () => {
    rendreComposant();

    const canvas = screen.getByLabelText("Image en cours de retouche");

    const spyRedessiner = vi.spyOn(UtilitaireRetoucheImage, "redessiner");
    const spyDeplaceA = vi.spyOn(mockCtx, "moveTo");
    const spyDessinerLigne = vi.spyOn(mockCtx, "lineTo");

    fireEvent.click(screen.getByTitle("Sélection polygonale"));

    const premierPoint = {
      clientX: 20,
      clientY: 30
    };

    const positionSouris = {
      clientX: 110,
      clientY: 39
    };

    fireEvent.mouseDown(canvas, premierPoint);
    fireEvent.mouseMove(canvas, positionSouris);

    expect(spyRedessiner).toHaveBeenCalled();

    const parametresRedessiner = spyRedessiner.mock.calls[spyRedessiner.mock.calls.length - 1][0];

    expect(parametresRedessiner.outilSelectionne).toBe("selectionPolygonale");
    expect(parametresRedessiner.positionSouris).toStrictEqual({ x: positionSouris.clientX, y: positionSouris.clientY });

    expect(spyDeplaceA).toHaveBeenCalledWith(premierPoint.clientX, premierPoint.clientY);
    expect(spyDessinerLigne).toHaveBeenCalledWith(positionSouris.clientX, positionSouris.clientY);
    expect(mockCtx.strokeStyle).toBe("red");
  });

  test("Lorsque j'ai créé un premier point, à chaque nouveau clic sur l'image, un nouveau côté du polygone est créé", () => {
    const { container } = rendreComposant();

    const canvas = screen.getByLabelText("Image en cours de retouche");

    fireEvent.click(screen.getByTitle("Sélection polygonale"));

    const pointsSelectionPolygonale = [
      {
        clientX: 20,
        clientY: 30
      },
      {
        clientX: 110,
        clientY: 39
      },
      {
        clientX: 48,
        clientY: 67
      }
    ];

    pointsSelectionPolygonale.forEach(point => {
      fireEvent.mouseDown(canvas, point);
    });

    const selectionPolygonaleTemporaire = container.querySelector("#selection-polygonale-temporaire");

    expect(selectionPolygonaleTemporaire).not.toBeNull();
    expect(container.querySelector("#selection-polygonale")).toBeNull();

    expect(selectionPolygonaleTemporaire?.querySelectorAll("line")).toHaveLength(2);

    fireEvent.mouseDown(canvas, {
      clientX: 32,
      clientY: 61
    });

    expect(selectionPolygonaleTemporaire?.querySelectorAll("line")).toHaveLength(3);
  });

  test("Lorsque j'ai plusieurs points existant, si je clique proche de mon point de départ, alors le polygone final se créé", () => {
    const { container } = rendreComposant();

    const canvas = screen.getByLabelText("Image en cours de retouche");

    fireEvent.click(screen.getByTitle("Sélection polygonale"));

    const pointsSelectionPolygonale = [
      {
        clientX: 20,
        clientY: 30
      },
      {
        clientX: 110,
        clientY: 39
      },
      {
        clientX: 48,
        clientY: 67
      }
    ];

    pointsSelectionPolygonale.forEach(point => {
      fireEvent.mouseDown(canvas, point);
    });

    expect(container.querySelector("#selection-polygonale-temporaire")).not.toBeNull();
    expect(container.querySelector("#selection-polygonale")).toBeNull();

    fireEvent.mouseDown(canvas, {
      clientX: 21,
      clientY: 33
    });

    expect(container.querySelector("#selection-polygonale-temporaire")).toBeNull();
    expect(container.querySelector("#selection-polygonale")).not.toBeNull();
  });
});
