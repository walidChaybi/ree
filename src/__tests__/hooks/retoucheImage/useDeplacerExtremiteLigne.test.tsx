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

describe("Test du hook useDeplacerExtremiteLigne", () => {
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

  test("Lorsqu'une ligne existe sur mon image et que je clique sur une de ses extremité, celle-ci est extraite de l'état maître", () => {
    const mockEtatImage = new EtatImage(mockImage.width, mockImage.height, mockImage);

    const spyExtraireLigne = vi.spyOn(mockEtatImage, "extraireLigne");

    rendreComposant(mockEtatImage);
    tracerligneMock();

    const canvas = screen.getByLabelText("Image en cours de retouche");

    fireEvent.click(screen.getByTitle("Modifier mes lignes"));

    fireEvent.mouseDown(canvas, debutLigne);

    expect(spyExtraireLigne).toHaveBeenCalled();
  });

  test("Lorsque je reste cliqué sur l'extremité de début d'une ligne extraite et que je déplace ma souris, l'extremité se déplace en même temps", () => {
    const spyDeplacerA = vi.spyOn(mockCtx, "moveTo");
    const spyTracerLigne = vi.spyOn(mockCtx, "lineTo");

    rendreComposant();
    tracerligneMock();

    const canvas = screen.getByLabelText("Image en cours de retouche");

    fireEvent.click(screen.getByTitle("Modifier mes lignes"));

    const nouveauPointSurCanvas = { clientX: 114, clientY: 176 };

    fireEvent.mouseDown(canvas, debutLigne);
    fireEvent.mouseMove(canvas, nouveauPointSurCanvas);

    expect(spyDeplacerA).toHaveBeenCalledWith(nouveauPointSurCanvas.clientX, nouveauPointSurCanvas.clientY);
    expect(spyTracerLigne).toHaveBeenCalledWith(finLigne.clientX, finLigne.clientY);
  });

  test("Lorsque je reste cliqué sur l'extremité de fin d'une ligne extraite et que je déplace ma souris, l'extremité se déplace en même temps", () => {
    const spyDeplacerA = vi.spyOn(mockCtx, "moveTo");
    const spyTracerLigne = vi.spyOn(mockCtx, "lineTo");

    rendreComposant();
    tracerligneMock();

    const canvas = screen.getByLabelText("Image en cours de retouche");

    fireEvent.click(screen.getByTitle("Modifier mes lignes"));

    const nouveauPointSurCanvas = { clientX: 189, clientY: 208 };

    fireEvent.mouseDown(canvas, finLigne);
    fireEvent.mouseMove(canvas, nouveauPointSurCanvas);

    expect(spyDeplacerA).toHaveBeenCalledWith(debutLigne.clientX, debutLigne.clientY);
    expect(spyTracerLigne).toHaveBeenCalledWith(nouveauPointSurCanvas.clientX, nouveauPointSurCanvas.clientY);
  });

  test("Lorsque j'ai déplacé l'extremité de début de ma ligne et que je la lâche, ma ligne est redessinée dans l'état maître avec les nouvelles coordonnées", () => {
    const mockEtatImage = new EtatImage(mockImage.width, mockImage.height, mockImage);

    rendreComposant(mockEtatImage);
    tracerligneMock();

    const spyReintegrerLigne = vi.spyOn(mockEtatImage, "reintegrerLigne");

    const canvas = screen.getByLabelText("Image en cours de retouche");

    fireEvent.click(screen.getByTitle("Modifier mes lignes"));

    const nouveauPointSurCanvas = { clientX: 114, clientY: 176 };

    fireEvent.mouseDown(canvas, debutLigne);
    fireEvent.mouseMove(canvas, nouveauPointSurCanvas);
    fireEvent.mouseUp(canvas, nouveauPointSurCanvas);

    const deltaX = nouveauPointSurCanvas.clientX - debutLigne.clientX;
    const deltaY = nouveauPointSurCanvas.clientY - debutLigne.clientY;

    expect(spyReintegrerLigne).toHaveBeenCalledWith(mockEtatImage.lignes[mockEtatImage.lignes.length - 1].id, deltaX, deltaY, ["debut"]);

    expect(mockEtatImage.lignes[mockEtatImage.lignes.length - 1].debutLigne).toStrictEqual({
      x: nouveauPointSurCanvas.clientX,
      y: nouveauPointSurCanvas.clientY
    });

    expect(mockEtatImage.lignes[mockEtatImage.lignes.length - 1].finLigne).toStrictEqual({
      x: finLigne.clientX,
      y: finLigne.clientY
    });
  });

  test("Lorsque j'ai déplacé l'extremité de fin de ma ligne et que je la lâche, ma ligne est redessinée dans l'état maître avec les nouvelles coordonnées", () => {
    const mockEtatImage = new EtatImage(mockImage.width, mockImage.height, mockImage);

    rendreComposant(mockEtatImage);
    tracerligneMock();

    const spyReintegrerLigne = vi.spyOn(mockEtatImage, "reintegrerLigne");

    const canvas = screen.getByLabelText("Image en cours de retouche");

    fireEvent.click(screen.getByTitle("Modifier mes lignes"));

    const nouveauPointSurCanvas = { clientX: 189, clientY: 208 };

    fireEvent.mouseDown(canvas, finLigne);
    fireEvent.mouseMove(canvas, nouveauPointSurCanvas);
    fireEvent.mouseUp(canvas, nouveauPointSurCanvas);

    const deltaX = nouveauPointSurCanvas.clientX - finLigne.clientX;
    const deltaY = nouveauPointSurCanvas.clientY - finLigne.clientY;

    expect(spyReintegrerLigne).toHaveBeenCalledWith(mockEtatImage.lignes[mockEtatImage.lignes.length - 1].id, deltaX, deltaY, ["fin"]);

    expect(mockEtatImage.lignes[mockEtatImage.lignes.length - 1].debutLigne).toStrictEqual({
      x: debutLigne.clientX,
      y: debutLigne.clientY
    });

    expect(mockEtatImage.lignes[mockEtatImage.lignes.length - 1].finLigne).toStrictEqual({
      x: nouveauPointSurCanvas.clientX,
      y: nouveauPointSurCanvas.clientY
    });
  });
});
