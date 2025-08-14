import { fireEvent, screen, waitFor } from "@testing-library/dom";
import { afterAll, beforeAll, describe, expect, test, vi } from "vitest";
import * as Information from "../../../router/infoPages/InfoPagesEspaceInformation";
import { ROUTES_ESPACE_INFORMATION } from "../../../router/routes/RoutesEspaceInformation";
import { TITRE_DEPART, renderRouterEspace } from "./TestsRoutesEspacesUtils";

const TITRE = {
  ESPACE: "Mes requêtes / Mon service",
  APERCU: "Aperçu"
};

beforeAll(() => {
  vi.mock("../../../router/ElementPageRECE.tsx", () => ({ default: ({ children }: React.PropsWithChildren) => children }));
  vi.mock("../../../views/pages/requeteInformation/espaceInformation/EspaceReqInfoPage.tsx", () => ({
    default: () => <h1>{TITRE.ESPACE}</h1>
  }));
  vi.mock("../../../views/pages/requeteInformation/apercuRequeteInformation/ApercuReqInfoPage.tsx", () => ({
    ApercuReqInfoPage: () => <h1>{TITRE.APERCU}</h1>
  }));
});

afterAll(() => {
  vi.restoreAllMocks();
});

describe("Test des routes de l'espace information", () => {
  test("Les routes redirigent vers les bons composants", async () => {
    renderRouterEspace(ROUTES_ESPACE_INFORMATION, Information);

    expect(screen.getByText(TITRE_DEPART)).toBeDefined();

    fireEvent.click(screen.getByTitle(Information.INFO_PAGE_MES_REQUETES_INFORMATION.titre));
    await waitFor(() => expect(screen.getByText(Information.INFO_PAGE_MES_REQUETES_INFORMATION.url)).toBeDefined());
    expect(screen.getByText(TITRE.ESPACE)).toBeDefined();

    fireEvent.click(screen.getByTitle(Information.INFO_PAGE_REQUETES_INFORMATION_SERVICE.titre));
    await waitFor(() => expect(screen.getByText(Information.INFO_PAGE_REQUETES_INFORMATION_SERVICE.url)).toBeDefined());
    expect(screen.getByText(TITRE.ESPACE)).toBeDefined();

    fireEvent.click(screen.getByTitle(Information.INFO_PAGE_APERCU_REQUETE_INFORMATION_CONSULTATION.titre));
    await waitFor(() => expect(screen.getByText(Information.INFO_PAGE_APERCU_REQUETE_INFORMATION_CONSULTATION.url)).toBeDefined());
    expect(screen.getByText(TITRE.APERCU)).toBeDefined();

    fireEvent.click(screen.getByTitle(Information.INFO_PAGE_APERCU_REQUETE_INFORMATION.titre));
    await waitFor(() => expect(screen.getByText(Information.INFO_PAGE_APERCU_REQUETE_INFORMATION.url)).toBeDefined());
    expect(screen.getByText(TITRE.APERCU)).toBeDefined();
  });
});
