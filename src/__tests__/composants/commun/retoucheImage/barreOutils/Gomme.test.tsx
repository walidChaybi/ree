import EtatImage from "@model/retoucheImage/EtatImage";
import { fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import Canvas from "../../../../../composants/commun/retoucheImage/Canvas";

const mockImage = {
  width: 300,
  height: 600
} as HTMLImageElement;

const RAYON = 20;

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

describe("Test du composant Gomme", () => {
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
      restore: vi.fn(),
      closePath: vi.fn(),
      clip: vi.fn()
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

  test("Lorsque la gomme est sélectionnée et que je clique sur l'image, la zone cliquée est gommée", () => {
    const mockEtatImage = new EtatImage(mockImage.width, mockImage.height, mockImage);

    rendreComposant(mockEtatImage);

    fireEvent.click(screen.getByTitle("Gommer"));

    const canvas = screen.getByLabelText("Image en cours de retouche");

    const spyEffacer = vi.spyOn(mockEtatImage, "effacer");

    const pointAEffacer = {
      clientX: 25,
      clientY: 123
    };

    fireEvent.mouseDown(canvas, pointAEffacer);

    expect(spyEffacer).toHaveBeenCalledWith(pointAEffacer.clientX, pointAEffacer.clientY, RAYON);
  });

  test("Lorsque la gomme est sélectionnée et que je me déplace sur l'image en restant cliqué, le contenu s'efface au passage de ma souris", () => {
    const mockEtatImage = new EtatImage(mockImage.width, mockImage.height, mockImage);

    rendreComposant(mockEtatImage);

    fireEvent.click(screen.getByTitle("Gommer"));

    const canvas = screen.getByLabelText("Image en cours de retouche");

    const spyEffacer = vi.spyOn(mockEtatImage, "effacer");

    const debutEffacement = {
      clientX: 25,
      clientY: 123
    };

    fireEvent.mouseDown(canvas, debutEffacement);

    fireEvent.mouseMove(canvas, {
      clientX: 30,
      clientY: 125
    });

    fireEvent.mouseMove(canvas, {
      clientX: 35,
      clientY: 128
    });

    expect(spyEffacer).toHaveBeenCalledTimes(3);

    expect(spyEffacer).toHaveBeenCalledWith(debutEffacement.clientX, debutEffacement.clientY, RAYON);
    expect(spyEffacer).toHaveBeenCalledWith(30, 125, RAYON);
    expect(spyEffacer).toHaveBeenCalledWith(35, 128, RAYON);
  });

  test("Lorsqu'une selection rectangulaire existe et que je tente de gommer à l'extérieur de celle-ci, rien ne se passe", () => {
    const mockEtatImage = new EtatImage(mockImage.width, mockImage.height, mockImage);

    rendreComposant(mockEtatImage);

    fireEvent.click(screen.getByTitle("Sélection rectangulaire"));

    const canvas = screen.getByLabelText("Image en cours de retouche");

    const spyEffacer = vi.spyOn(mockEtatImage, "effacer");
    const spyEffacerDansRectangle = vi.spyOn(mockEtatImage, "effacerDansRectangle");
    const spyEffacerDansPolygone = vi.spyOn(mockEtatImage, "effacerDansPolygone");

    const debutSelectionRectangulaire = {
      clientX: 40,
      clientY: 60
    };

    const finSelectionRectangulaire = {
      clientX: 80,
      clientY: 130
    };

    fireEvent.mouseDown(canvas, debutSelectionRectangulaire);
    fireEvent.mouseDown(canvas, finSelectionRectangulaire);

    fireEvent.click(screen.getByTitle("Gommer"));

    const pointHorsSelection = {
      clientX: 110,
      clientY: 124
    };

    fireEvent.mouseDown(canvas, pointHorsSelection);

    expect(spyEffacer).not.toHaveBeenCalled();
    expect(spyEffacerDansRectangle).not.toHaveBeenCalled();
    expect(spyEffacerDansPolygone).not.toHaveBeenCalled();
  });
});
