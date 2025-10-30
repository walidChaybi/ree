import EtatImage from "@model/retoucheImage/EtatImage";
import { fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import Canvas from "../../../composants/commun/retoucheImage/Canvas";

const mockImage = {
  width: 300,
  height: 600
} as HTMLImageElement;

const debutLigne = { clientX: 120, clientY: 200 };
const finLigne = { clientX: 160, clientY: 210 };

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

const tracerligneMock = () => {
  fireEvent.click(screen.getByTitle("Tracer une ligne"));

  const canvas = screen.getByLabelText("Image en cours de retouche");

  fireEvent.mouseDown(canvas, debutLigne);
  fireEvent.mouseDown(canvas, finLigne);
};

let mockCtx: Partial<CanvasRenderingContext2D>;

describe("Test du hook useDeplacerLigne", () => {
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

  test("Lorsqu'une ligne existe sur mon image et que je clique dessus, le déplacement de celle-ci débute", () => {
    const mockEtatImage = new EtatImage(mockImage.width, mockImage.height, mockImage);

    const spyDebuterDeplacementLigne = vi.spyOn(mockEtatImage, "debuterDeplacementLigne");

    rendreComposant(mockEtatImage);
    tracerligneMock();

    const canvas = screen.getByLabelText("Image en cours de retouche");

    fireEvent.click(screen.getByTitle("Modifier mes lignes"));

    const pointSurLigne = { clientX: 132, clientY: 201 };

    fireEvent.mouseDown(canvas, pointSurLigne);

    expect(spyDebuterDeplacementLigne).toHaveBeenCalled();
  });

  test("Lorsque je reste cliqué sur une ligne extraite et que je déplace ma souris, ma ligne se déplace en même temps", () => {
    const spyDeplacerA = vi.spyOn(mockCtx, "moveTo");
    const spyTracerLigne = vi.spyOn(mockCtx, "lineTo");

    rendreComposant();
    tracerligneMock();

    const canvas = screen.getByLabelText("Image en cours de retouche");

    fireEvent.click(screen.getByTitle("Modifier mes lignes"));

    const pointSurLigne = { clientX: 132, clientY: 201 };
    const nouveauPointSurCanvas = { clientX: 148, clientY: 218 };

    fireEvent.mouseDown(canvas, pointSurLigne);
    fireEvent.mouseMove(canvas, nouveauPointSurCanvas);

    const deltaX = nouveauPointSurCanvas.clientX - pointSurLigne.clientX;
    const deltaY = nouveauPointSurCanvas.clientY - pointSurLigne.clientY;

    const nouveauDebutLigne = {
      clientX: debutLigne.clientX + deltaX,
      clientY: debutLigne.clientY + deltaY
    };

    const nouvelleFinLigne = {
      clientX: finLigne.clientX + deltaX,
      clientY: finLigne.clientY + deltaY
    };

    expect(spyDeplacerA).toHaveBeenCalledWith(nouveauDebutLigne.clientX, nouveauDebutLigne.clientY);
    expect(spyTracerLigne).toHaveBeenCalledWith(nouvelleFinLigne.clientX, nouvelleFinLigne.clientY);
  });

  test("Lorsque j'ai déplacé ma ligne et que je la lâche, celle-ci est redessinée dans l'état maître à l'endroit où je la lâche", () => {
    const mockEtatImage = new EtatImage(mockImage.width, mockImage.height, mockImage);

    rendreComposant(mockEtatImage);
    tracerligneMock();

    const spyFinaliserDeplacementLigne = vi.spyOn(mockEtatImage, "finaliserDeplacementLigne");

    const canvas = screen.getByLabelText("Image en cours de retouche");

    fireEvent.click(screen.getByTitle("Modifier mes lignes"));

    const pointSurLigne = { clientX: 132, clientY: 201 };
    const nouveauPointSurCanvas = { clientX: 148, clientY: 218 };

    fireEvent.mouseDown(canvas, pointSurLigne);
    fireEvent.mouseMove(canvas, nouveauPointSurCanvas);
    fireEvent.mouseUp(canvas, nouveauPointSurCanvas);

    const deltaX = nouveauPointSurCanvas.clientX - pointSurLigne.clientX;
    const deltaY = nouveauPointSurCanvas.clientY - pointSurLigne.clientY;

    const nouveauDebutLigne = {
      clientX: debutLigne.clientX + deltaX,
      clientY: debutLigne.clientY + deltaY
    };

    const nouvelleFinLigne = {
      clientX: finLigne.clientX + deltaX,
      clientY: finLigne.clientY + deltaY
    };

    expect(spyFinaliserDeplacementLigne).toHaveBeenCalledWith(mockEtatImage.lignes[mockEtatImage.lignes.length - 1].id, deltaX, deltaY, [
      "debut",
      "fin"
    ]);

    expect(mockEtatImage.lignes[mockEtatImage.lignes.length - 1].debutLigne).toStrictEqual({
      x: nouveauDebutLigne.clientX,
      y: nouveauDebutLigne.clientY
    });

    expect(mockEtatImage.lignes[mockEtatImage.lignes.length - 1].finLigne).toStrictEqual({
      x: nouvelleFinLigne.clientX,
      y: nouvelleFinLigne.clientY
    });
  });
});
