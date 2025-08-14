import { fireEvent, screen, waitFor } from "@testing-library/dom";
import { afterAll, beforeAll, describe, expect, test, vi } from "vitest";
import * as Etablissement from "../../../router/infoPages/InfoPagesEspaceEtablissement";
import { ROUTES_ESPACE_ETABLISSEMENT } from "../../../router/routes/RoutesEspaceEtablissement";
import { TITRE_DEPART, renderRouterEspace } from "./TestsRoutesEspacesUtils";

const TITRE = {
  ESPACE: "Mes requêtes / Mon service",
  APERCU: "Aperçu",
  APERCU_SUIVI_DOSSIER: "Aperçu suivi dossier",
  APERCU_SAISIE_PROJET: "Aperçu saisie projet",
  APERCU_ACTE_REGISTRE: "Aperçu acte registre"
};

beforeAll(() => {
  vi.mock("../../../router/ElementPageRECE.tsx", () => ({ default: ({ children }: React.PropsWithChildren) => children }));
  vi.mock("../../../views/pages/requeteCreation/espaceCreation/EspaceCreationPage.tsx", () => ({
    default: () => <h1>{TITRE.ESPACE}</h1>
  }));
  vi.mock("../../../views/pages/requeteCreation/apercuRequete/etablissement/apercuSimple/ApercuRequeteEtablissementSimplePage.tsx", () => ({
    ApercuRequeteEtablissementSimplePage: () => <h1>{TITRE.APERCU}</h1>
  }));
  vi.mock(
    "../../../views/pages/requeteCreation/apercuRequete/etablissement/apercuPriseEnCharge/ApercuRequeteEtablissementSuiviDossierPage.tsx",
    () => ({
      ApercuRequeteEtablissementSuiviDossierPage: () => <h1>{TITRE.APERCU_SUIVI_DOSSIER}</h1>
    })
  );
  vi.mock(
    "../../../views/pages/requeteCreation/apercuRequete/etablissement/apercuSaisieDeProjet/ApercuRequeteEtablissementSaisieDeProjetPage.tsx",
    () => ({
      ApercuRequeteEtablissementSaisieDeProjetPage: () => <h1>{TITRE.APERCU_SAISIE_PROJET}</h1>
    })
  );
  vi.mock(
    "../../../views/pages/requeteCreation/apercuRequete/etablissement/apercuActeRegistre/ApercuRequeteEtablissementActeRegistrePage.tsx",
    () => ({
      ApercuRequeteEtablissementActeRegistrePage: () => <h1>{TITRE.APERCU_ACTE_REGISTRE}</h1>
    })
  );
});

afterAll(() => {
  vi.restoreAllMocks();
});

describe("Test des routes de l'espace établissement", () => {
  test("Les routes redirigent vers les bons composants", async () => {
    renderRouterEspace(ROUTES_ESPACE_ETABLISSEMENT, Etablissement);

    expect(screen.getByText(TITRE_DEPART)).toBeDefined();

    fireEvent.click(screen.getByTitle(Etablissement.INFO_PAGE_MES_REQUETES_ETABLISSEMENT.titre));
    await waitFor(() => expect(screen.getByText(Etablissement.INFO_PAGE_MES_REQUETES_ETABLISSEMENT.url)).toBeDefined());
    expect(screen.getByText(TITRE.ESPACE)).toBeDefined();

    fireEvent.click(screen.getByTitle(Etablissement.INFO_PAGE_REQUETES_ETABLISSEMENT_SERVICE.titre));
    await waitFor(() => expect(screen.getByText(Etablissement.INFO_PAGE_REQUETES_ETABLISSEMENT_SERVICE.url)).toBeDefined());
    expect(screen.getByText(TITRE.ESPACE)).toBeDefined();

    fireEvent.click(screen.getByTitle(Etablissement.INFO_PAGE_APERCU_REQUETE_ETABLISSEMENT_CONSULTATION.titre));
    await waitFor(() => expect(screen.getByText(Etablissement.INFO_PAGE_APERCU_REQUETE_ETABLISSEMENT_CONSULTATION.url)).toBeDefined());
    expect(screen.getByText(TITRE.APERCU)).toBeDefined();

    fireEvent.click(screen.getByTitle(Etablissement.INFO_PAGE_APERCU_REQUETE_ETABLISSEMENT_SUIVI_DOSSIER.titre));
    await waitFor(() => expect(screen.getByText(Etablissement.INFO_PAGE_APERCU_REQUETE_ETABLISSEMENT_SUIVI_DOSSIER.url)).toBeDefined());
    expect(screen.getByText(TITRE.APERCU_SUIVI_DOSSIER)).toBeDefined();

    fireEvent.click(screen.getByTitle(Etablissement.INFO_PAGE_APERCU_REQUETE_ETABLISSEMENT_SAISIE_PROJET.titre));
    await waitFor(() => expect(screen.getByText(Etablissement.INFO_PAGE_APERCU_REQUETE_ETABLISSEMENT_SAISIE_PROJET.url)).toBeDefined());
    expect(screen.getByText(TITRE.APERCU_SAISIE_PROJET)).toBeDefined();

    fireEvent.click(screen.getByTitle(Etablissement.INFO_PAGE_APERCU_REQUETE_ETABLISSEMENT_ACTE_REGISTRE.titre));
    await waitFor(() => expect(screen.getByText(Etablissement.INFO_PAGE_APERCU_REQUETE_ETABLISSEMENT_ACTE_REGISTRE.url)).toBeDefined());
    expect(screen.getByText(TITRE.APERCU_ACTE_REGISTRE)).toBeDefined();
  });
});
