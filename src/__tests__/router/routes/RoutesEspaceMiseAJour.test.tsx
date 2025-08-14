import { fireEvent, screen, waitFor } from "@testing-library/dom";
import { afterAll, beforeAll, describe, expect, test, vi } from "vitest";
import * as MiseAJour from "../../../router/infoPages/InfoPagesEspaceMiseAJour";
import { ROUTES_ESPACE_MISE_A_JOUR } from "../../../router/routes/RoutesEspaceMiseAJour";
import { TITRE_DEPART, renderRouterEspace } from "./TestsRoutesEspacesUtils";

const TITRE_APERCU = "Aperçu";

beforeAll(() => {
  vi.mock("../../../router/ElementPageRECE.tsx", () => ({ default: ({ children }: React.PropsWithChildren) => children }));
  vi.mock("../../../pages/requetesMiseAJour/PageEditionRequeteMiseAJour.tsx", () => ({
    default: () => <h1>{TITRE_APERCU}</h1>
  }));
});

afterAll(() => {
  vi.restoreAllMocks();
});

describe("Test des routes de l'espace mise à jour", () => {
  test("Les routes redirigent vers les bons composants", async () => {
    renderRouterEspace(ROUTES_ESPACE_MISE_A_JOUR, MiseAJour);

    expect(screen.getByText(TITRE_DEPART)).toBeDefined();

    fireEvent.click(screen.getByTitle(MiseAJour.INFO_PAGE_MISE_A_JOUR_MENTION_SUITE_AVIS.titre));
    await waitFor(() => expect(screen.getByText(MiseAJour.INFO_PAGE_MISE_A_JOUR_MENTION_SUITE_AVIS.url)).toBeDefined());
    expect(screen.getByText(TITRE_APERCU)).toBeDefined();

    fireEvent.click(screen.getByTitle(MiseAJour.INFO_PAGE_MISE_A_JOUR_MENTION_AUTRE.titre));
    await waitFor(() => expect(screen.getByText(MiseAJour.INFO_PAGE_MISE_A_JOUR_MENTION_AUTRE.url)).toBeDefined());
    expect(screen.getByText(TITRE_APERCU)).toBeDefined();

    fireEvent.click(screen.getByTitle(MiseAJour.INFO_PAGE_MISE_A_JOUR_ANALYSE_MARGINALE.titre));
    await waitFor(() => expect(screen.getByText(MiseAJour.INFO_PAGE_MISE_A_JOUR_ANALYSE_MARGINALE.url)).toBeDefined());
    expect(screen.getByText(TITRE_APERCU)).toBeDefined();
  });
});
