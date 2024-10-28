import { VisionneuseActe } from "@composant/visionneuseActe/VisionneuseActe";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";

describe("Display pdf Iframe", () => {
  test("Affichage par défaut", async () => {
    render(<VisionneuseActe idActe="" />);
    const loading = screen.getByRole("progressbar");
    expect(loading).toBeDefined();
  });

  test("Affiche le bouton switch si l'acte est reecrit", async () => {
    render(
      <VisionneuseActe
        idActe=""
        estReecrit={true}
      />
    );
    const button = screen.getByText(/Voir acte/);
    expect(button).toBeDefined();
    const loading = screen.getByRole("progressbar");
    expect(loading).toBeDefined();
  });

  test("Affiche une iframe", async () => {
    // Mock link creation
    window.URL.createObjectURL = vi.fn(() => "url_test");
    render(<VisionneuseActe idActe="b41079a5-9e8d-478c-b04c-c4c4ey86537g" />);
    await waitFor(() => {
      const linkElement = screen.getByTitle("Visionneuse PDF");
      expect(linkElement).toBeDefined();
      expect(document.querySelector("iframe")?.getAttribute("src")).toBe("url_test#zoom=page-fit");
      expect(screen.queryByRole("progressbar")).toBeNull();
    });
  });

  test("Clique sur le switch acte, appelle un acte texte", async () => {
    // Mock link creation
    window.URL.createObjectURL = vi.fn(() => "url_test");
    render(
      <VisionneuseActe
        idActe="b41079a5-9e8d-478c-b04c-c4c4ey86537g"
        estReecrit={true}
      />
    );
    await waitFor(() => {
      const linkElement = screen.getByTitle("Visionneuse PDF");
      expect(linkElement).toBeDefined();
      expect(document.querySelector("iframe")?.getAttribute("src")).toBe("url_test#zoom=page-fit");
      expect(screen.queryByRole("progressbar")).toBeNull();
    });

    const button = screen.getByText(/Voir acte/);
    await waitFor(() => {
      expect(button).toBeDefined();
    });

    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.queryByRole("progressbar")).toBeNull();
      expect(document.querySelector("iframe")?.getAttribute("src")).toBe("url_test#zoom=page-fit");
      expect(screen.getByText(/Voir extrait repris/)).toBeDefined();
    });
  });
});
