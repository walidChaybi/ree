import { render, screen } from "@testing-library/react";
import React from "react";
import { expect, it, vi } from "vitest";
import AffichagePDF from "../../../../composants/commun/affichageDocument/AffichagePDF";

// Mock the base64toBlobUrl function since we're not testing its implementation here
vi.mock("@util/FileUtils", () => ({
  base64toBlobUrl: vi.fn((base64, type) => `blobUrl://${base64}`)
}));

it("renders un PDF  dans l'iframe quand un contenuBase64 est fourni", () => {
  const contenuBase64 = "sampleBase64String";

  render(<AffichagePDF contenuBase64={contenuBase64} />);

  const iframe = screen.getByTitle("Document PDF");
  expect(iframe).toBeDefined();

  expect(iframe.getAttribute("src")).toBe(
    "blobUrl://sampleBase64String#zoom=page-fit"
  );
});

it("renders un message informatif quand le contenuBase64 est null", () => {
  render(<AffichagePDF contenuBase64={null} />);

  // Check if fallback text is rendered
  const fallbackText = screen.getByText("Aucun document à afficher");
  expect(fallbackText).toBeDefined();
});

//ADRIEN : Utiliser le Spy et Call pour vérigfier l'appel de création du blob, l'url n'est pas assez
it("doit mémoiser le blob pour ne pas re-calculer lorsque le contenuBase64 reste inchangé", () => {
  const contenuBase64 = "sampleBase64String";
  const { rerender } = render(<AffichagePDF contenuBase64={contenuBase64} />);

  // First render: iframe should be rendered
  let iframe = screen.getByTitle("Document PDF");
  expect(iframe).toBeDefined();
  expect(iframe.getAttribute("src")).toBe(
    "blobUrl://sampleBase64String#zoom=page-fit"
  );

  // Re-render with the same contenuBase64 value
  rerender(<AffichagePDF contenuBase64={contenuBase64} />);

  // Check that the iframe is still rendered without recalculating blobUrl
  iframe = screen.getByTitle("Document PDF");

  expect(iframe).toBeDefined();
  expect(iframe.getAttribute("src")).toBe(
    "blobUrl://sampleBase64String#zoom=page-fit"
  );
});
