import {
  createEvent,
  fireEvent,
  render,
  waitFor
} from "@testing-library/react";
import React from "react";
import { act } from "react-test-renderer";
import { MimeType } from "../../../../ressources/MimeType";
import { RetoucheImage } from "../../../../views/common/composant/retoucheImage/RetoucheImage";

test("Attendu: Le retour de l'appel à la retouche d'image s'effectue correctement", async () => {
  const onRetoucheTerminee = jest.fn();
  // @ts-ignore
  const dispatchEventSpy = jest.spyOn(window.top, "dispatchEvent");

  // Rendu du composant avec une image: un évenement est lancé pour démarrer l'application native de retouche d'image (via la web extension)
  await act(async () => {
    render(
      <RetoucheImage
        images={["imageBase64"]}
        onRetoucheTerminee={onRetoucheTerminee}
      ></RetoucheImage>
    );
  });

  const detail = {
    fichiersModifies: [
      {
        contenuBase64: "imageBase64Modifiee",
        typeMime: MimeType.IMAGE_TIFF
      }
    ]
  };

  // Simulation du retour de l'application native retouche d'image (web extension)
  fireCustomEvent(detail);

  await waitFor(() => {
    expect(dispatchEventSpy).toHaveBeenCalledWith(expect.any(Event));
    //@ts-ignore
    expect(dispatchEventSpy.mock.calls[0][0].type).toBe(
      "retoucheimageWebextCall"
    );

    expect(onRetoucheTerminee).toBeCalledTimes(1);
    expect(onRetoucheTerminee).toHaveBeenCalledWith(["imageBase64Modifiee"]);
  });
});

test("Attendu: l'appel à la retouche d'image renvoie des erreurs", async () => {
  const onRetoucheTerminee = jest.fn();

  // Rendu du composant avec une image: un évenement est lancé pour démarrer l'application native de retouche d'image (via la web extension)
  await act(async () => {
    render(
      <RetoucheImage
        images={["imageBase64"]}
        onRetoucheTerminee={onRetoucheTerminee}
      ></RetoucheImage>
    );
  });

  const detail = {
    erreurs: [
      {
        code: "codeErreur",
        libelle: "libelleErreur",
        details: "detailsErreur"
      }
    ]
  };

  // Simulation du retour de l'application native retouche d'image (web extension) avec des erreurs
  fireCustomEvent(detail);

  await waitFor(() => {
    expect(onRetoucheTerminee).toBeCalledTimes(1);
    expect(onRetoucheTerminee).toHaveBeenCalledWith(undefined);
  });
});

function fireCustomEvent(detail: any) {
  fireEvent(
    window,
    //@ts-ignore
    createEvent(
      "retoucheimageWebextResponse",
      window,
      {
        detail,
        erreurs: []
      },
      { EventType: "CustomEvent" }
    )
  );
}
