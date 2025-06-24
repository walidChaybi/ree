import { CONFIG_POST_COMPOSITION_ACTE_TEXTE } from "@api/configurations/composition/PostCompositionActeTexteApiConfigApi";
import { MockApi } from "@mock/appelsApi/MockApi";
import { projetActeNaissanceDto } from "@mock/data/projetActeTranscrit";
import { ProjetActeTranscrit } from "@model/etatcivil/acte/projetActe/transcription/ProjetActeTranscrit";
import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import { ConteneurParentModales } from "../../../../../../composants/commun/conteneurs/modale/ConteneurModale";
import ModaleProjetActe from "../../../../../../composants/pages/requetesConsulaire/saisieProjet/formulaireSaisieProjet/ModaleProjetActe";
const projetActe = ProjetActeTranscrit.depuisDto(projetActeNaissanceDto);
describe("ModaleProjetActe - Tests du composant", () => {
  test("DOIT afficher le message 'Aucun document à afficher' QUAND il n'y a pas de projet d'acte", async () => {
    MockApi.deployer(CONFIG_POST_COMPOSITION_ACTE_TEXTE, {}, { data: { contenu: "", nbPages: 1 } });

    const mockApi = MockApi.getMock();

    render(
      <>
        <ConteneurParentModales />
        {projetActe && (
          <ModaleProjetActe
            projetActe={projetActe}
            fermerModale={() => {}}
          />
        )}
      </>
    );

    await waitFor(() => {
      expect(mockApi.history.post.length).toBe(1);
    });
    expect(screen.getByText("Aucun document à afficher")).toBeDefined();
    MockApi.stopMock();
  });

  test("DOIT rendre le composant correctement avec un PDF valide", async () => {
    MockApi.deployer(CONFIG_POST_COMPOSITION_ACTE_TEXTE, {}, { data: { contenu: "Q29udGVudSBkZSB0ZXN0IHBvdXIgbGUgUERG", nbPages: 1 } });

    const mockApi = MockApi.getMock();

    const { container } = render(
      <>
        <ConteneurParentModales />
        {projetActe && (
          <ModaleProjetActe
            projetActe={projetActe}
            fermerModale={() => {}}
          />
        )}
      </>
    );

    await waitFor(() => {
      expect(mockApi.history.post.length).toBe(1);
    });

    expect(screen.getByText("X")).toBeTruthy();

    expect(screen.getByTitle("Document PDF")).toBeTruthy();
    expect(container.firstChild).toMatchSnapshot();

    MockApi.stopMock();
  });

  test("Doit appeler fermerModale quand le bouton de fermeture est cliqué", async () => {
    const mockFermerModale = vi.fn();
    MockApi.deployer(CONFIG_POST_COMPOSITION_ACTE_TEXTE, {}, { data: { contenu: "Q29udGVudSBkZSB0ZXN0IHBvdXIgbGUgUERG", nbPages: 1 } });

    await act(async () =>
      render(
        <>
          <ConteneurParentModales />
          {projetActe && (
            <ModaleProjetActe
              projetActe={projetActe}
              fermerModale={mockFermerModale}
            />
          )}
        </>
      )
    );

    fireEvent.click(screen.getByText("X"));
    expect(mockFermerModale).toHaveBeenCalledTimes(1);
    MockApi.stopMock();
  });
});
