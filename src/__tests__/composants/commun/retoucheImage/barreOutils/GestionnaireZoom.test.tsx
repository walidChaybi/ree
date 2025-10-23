import EtatImage from "@model/retoucheImage/EtatImage";
import { fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import Canvas from "../../../../../composants/commun/retoucheImage/Canvas";

const mockImage = {
  width: 300,
  height: 600
} as HTMLImageElement;

const rendreComposant = () => {
  const mockEtatImage = new EtatImage(mockImage.width, mockImage.height, mockImage);

  return render(
    <Canvas
      tailleCanvas={{ largeur: 300, hauteur: 600 }}
      etatImage={mockEtatImage}
      pageCourante={0}
    />
  );
};

describe("Test du composant GestionnaireZoom", () => {
  beforeEach(() => {
    const mockCtx: Partial<CanvasRenderingContext2D> = {
      drawImage: vi.fn(),
      setTransform: vi.fn(),
      clearRect: vi.fn()
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

  test("Lorsque je roule la molette de la souris vers l'avant, la valeur du zoom augmente de 10%", () => {
    rendreComposant();

    const canvas = screen.getByLabelText("Image en cours de retouche");

    expect(screen.getByLabelText("Pourcentage de zoom actuel").textContent).toBe("100 %");

    fireEvent.wheel(canvas, { deltaY: -1 }); // un deltaY inférieur à 0 correspond à un coup de molette vers l'avant

    expect(screen.getByLabelText("Pourcentage de zoom actuel").textContent).toBe("110 %");
  });

  test("Lorsque je roule la molette de la souris vers l'arrière, la valeur du zoom réduit de 10%", () => {
    rendreComposant();

    const canvas = screen.getByLabelText("Image en cours de retouche");

    expect(screen.getByLabelText("Pourcentage de zoom actuel").textContent).toBe("100 %");

    fireEvent.wheel(canvas, { deltaY: -1 });

    expect(screen.getByLabelText("Pourcentage de zoom actuel").textContent).toBe("110 %");

    fireEvent.wheel(canvas, { deltaY: 1 }); // un deltaY supérieur à 0 correspond à un coup de molette vers l'arrière

    expect(screen.getByLabelText("Pourcentage de zoom actuel").textContent).toBe("100 %");
  });

  test("Lorsque je clique sur le bouton 'Zoomer', la valeur du zoom augmentre de 10%", () => {
    rendreComposant();

    const boutonZoomer = screen.getByTitle("Zoomer");

    expect(screen.getByLabelText("Pourcentage de zoom actuel").textContent).toBe("100 %");

    fireEvent.click(boutonZoomer);

    expect(screen.getByLabelText("Pourcentage de zoom actuel").textContent).toBe("110 %");
  });

  test("Lorsque je clique sur le bouton 'Dézoomer', la valeur du zoom augmentre de 10%", () => {
    rendreComposant();

    fireEvent.click(screen.getByTitle("Zoomer"));

    expect(screen.getByLabelText("Pourcentage de zoom actuel").textContent).toBe("110 %");

    const boutonDezoomer = screen.getByTitle("Dézoomer");

    fireEvent.click(boutonDezoomer);

    expect(screen.getByLabelText("Pourcentage de zoom actuel").textContent).toBe("100 %");
  });

  test("Lorsque je clique sur le bouton 'Réinitialiser le zoom', la valeur du zoom revient à 100%", () => {
    rendreComposant();

    fireEvent.click(screen.getByTitle("Zoomer"));

    expect(screen.getByLabelText("Pourcentage de zoom actuel").textContent).toBe("110 %");

    const boutonReinitialiserLeZoom = screen.getByTitle("Réinitialiser le zoom");

    fireEvent.click(boutonReinitialiserLeZoom);

    expect(screen.getByLabelText("Pourcentage de zoom actuel").textContent).toBe("100 %");
  });
});
