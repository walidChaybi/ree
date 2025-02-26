import { mappingRequeteDelivrance } from "@hook/requete/DetailRequeteHook";
import { IOfficier } from "@model/agent/IOfficier";
import { IService } from "@model/agent/IService";
import { IUtilisateur } from "@model/agent/IUtilisateur";
import { IFicheActe } from "@model/etatcivil/acte/IFicheActe";
import { IDecret } from "@model/etatcivil/commun/IDecret";
import { IRequeteDelivrance } from "@model/requete/IRequeteDelivrance";
import { ChoixDelivrance } from "@model/requete/enum/ChoixDelivrance";
import { fireEvent, waitFor } from "@testing-library/react";
import { RouteObject, createMemoryRouter } from "react-router-dom";
import { expect, vi } from "vitest";
import { EditionDelivranceContext } from "../../contexts/EditionDelivranceContextProvider";
import MockRECEContextProvider from "../mock/context/MockRECEContextProvider";
import { urlImagePngVideBase64 } from "../mock/data/ImagePng";
import { acte as acteMock } from "../mock/data/ficheEtBandeau/ficheActe";
import requeteDelivrance from "../mock/data/requeteDelivrance";

function dataURLtoFile(dataurl: string, filename: string): File {
  const arr = dataurl.split(",");
  const mime = arr[0]!.match(/:(.*?);/)![1]; // NOSONAR fichier non présent en PROD
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

export function getRequeteWithChoixDelivrance(requete: any, choixDelivrance: ChoixDelivrance) {
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
      dispatchEvent: vi.fn(),
      close: vi.fn()
    };
  };
  globalAny.close = vi.fn();
}

export function renseigneChampsRecherche(screen: any, nomChamp: string, valeurChamp: string) {
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

export function createTestingRouter(routes: RouteObject[], initialEntries: string[]) {
  return createMemoryRouter(
    routes.map(route => {
      return { path: route.path, element: route.element };
    }),
    {
      initialEntries
    }
  );
}

export const elementAvecContexte = (
  children: React.ReactElement,
  utilisateurConnecte?: IOfficier,
  utilisateurs?: IUtilisateur[],
  services?: IService[],
  decrets?: IDecret[],
  erreurLogin?: any
): any => {
  return (
    <MockRECEContextProvider
      utilisateurConnecte={utilisateurConnecte}
      utilisateurs={utilisateurs}
      services={services}
      decrets={decrets}
      erreurLogin={erreurLogin}
    >
      {children}
    </MockRECEContextProvider>
  );
};

export const elementAvecEditionDelivranceContexte = (
  children: React.ReactElement,
  requete?: IRequeteDelivrance,
  acte?: IFicheActe
): any => {
  const valeursContext = {
    requete: requete ?? requeteDelivrance,
    acte: acte ?? (acteMock as IFicheActe),
    rechargerRequete: (charger: "les-deux" | "requete" | "acte", apresRechargement?: () => void) => apresRechargement?.()
  };

  return <EditionDelivranceContext.Provider value={valeursContext}>{children}</EditionDelivranceContext.Provider>;
};
