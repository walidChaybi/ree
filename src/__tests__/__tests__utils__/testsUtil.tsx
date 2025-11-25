import { MockFicheActeBuilder } from "@mock/model/etatcivil/acte/MockFicheActe";
import { FicheActe } from "@model/etatcivil/acte/FicheActe";
import { IRequeteDelivrance } from "@model/requete/IRequeteDelivrance";
import { RouteObject, createMemoryRouter } from "react-router";
import { EditionDelivranceContext } from "../../contexts/EditionDelivranceContextProvider";
import requeteDelivrance from "../mock/data/requeteDelivrance";

export const createTestingRouter = (routes: RouteObject[], initialEntries: string[]) => {
  return createMemoryRouter(
    routes.map(route => {
      return { path: route.path, element: route.element };
    }),
    {
      initialEntries
    }
  );
};

export const elementAvecEditionDelivranceContexte = (children: React.ReactElement, requete?: IRequeteDelivrance, acte?: FicheActe): any => {
  const valeursContext = {
    requete: requete ?? requeteDelivrance,
    acte: acte ?? new MockFicheActeBuilder().deType("TEXTE").deNature("NAISSANCE").generer(),
    rechargerRequete: (charger: "les-deux" | "requete" | "acte", apresRechargement?: () => void) => apresRechargement?.()
  };

  return <EditionDelivranceContext.Provider value={valeursContext}>{children}</EditionDelivranceContext.Provider>;
};
