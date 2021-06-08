import { render, screen, waitFor } from "@testing-library/react";
import React from "react";
import {
  imagePngVideBase64,
  urlImagePngVideBase64
} from "../../../../mock/data/ImagePng";
import { VisionneuseDocument } from "../../../../views/common/widget/document/VisionneuseDocument";

// @ts-ignore
global.URL.createObjectURL = jest.fn(() => urlImagePngVideBase64);
test("Attendu: VisionneuseDocument fonctionne correctement", async () => {
  render(
    <VisionneuseDocument
      titre="titre"
      contenu={imagePngVideBase64}
      typeMime={"application/pdf"}
    />
  );

  await waitFor(() => {
    // on utilise une image base64 plutôt qu'un pdf pour les tests (prend beaucoup moins de place)
    const iframe = screen.getByTitle("titre") as HTMLIFrameElement;
    expect(iframe).toBeInTheDocument();
    expect(iframe.src).toBe(urlImagePngVideBase64);
  });
});
