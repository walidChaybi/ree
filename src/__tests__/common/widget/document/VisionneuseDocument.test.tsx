import { act, render, screen, waitFor } from "@testing-library/react";
import { VisionneuseDocument } from "@widget/visionneuseDocument/VisionneuseDocument";
import React from "react";
import {
  imagePngVideBase64,
  urlImagePngVideBase64
} from "../../../../mock/data/ImagePng";

// @ts-ignore
global.URL.createObjectURL = jest.fn(() => urlImagePngVideBase64);
test("Attendu: VisionneuseDocument fonctionne correctement", async () => {
  await act(async () => {
    render(
      <VisionneuseDocument
        infoBulle="titre"
        contenuBase64={imagePngVideBase64}
        typeMime={"application/pdf"}
      />
    );
  });
  await waitFor(() => {
    // on utilise une image base64 plutôt qu'un pdf pour les tests (prend beaucoup moins de place)
    const iframe = screen.getByTitle("titre") as HTMLIFrameElement;
    expect(iframe).toBeInTheDocument();
    expect(iframe.src).toBe(urlImagePngVideBase64 + "#zoom=page-fit");

  });
});
