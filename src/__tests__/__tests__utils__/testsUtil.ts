import { mappingRequeteDelivrance } from "@hook/requete/DetailRequeteHook";
import { ChoixDelivrance } from "@model/requete/enum/ChoixDelivrance";
import { fireEvent, waitFor } from "@testing-library/react";
import { RouteObject, createMemoryRouter } from "react-router-dom";
import { expect, vi } from "vitest";
import { urlImagePngVideBase64 } from "../../mock/data/ImagePng";

function dataURLtoFile(dataurl: string, filename: string): File {
  const arr = dataurl.split(",");
  const mime = arr[0]!.match(/:(.*?);/)![1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }

  return new File([u8arr], filename, { type: mime });
}

const pngFile = dataURLtoFile(urlImagePngVideBase64, "hello.png");
export const pngFiles = [pngFile];
export const inputPngFiles = {
  item: (index: number) => pngFiles[index],
  ...pngFiles
};

export function getRequeteWithChoixDelivrance(
  requete: any,
  choixDelivrance: ChoixDelivrance
) {
  return {
    ...mappingRequeteDelivrance(requete),
    choixDelivrance
  };
}

export function mockFenetreFicheTestFunctions() {
  const globalAny: any = global;
  globalAny.URL.createObjectURL = vi.fn();
  globalAny.scroll = vi.fn();
  globalAny.open = () => {
    return {
      ...window,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn()
    };
  };
  globalAny.close = vi.fn();
}

export function renseigneChampsRecherche(
  screen: any,
  nomChamp: string,
  valeurChamp: string
) {
  const autocomplete = screen.getByTestId("autocomplete");
  const champRecherche = screen.getByLabelText(nomChamp) as HTMLInputElement;
  autocomplete.focus();

  fireEvent.change(champRecherche, {
    target: { value: valeurChamp }
  });

  waitFor(() => {
    expect(screen.getByText(valeurChamp)).toBeDefined();
  });

  fireEvent.click(screen.getByText(valeurChamp));
}

export function deepCopie(objet: any) {
  return JSON.parse(JSON.stringify(objet));
}

export function createTestingRouter(
  routes: RouteObject[],
  initialEntries: string[]
) {
  return createMemoryRouter(
    routes.map(route => {
      return { path: route.path, element: route.element };
    }),
    {
      initialEntries
    }
  );
}
