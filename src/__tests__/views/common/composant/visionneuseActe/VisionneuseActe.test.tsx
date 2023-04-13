import { VisionneuseActe } from "@composant/visionneuseActe/VisionneuseActe";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import React from "react";

describe("Display pdf Iframe", () => {
  test("Affichage par défaut", async () => {
    render(<VisionneuseActe idActe=""></VisionneuseActe>);
    const loading = screen.getByRole("progressbar");
    expect(loading).toBeInTheDocument();
  });

  test("Affiche le bouton switch si l'acte est reecrit", async () => {
    render(<VisionneuseActe idActe="" estReecrit={true}></VisionneuseActe>);
    const button = screen.getByText(/Texte saisi/);
    expect(button).toBeInTheDocument();
    const loading = screen.getByRole("progressbar");
    expect(loading).toBeInTheDocument();
  });

  test("Affiche une iframe", async () => {
    // Mock link creation
    window.URL.createObjectURL = jest.fn(() => "url_test");
    render(
      <VisionneuseActe idActe="b41079a5-9e8d-478c-b04c-c4c4ey86537g"></VisionneuseActe>
    );
    await waitFor(() => {
      const linkElement = screen.getByTitle("Visionneuse PDF");
      expect(linkElement).toBeInTheDocument();
    });
    expect(document.querySelector("iframe").getAttribute("src")).toBe(
      "url_test#zoom=page-fit"
    );
    expect(screen.queryByRole("progressbar")).toBeNull();
  });

  test("Clique sur le switch acte, appelle un acte texte", async () => {
    // Mock link creation
    window.URL.createObjectURL = jest.fn(() => "url_test");
    render(
      <VisionneuseActe
        idActe="b41079a5-9e8d-478c-b04c-c4c4ey86537g"
        estReecrit={true}
      ></VisionneuseActe>
    );
    await waitFor(() => {
      const linkElement = screen.getByTitle("Visionneuse PDF");
      expect(linkElement).toBeInTheDocument();
    });
    expect(document.querySelector("iframe").getAttribute("src")).toBe(
      "url_test#zoom=page-fit"
    );
    expect(screen.queryByRole("progressbar")).toBeNull();

    const button = screen.getByText(/Texte saisi/);
    expect(button).toBeInTheDocument();

    window.URL.createObjectURL = jest.fn(() => "url_test_click");
    fireEvent.click(button);
    await waitFor(() => {
      expect(screen.queryByRole("progressbar")).toBeNull();
    });
    expect(document.querySelector("iframe").getAttribute("src")).toBe(
      "url_test_click#zoom=page-fit"
    );
  });
});
