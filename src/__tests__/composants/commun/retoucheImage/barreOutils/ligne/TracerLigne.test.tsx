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

describe("Test du composant TracerLigne", () => {
  beforeEach(() => {
    mockCtx = {
      drawImage: vi.fn(),
      beginPath: vi.fn(),
      moveTo: vi.fn(),
      lineTo: vi.fn(),
      stroke: vi.fn(),
      setTransform: vi.fn(),
      clearRect: vi.fn(),
      setLineDash: vi.fn()
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

  test("Lorsque j'ai sélectionné l'outil 'tracerLigne' et que je clique à deux endroits sur le canvas, alors je trace une ligne", () => {
    const mockEtatImage = new EtatImage(mockImage.width, mockImage.height, mockImage);

    rendreComposant(mockEtatImage);

    const spyDessinerLigne = vi.spyOn(mockEtatImage, "dessinerLigne");

    const boutonTracerLigne = screen.getByTitle("Tracer une ligne");

    fireEvent.click(boutonTracerLigne);

    const canvas = screen.getByLabelText("Image en cours de retouche");

    const debutLigne = { clientX: 120, clientY: 200 };
    const finLigne = { clientX: 160, clientY: 210 };

    fireEvent.mouseDown(canvas, debutLigne);

    fireEvent.mouseDown(canvas, finLigne);

    expect(spyDessinerLigne).toHaveBeenCalledWith(debutLigne.clientX, debutLigne.clientY, finLigne.clientX, finLigne.clientY);
    expect(mockEtatImage.lignes).toHaveLength(1);
    expect(mockEtatImage.lignes[0].debutLigne).toStrictEqual({ x: debutLigne.clientX, y: debutLigne.clientY });
    expect(mockEtatImage.lignes[0].finLigne).toStrictEqual({ x: finLigne.clientX, y: finLigne.clientY });
  });

  test("Lorsque j'ai sélectionné le point de départ de ma nouvelle ligne et que je déplace ma souris sur le canvas, une ligne temporaire se dessine", () => {
    rendreComposant();

    const spyRedessiner = vi.spyOn(UtilitaireRetoucheImage, "redessiner");
    const spyDessinerLigneTemporaire = vi.spyOn(mockCtx, "setLineDash");

    const boutonTracerLigne = screen.getByTitle("Tracer une ligne");

    fireEvent.click(boutonTracerLigne);

    const canvas = screen.getByLabelText("Image en cours de retouche");

    const debutLigne = { clientX: 120, clientY: 200 };
    const potentielleFinLigne = { clientX: 145, clientY: 225 };

    fireEvent.mouseDown(canvas, debutLigne);

    fireEvent.mouseMove(canvas, potentielleFinLigne);

    expect(spyRedessiner).toHaveBeenCalled();
    expect(spyDessinerLigneTemporaire).toHaveBeenCalled();
  });
});
