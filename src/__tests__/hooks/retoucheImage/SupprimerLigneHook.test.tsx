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

describe("Test du hook useSupprimerLigne", () => {
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

  test("Lorsqu'une ligne existe sur mon image et que je clique dessus, celle-ci est sélectionnée", () => {
    const mockEtatImage = new EtatImage(mockImage.width, mockImage.height, mockImage);

    const spySelectionnerLigne = vi.spyOn(mockEtatImage, "selectionnerLigne");

    rendreComposant(mockEtatImage);
    tracerligneMock();

    const canvas = screen.getByLabelText("Image en cours de retouche");

    fireEvent.click(screen.getByTitle("Modifier mes lignes"));

    const pointSurLigne = { clientX: 132, clientY: 201 };

    fireEvent.mouseDown(canvas, pointSurLigne);

    expect(spySelectionnerLigne).toHaveBeenCalled();
  });

  test("Lorsqu'une ligne est sélectionnée et que je clique sur la touche 'Delete', celle-ci est supprimée", () => {
    const mockEtatImage = new EtatImage(mockImage.width, mockImage.height, mockImage);

    const spyEffacerLigne = vi.spyOn(mockEtatImage, "effacerLigne");

    const { container } = rendreComposant(mockEtatImage);
    tracerligneMock();

    const canvas = screen.getByLabelText("Image en cours de retouche");

    fireEvent.click(screen.getByTitle("Modifier mes lignes"));

    const pointSurLigne = { clientX: 132, clientY: 201 };

    fireEvent.mouseDown(canvas, pointSurLigne);

    expect(mockEtatImage.lignes).toHaveLength(1);
    expect(mockEtatImage.lignes[0].selectionnee).toBe(true);
    expect(mockEtatImage.lignesSupprimees).toHaveLength(0);

    const idLigneASupprimer = mockEtatImage.lignes[0].id;

    fireEvent.keyDown(container, { key: "Delete" });

    expect(spyEffacerLigne).toHaveBeenCalledWith(idLigneASupprimer);
    expect(mockEtatImage.lignes).toHaveLength(0);
    expect(mockEtatImage.lignesSupprimees).toHaveLength(1);
  });
});
