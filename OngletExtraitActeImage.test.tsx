import { CONFIG_GET_EXTRAIT_ACTE_IMAGE } from "@api/configurations/etatCivil/acte/GetExtraitActeImageConfigApi";
import OngletExtraitActeImage from "@composants/pages/requetesMiseAJour/onglets/OngletExtraitActeImage";
import { MockApi } from "@mock/appelsApi/MockApi";
import { act, render, screen, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, test, vi } from "vitest";
import {
  ECleOngletsMiseAJour,
  EditionMiseAJourContext,
  IEditionMiseAJourContext
} from "../../../../../contexts/EditionMiseAJourContextProvider";

const ID_ACTE = "acte-123";

const renderComp = (estActif: boolean) =>
  render(
    <EditionMiseAJourContext.Valeurs.Provider
      value={
        {
          idActe: ID_ACTE,
          idRequete: "req-001",
          ongletsActifs: { actes: ECleOngletsMiseAJour.EXTRAIT, formulaires: ECleOngletsMiseAJour.VERIFICATION_DONNEES }
        } as IEditionMiseAJourContext
      }
    >
      <OngletExtraitActeImage estActif={estActif} />
    </EditionMiseAJourContext.Valeurs.Provider>
  );

describe("OngletExtraitActeImage", () => {
  afterEach(() => {
    MockApi.stopMock();
    vi.clearAllMocks();
  });

  test("affiche le message par défaut quand le texte extrait n'est pas encore chargé", () => {
    MockApi.deployer(
      CONFIG_GET_EXTRAIT_ACTE_IMAGE,
      { path: { idActe: ID_ACTE } },
      { data: { texte: "Texte extrait test" } }
    );

    // estActif=false → le useEffect ne déclenche pas l'appel API
    const { container } = renderComp(false);
    expect(screen.getByText("Aucun extrait disponible")).toBeDefined();
    expect(container).toMatchSnapshot();
  });

  test("charge et affiche le texte extrait quand l'onglet est actif", async () => {
    MockApi.deployer(
      CONFIG_GET_EXTRAIT_ACTE_IMAGE,
      { path: { idActe: ID_ACTE } },
      { data: { texte: "Ceci est le contenu extrait de l'acte image." } }
    );

    const { container } = renderComp(true);

    await waitFor(() => {
      expect(screen.getByText("Ceci est le contenu extrait de l'acte image.")).toBeDefined();
    });

    expect(MockApi.getMock().history.get.length).toBe(1);
    expect(MockApi.getMock().history.get[0].url).toContain(`/extrait-acte-image/${ID_ACTE}`);
    expect(container).toMatchSnapshot();
  });

  test("ne déclenche pas d'appel API quand estActif=false", async () => {
    MockApi.deployer(
      CONFIG_GET_EXTRAIT_ACTE_IMAGE,
      { path: { idActe: ID_ACTE } },
      { data: { texte: "Texte" } }
    );

    renderComp(false);

    // Attendre un tick pour s'assurer que le useEffect ne se déclenche pas
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 50));
    });

    expect(MockApi.getMock().history.get.length).toBe(0);
  });

  test("affiche un message d'erreur quand l'API échoue", async () => {
    MockApi.deployer(
      CONFIG_GET_EXTRAIT_ACTE_IMAGE,
      { path: { idActe: ID_ACTE } },
      { errors: [{ code: "TECH_500", message: "Erreur serveur", type: "TechnicalException" }], codeHttp: 500 }
    );

    renderComp(true);

    await waitFor(() => {
      expect(MockApi.getMock().history.get.length).toBe(1);
    });

    // Le texte reste null → le message "Aucun extrait disponible" reste affiché
    expect(screen.getByText("Aucun extrait disponible")).toBeDefined();
  });

  test("ne fait pas de second appel API si le texte est déjà chargé", async () => {
    MockApi.deployer(
      CONFIG_GET_EXTRAIT_ACTE_IMAGE,
      { path: { idActe: ID_ACTE } },
      { data: { texte: "Texte déjà chargé" } }
    );

    const { rerender } = render(
      <EditionMiseAJourContext.Valeurs.Provider
        value={
          {
            idActe: ID_ACTE,
            idRequete: "req-001",
            ongletsActifs: { actes: ECleOngletsMiseAJour.EXTRAIT, formulaires: ECleOngletsMiseAJour.VERIFICATION_DONNEES }
          } as IEditionMiseAJourContext
        }
      >
        <OngletExtraitActeImage estActif={true} />
      </EditionMiseAJourContext.Valeurs.Provider>
    );

    // Attendre le premier chargement
    await waitFor(() => {
      expect(screen.getByText("Texte déjà chargé")).toBeDefined();
    });

    expect(MockApi.getMock().history.get.length).toBe(1);

    // Simuler un re-render avec estActif qui repasse à true
    rerender(
      <EditionMiseAJourContext.Valeurs.Provider
        value={
          {
            idActe: ID_ACTE,
            idRequete: "req-001",
            ongletsActifs: { actes: ECleOngletsMiseAJour.EXTRAIT, formulaires: ECleOngletsMiseAJour.VERIFICATION_DONNEES }
          } as IEditionMiseAJourContext
        }
      >
        <OngletExtraitActeImage estActif={true} />
      </EditionMiseAJourContext.Valeurs.Provider>
    );

    // Toujours un seul appel — le guard `texteExtrait !== null` empêche le re-fetch
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 50));
    });
    expect(MockApi.getMock().history.get.length).toBe(1);
  });

  test("snapshot quand l'onglet est actif avec contenu", async () => {
    MockApi.deployer(
      CONFIG_GET_EXTRAIT_ACTE_IMAGE,
      { path: { idActe: ID_ACTE } },
      { data: { texte: "Le premier janvier deux mille, à dix heures trente minutes..." } }
    );

    const { container } = renderComp(true);

    await waitFor(() => {
      expect(screen.getByText(/Le premier janvier/)).toBeDefined();
    });

    expect(container).toMatchSnapshot();
  });
});
