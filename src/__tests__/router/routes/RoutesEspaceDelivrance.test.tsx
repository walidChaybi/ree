import { fireEvent, screen, waitFor } from "@testing-library/dom";
import { describe, expect, test, vi } from "vitest";
import * as Delivrance from "../../../router/infoPages/InfoPagesEspaceDelivrance";
import { ROUTES_ESPACE_DELIVRANCE } from "../../../router/routes/RoutesEspaceDelivrance";
import { TITRE_DEPART, renderRouterEspace } from "./TestsRoutesEspacesUtils";

const TITRE = {
  ESPACE: "Mes requêtes / Mon service",
  SAISIE_COURRIER_EXTRAIT_COPIE: "Saisie courrier extrait/copie",
  SAISIE_COURRIER_CERTIFICAT_SITUATION: "Saisie courrier certificat situation",
  APERCU: "Aperçu",
  APERCU_PRISE_EN_CHARGE: "Aperçu prise en charge",
  APERCU_TRAITEMENT: "Aperçu traitement",
  APERCU_EDITION: "Aperçu édition"
};

vi.mock("../../../router/ElementPageRECE.tsx", () => ({ default: ({ children }: React.PropsWithChildren) => children }));
vi.mock("../../../views/pages/requeteDelivrance/espaceDelivrance/EspaceDelivrancePage.tsx", () => ({
  default: () => <h1>{TITRE.ESPACE}</h1>
}));
vi.mock("../../../views/pages/requeteDelivrance/saisirRequete/SaisirRDCPage.tsx", () => ({
  SaisirRDCPage: () => <h1>{TITRE.SAISIE_COURRIER_EXTRAIT_COPIE}</h1>
}));
vi.mock("../../../views/pages/requeteDelivrance/saisirRequete/SaisirRDCSCPage.tsx", () => ({
  SaisirRDCSCPage: () => <h1>{TITRE.SAISIE_COURRIER_CERTIFICAT_SITUATION}</h1>
}));
vi.mock("../../../views/pages/requeteDelivrance/apercuRequete/apercuRequete/ApercuRequetePage.tsx", () => ({
  ApercuRequetePage: () => <h1>{TITRE.APERCU}</h1>
}));
vi.mock("../../../views/pages/requeteDelivrance/apercuRequete/apercuRequeteEnpriseEnCharge/ApercuRequetePriseEnChargePage.tsx", () => ({
  ApercuRequetePriseEnChargePage: () => <h1>{TITRE.APERCU_PRISE_EN_CHARGE}</h1>
}));
vi.mock("../../../views/pages/requeteDelivrance/apercuRequete/apercuRequeteEnTraitement/ApercuRequeteTraitementPage.tsx", () => ({
  ApercuRequeteTraitementPage: () => <h1>{TITRE.APERCU_TRAITEMENT}</h1>
}));
vi.mock("../../../pages/requetesDelivrance/PageEditionRequeteDelivrance.tsx", () => ({
  default: () => <h1>{TITRE.APERCU_EDITION}</h1>
}));

describe("Test des routes de l'espace délivrance", () => {
  test("Les routes redirigent vers les bons composants", async () => {
    renderRouterEspace(ROUTES_ESPACE_DELIVRANCE, Delivrance);

    expect(screen.getByText(TITRE_DEPART)).toBeDefined();

    fireEvent.click(screen.getByTitle(Delivrance.INFO_PAGE_MES_REQUETES_DELIVRANCE.titre));
    await waitFor(() => expect(screen.getByText(Delivrance.INFO_PAGE_MES_REQUETES_DELIVRANCE.url)).toBeDefined());
    expect(screen.getByText(TITRE.ESPACE)).toBeDefined();

    fireEvent.click(screen.getByTitle(Delivrance.INFO_PAGE_REQUETES_DELIVRANCE_SERVICE.titre));
    await waitFor(() => expect(screen.getByText(Delivrance.INFO_PAGE_REQUETES_DELIVRANCE_SERVICE.url)).toBeDefined());
    expect(screen.getByText(TITRE.ESPACE)).toBeDefined();

    fireEvent.click(screen.getByTitle(Delivrance.INFO_PAGE_SAISIE_REQUETE_DELIVRANCE_EXTRAIT_COPIE_COURRIER.titre));
    await waitFor(() => expect(screen.getByText(Delivrance.INFO_PAGE_SAISIE_REQUETE_DELIVRANCE_EXTRAIT_COPIE_COURRIER.url)).toBeDefined());
    expect(screen.getByText(TITRE.SAISIE_COURRIER_EXTRAIT_COPIE)).toBeDefined();

    fireEvent.click(screen.getByTitle(Delivrance.INFO_PAGE_SAISIE_REQUETE_DELIVRANCE_CERTIFICAT_SITUATION_COURRIER.titre));
    await waitFor(() =>
      expect(screen.getByText(Delivrance.INFO_PAGE_SAISIE_REQUETE_DELIVRANCE_CERTIFICAT_SITUATION_COURRIER.url)).toBeDefined()
    );
    expect(screen.getByText(TITRE.SAISIE_COURRIER_CERTIFICAT_SITUATION)).toBeDefined();

    fireEvent.click(screen.getByTitle(Delivrance.INFO_PAGE_MODIFICATION_REQUETE_DELIVRANCE_EXTRAIT_COPIE_COURRIER.titre));
    await waitFor(() =>
      expect(screen.getByText(Delivrance.INFO_PAGE_MODIFICATION_REQUETE_DELIVRANCE_EXTRAIT_COPIE_COURRIER.url)).toBeDefined()
    );
    expect(screen.getByText(TITRE.SAISIE_COURRIER_EXTRAIT_COPIE)).toBeDefined();

    fireEvent.click(screen.getByTitle(Delivrance.INFO_PAGE_MODIFICATION_REQUETE_DELIVRANCE_CERTIFICAT_SITUATION_COURRIER.titre));
    await waitFor(() =>
      expect(screen.getByText(Delivrance.INFO_PAGE_MODIFICATION_REQUETE_DELIVRANCE_CERTIFICAT_SITUATION_COURRIER.url)).toBeDefined()
    );
    expect(screen.getByText(TITRE.SAISIE_COURRIER_CERTIFICAT_SITUATION)).toBeDefined();

    fireEvent.click(screen.getByTitle(Delivrance.INFO_PAGE_APERCU_REQUETE_DELIVRANCE_CONSULTATION.titre));
    await waitFor(() => expect(screen.getByText(Delivrance.INFO_PAGE_APERCU_REQUETE_DELIVRANCE_CONSULTATION.url)).toBeDefined());
    expect(screen.getByText(TITRE.APERCU)).toBeDefined();

    fireEvent.click(screen.getByTitle(Delivrance.INFO_PAGE_APERCU_REQUETE_DELIVRANCE_PRISE_EN_CHARGE.titre));
    await waitFor(() => expect(screen.getByText(Delivrance.INFO_PAGE_APERCU_REQUETE_DELIVRANCE_PRISE_EN_CHARGE.url)).toBeDefined());
    expect(screen.getByText(TITRE.APERCU_PRISE_EN_CHARGE)).toBeDefined();

    fireEvent.click(screen.getByTitle(Delivrance.INFO_PAGE_APERCU_REQUETE_DELIVRANCE_TRAITEMENT.titre));
    await waitFor(() => expect(screen.getByText(Delivrance.INFO_PAGE_APERCU_REQUETE_DELIVRANCE_TRAITEMENT.url)).toBeDefined());
    expect(screen.getByText(TITRE.APERCU_TRAITEMENT)).toBeDefined();

    fireEvent.click(screen.getByTitle(Delivrance.INFO_PAGE_APERCU_REQUETE_DELIVRANCE_EDITION.titre));
    await waitFor(() => expect(screen.getByText(Delivrance.INFO_PAGE_APERCU_REQUETE_DELIVRANCE_EDITION.url)).toBeDefined());
    expect(screen.getByText(TITRE.APERCU_EDITION)).toBeDefined();
  });
});
