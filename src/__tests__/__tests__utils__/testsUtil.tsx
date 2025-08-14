import { IFicheActe } from "@model/etatcivil/acte/IFicheActe";
import { IRequeteDelivrance } from "@model/requete/IRequeteDelivrance";
import { RouteObject, createMemoryRouter } from "react-router";
import { EditionDelivranceContext } from "../../contexts/EditionDelivranceContextProvider";
import { acte as acteMock } from "../mock/data/ficheEtBandeau/ficheActe";
import requeteDelivrance from "../mock/data/requeteDelivrance";

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
