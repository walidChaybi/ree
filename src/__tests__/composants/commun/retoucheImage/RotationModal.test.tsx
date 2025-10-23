import EtatImage from "@model/retoucheImage/EtatImage";
import { render } from "@testing-library/react";
import { beforeEach, describe, expect, test, vi } from "vitest";
import RotationModal from "../../../../composants/commun/retoucheImage/RotationModal";

const mockImage = {
  width: 300,
  height: 600
} as HTMLImageElement;

const rendreComposant = () => {
  const mockEtatImage = new EtatImage(mockImage.width, mockImage.height, mockImage);

  return render(
    <RotationModal
      etatImage={mockEtatImage}
      setOutilSelectionne={() => {}}
    />
  );
};

describe("Test du composant RotationModal", () => {
  beforeEach(() => {
    const mockCtx: Partial<CanvasRenderingContext2D> = {
      drawImage: vi.fn(),
      setTransform: vi.fn(),
      clearRect: vi.fn(),
      save: vi.fn(),
      translate: vi.fn(),
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

  test("Le composant s'affiche correctement", () => {
    const { container } = rendreComposant();

    expect(container).toMatchSnapshot();
  });
});
