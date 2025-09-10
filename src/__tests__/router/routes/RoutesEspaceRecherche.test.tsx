import { fireEvent, screen, waitFor } from "@testing-library/dom";
import { afterAll, beforeAll, describe, expect, test, vi } from "vitest";
import * as Recherche from "../../../router/infoPages/InfoPagesEspaceRecherche";
import { ROUTES_ESPACE_RECHERCHE } from "../../../router/routes/RoutesEspaceRecherche";
import { TITRE_DEPART, renderRouterEspace } from "./TestsRoutesEspacesUtils";

const TITRE = {
  RECHERCHE_ACTE_INSCRIPTION: "Recherche acte inscription",
  RECHERCHE_REQUETE: "Recherche requête",
  RECHERCHE_ACTE: "Recherche acte"
};

beforeAll(() => {
  vi.mock("../../../router/ElementPageRECE.tsx", () => ({ default: ({ children }: React.PropsWithChildren) => children }));
  vi.mock("../../../pages/rmc/PageRMCActeInscription.tsx", () => ({
    default: () => <h1>{TITRE.RECHERCHE_ACTE_INSCRIPTION}</h1>
  }));
  vi.mock("../../../views/pages/rechercheMultiCriteres/requete/RMCRequetePage.tsx", () => ({
    RMCRequetePage: () => <h1>{TITRE.RECHERCHE_REQUETE}</h1>
  }));
  vi.mock("../../../views/pages/rechercheMultiCriteres/acteArchive/RMCArchivePage.tsx", () => ({
    RMCArchivePage: () => <h1>{TITRE.RECHERCHE_ACTE}</h1>
  }));
});

afterAll(() => {
  vi.restoreAllMocks();
});

describe("Test des routes de l'espace recherche", () => {
  test("Les routes redirigent vers les bons composants", async () => {
    renderRouterEspace(ROUTES_ESPACE_RECHERCHE, Recherche);

    expect(screen.getByText(TITRE_DEPART)).toBeDefined();

    fireEvent.click(screen.getByTitle(Recherche.INFO_PAGE_RECHERCHE_ACTE_INSCRIPTION.titre));
    await waitFor(() => expect(screen.getByText(Recherche.INFO_PAGE_RECHERCHE_ACTE_INSCRIPTION.url)).toBeDefined());
    expect(screen.getByText(TITRE.RECHERCHE_ACTE_INSCRIPTION)).toBeDefined();

    fireEvent.click(screen.getByTitle(Recherche.INFO_PAGE_RECHERCHE_REQUETE.titre));
    await waitFor(() => expect(screen.getByText(Recherche.INFO_PAGE_RECHERCHE_REQUETE.url)).toBeDefined());
    expect(screen.getByText(TITRE.RECHERCHE_REQUETE)).toBeDefined();

    fireEvent.click(screen.getByTitle(Recherche.INFO_PAGE_RECHERCHE_ACTE.titre));
    await waitFor(() => expect(screen.getByText(Recherche.INFO_PAGE_RECHERCHE_ACTE.url)).toBeDefined());
    expect(screen.getByText(TITRE.RECHERCHE_ACTE)).toBeDefined();
  });
});
