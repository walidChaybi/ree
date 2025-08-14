import { fireEvent, screen, waitFor } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import * as Consulaire from "../../../router/infoPages/InfoPagesEspaceConsulaire";
import { ROUTES_ESPACE_CONSULAIRE } from "../../../router/routes/RoutesEspaceConsulaire";
import { TITRE_DEPART, renderRouterEspace } from "./TestsRoutesEspacesUtils";

const TITRE = {
  MES_REQUETES: "Mes requêtes",
  MON_SERVICE: "Mon service",
  SAISIE_COURRIER_TRANSCRIPTION: "Saisie courrier transcription",
  APERCU_PRISE_EN_CHARGE: "Aperçu prise en charge",
  APERCU_SAISIE_PROJET: "Aperçu saisie projet"
};

vi.mock("../../../router/ElementPageRECE.tsx", () => ({ default: ({ children }: React.PropsWithChildren) => children }));
vi.mock("../../../pages/requetesConsulaire/PageMesRequetesConsulaires.tsx", () => ({
  default: () => <h1>{TITRE.MES_REQUETES}</h1>
}));
vi.mock("../../../pages/requetesConsulaire/PageRequetesServiceConsulaire.tsx", () => ({
  default: () => <h1>{TITRE.MON_SERVICE}</h1>
}));
vi.mock("../../../pages/requetesConsulaire/PageSaisieCourrierTranscription.tsx", () => ({
  default: () => <h1>{TITRE.SAISIE_COURRIER_TRANSCRIPTION}</h1>
}));
vi.mock("../../../pages/requetesConsulaire/PageRequeteCreationTranscriptionPriseEnCharge.tsx", () => ({
  default: () => <h1>{TITRE.APERCU_PRISE_EN_CHARGE}</h1>
}));
vi.mock("../../../pages/requetesConsulaire/PageRequeteTranscriptionSaisieProjet.tsx", () => ({
  default: () => <h1>{TITRE.APERCU_SAISIE_PROJET}</h1>
}));

describe("Test des routes de l'espace consulaire", () => {
  test("Les routes redirigent vers les bons composants", async () => {
    renderRouterEspace(ROUTES_ESPACE_CONSULAIRE, Consulaire);

    expect(screen.getByText(TITRE_DEPART)).toBeDefined();

    fireEvent.click(screen.getByTitle(Consulaire.INFO_PAGE_MES_REQUETES_CONSULAIRES.titre));
    await waitFor(() => expect(screen.getByText(Consulaire.INFO_PAGE_MES_REQUETES_CONSULAIRES.url)).toBeDefined());
    expect(screen.getByText(TITRE.MES_REQUETES)).toBeDefined();

    fireEvent.click(screen.getByTitle(Consulaire.INFO_PAGE_REQUETES_CONSULAIRES_SERVICE.titre));
    await waitFor(() => expect(screen.getByText(Consulaire.INFO_PAGE_REQUETES_CONSULAIRES_SERVICE.url)).toBeDefined());
    expect(screen.getByText(TITRE.MON_SERVICE)).toBeDefined();

    fireEvent.click(screen.getByTitle(Consulaire.INFO_PAGE_SAISIE_REQUETE_TRANSCRIPTION_COURRIER.titre));
    await waitFor(() => expect(screen.getByText(Consulaire.INFO_PAGE_SAISIE_REQUETE_TRANSCRIPTION_COURRIER.url)).toBeDefined());
    expect(screen.getByText(TITRE.SAISIE_COURRIER_TRANSCRIPTION)).toBeDefined();

    fireEvent.click(screen.getByTitle(Consulaire.INFO_PAGE_MODIFICATION_REQUETE_TRANSCRIPTION_COURRIER.titre));
    await waitFor(() => expect(screen.getByText(Consulaire.INFO_PAGE_MODIFICATION_REQUETE_TRANSCRIPTION_COURRIER.url)).toBeDefined());
    expect(screen.getByText(TITRE.SAISIE_COURRIER_TRANSCRIPTION)).toBeDefined();

    fireEvent.click(screen.getByTitle(Consulaire.INFO_PAGE_APERCU_REQUETE_TRANSCRIPTION_CONSULTATION.titre));
    await waitFor(() => expect(screen.getByText(Consulaire.INFO_PAGE_APERCU_REQUETE_TRANSCRIPTION_CONSULTATION.url)).toBeDefined());
    expect(screen.getByText(TITRE.APERCU_PRISE_EN_CHARGE)).toBeDefined();

    fireEvent.click(screen.getByTitle(Consulaire.INFO_PAGE_APERCU_REQUETE_TRANSCRIPTION_PRISE_EN_CHARGE.titre));
    await waitFor(() => expect(screen.getByText(Consulaire.INFO_PAGE_APERCU_REQUETE_TRANSCRIPTION_PRISE_EN_CHARGE.url)).toBeDefined());
    expect(screen.getByText(TITRE.APERCU_PRISE_EN_CHARGE)).toBeDefined();

    fireEvent.click(screen.getByTitle(Consulaire.INFO_PAGE_APERCU_REQUETE_TRANSCRIPTION_SAISIE_PROJET.titre));
    await waitFor(() => expect(screen.getByText(Consulaire.INFO_PAGE_APERCU_REQUETE_TRANSCRIPTION_SAISIE_PROJET.url)).toBeDefined());
    expect(screen.getByText(TITRE.APERCU_SAISIE_PROJET)).toBeDefined();
  });
});
