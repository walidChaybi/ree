import { CONFIG_GET_IMAGES_ACTE_FORMAT_TIFF } from "@api/configurations/etatCivil/acte/GetImagesActeFormatTiffConfigApi";
import { MockApi } from "@mock/appelsApi/MockApi";
import { imageTiffVideBase64, imageTiffVideBase64AvecMime } from "@mock/data/ImageTiff";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeAll, beforeEach, describe, expect, test, vi } from "vitest";
import RetoucheImage from "../../../../composants/commun/retoucheImage/RetoucheImage";

vi.mock("../../../../model/retoucheImage/EtatImage", () => {
  return {
    default: class MockEtatImage {
      lignes = [];

      constructor(
        public largeur: number,
        public hauteur: number,
        public img: HTMLImageElement
      ) {}
    }
  };
});

const mockIdActe = "9096cbb1-fd3b-4084-8503-220a8dfb35fc";
const mockImages = [
  {
    contenu: imageTiffVideBase64,
    noPage: 1
  },
  {
    contenu: imageTiffVideBase64AvecMime,
    noPage: 2
  }
];

describe("Test du composant RetoucheImage", () => {
  beforeAll(() => {
    class MockImage {
      width = 1000;
      height = 500;

      onload: () => void = () => {};

      set src(_src: string) {
        setTimeout(() => this.onload(), 0);
      }
    }

    const mockCtx: Partial<CanvasRenderingContext2D> = {
      drawImage: vi.fn(),
      setTransform: vi.fn(),
      clearRect: vi.fn(),
      putImageData: vi.fn()
    };

    Object.defineProperty(HTMLCanvasElement.prototype, "getContext", {
      value: vi.fn(() => mockCtx),
      configurable: true
    });

    const mockImageData = class {
      data: Uint8ClampedArray;
      width: number;
      height: number;

      constructor(data: Uint8ClampedArray, width: number, height: number) {
        this.data = data;
        this.width = width;
        this.height = height;
      }
    };

    Object.defineProperty(window, "ImageData", {
      value: vi.fn((data: Uint8ClampedArray, width: number, height: number) => new mockImageData(data, width, height)),
      configurable: true
    });

    vi.stubGlobal("Image", MockImage);
  });

  beforeEach(() => {
    MockApi.deployer(CONFIG_GET_IMAGES_ACTE_FORMAT_TIFF, { path: { idActe: mockIdActe } }, { data: mockImages });
  });

  afterEach(() => {
    MockApi.stopMock();
  });

  test("Le composant s'affiche correctement", async () => {
    const { container } = render(<RetoucheImage idActe={mockIdActe} />);

    await waitFor(() => {
      expect(container.querySelector("#retouche-image")).not.toBeNull();
    });

    await waitFor(() => {
      expect(screen.getByLabelText("Image en cours de retouche").style.cursor).toBe("grab");
    });

    expect(container).toMatchSnapshot();
  });

  test("SI il n'y a aucune image à afficher, ALORS un message l'indiquant est présent", async () => {
    render(<RetoucheImage idActe="" />);

    expect(screen.getByText("Aucune image à afficher")).not.toBeNull();
  });

  test("Lorsque je clique sur le bouton 'Page suivante', je passe bien à la page suivante", async () => {
    const { container } = render(<RetoucheImage idActe={mockIdActe} />);

    await waitFor(() => {
      expect(container.querySelector("#retouche-image")).not.toBeNull();
    });

    expect(screen.queryByText("Page 1 / 2")).toBeDefined();

    fireEvent.click(screen.getByRole("button", { name: /Page suivante/i }));

    expect(screen.queryByText("Page 2 / 2")).toBeDefined();
  });

  test("Lorsque je clique sur le bouton 'Page précédente', je passe bien à la page précédente", async () => {
    const { container } = render(<RetoucheImage idActe={mockIdActe} />);

    await waitFor(() => {
      expect(container.querySelector("#retouche-image")).not.toBeNull();
    });

    fireEvent.click(screen.getByRole("button", { name: /Page suivante/i }));

    expect(screen.queryByText("Page 2 / 2")).toBeDefined();

    fireEvent.click(screen.getByRole("button", { name: /Page précédente/i }));

    expect(screen.queryByText("Page 1 / 2")).toBeDefined();
  });
});
