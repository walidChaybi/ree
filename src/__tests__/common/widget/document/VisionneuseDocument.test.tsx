import { act, render, screen, waitFor } from "@testing-library/react";
import {
  ajouteStyleIFrame,
  VisionneuseDocument
} from "@widget/document/VisionneuseDocument";
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
        titre="titre"
        contenu={imagePngVideBase64}
        typeMime={"application/pdf"}
      />
    );
  });
  await waitFor(() => {
    // on utilise une image base64 plutôt qu'un pdf pour les tests (prend beaucoup moins de place)
    const iframe = screen.getByTitle("titre") as HTMLIFrameElement;
    expect(iframe).toBeInTheDocument();
    expect(iframe.src).toBe(urlImagePngVideBase64 + "#zoom=page-fit");

    const appendChild = jest.fn();
    ajouteStyleIFrame(
      {
        current: {
          contentWindow: {
            document: {
              head: {
                appendChild
              }
            }
          }
        }
      },
      "image/png"
    );

    expect(appendChild).toBeCalledTimes(1);
  });
});
