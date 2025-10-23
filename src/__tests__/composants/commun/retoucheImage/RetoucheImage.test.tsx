import { imagePngVideBase64 } from "@mock/data/ImagePng";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeAll, describe, expect, test, vi } from "vitest";
import RetoucheImage from "../../../../composants/commun/retoucheImage/RetoucheImage";

vi.mock("../../../../model/retoucheImage/EtatImage", () => {
  return {
    default: class MockEtatImage {
      constructor(
        public largeur: number,
        public hauteur: number,
        public img: HTMLImageElement
      ) {}
    }
  };
});

const mockImages = [imagePngVideBase64, imagePngVideBase64];

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

    vi.stubGlobal("Image", MockImage);
  });

  test("Le composant s'affiche correctement", async () => {
    const { container } = render(<RetoucheImage images={mockImages} />);

    await waitFor(() => {
      expect(container.querySelector("#retouche-image")).not.toBeNull();
    });

    expect(container).toMatchSnapshot();
  });

  test("SI il n'y a aucune image à afficher, ALORS un message l'indiquant est présent", async () => {
    render(<RetoucheImage images={[]} />);

    expect(screen.getByText("Aucune image à afficher")).not.toBeNull();
  });

  test("Lorsque je clique sur le bouton 'Page suivante', je passe bien à la page suivante", async () => {
    const { container } = render(<RetoucheImage images={mockImages} />);

    await waitFor(() => {
      expect(container.querySelector("#retouche-image")).not.toBeNull();
    });

    expect(screen.queryByText("Page 1 / 2")).toBeDefined();

    fireEvent.click(screen.getByRole("button", { name: /Page suivante/i }));

    expect(screen.queryByText("Page 2 / 2")).toBeDefined();
  });

  test("Lorsque je clique sur le bouton 'Page précédente', je passe bien à la page précédente", async () => {
    const { container } = render(<RetoucheImage images={mockImages} />);

    await waitFor(() => {
      expect(container.querySelector("#retouche-image")).not.toBeNull();
    });

    fireEvent.click(screen.getByRole("button", { name: /Page suivante/i }));

    expect(screen.queryByText("Page 2 / 2")).toBeDefined();

    fireEvent.click(screen.getByRole("button", { name: /Page précédente/i }));

    expect(screen.queryByText("Page 1 / 2")).toBeDefined();
  });
});
