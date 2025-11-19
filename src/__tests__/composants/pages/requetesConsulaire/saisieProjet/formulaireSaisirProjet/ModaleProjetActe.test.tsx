import { CONFIG_POST_COMPOSITION_ACTE_TEXTE } from "@api/configurations/composition/PostCompositionActeTexteApiConfigApi";
import { CONFIG_GET_DONNEES_POUR_COMPOSITION_ACTE_TEXTE_MIS_A_JOUR } from "@api/configurations/etatCivil/acte/GetDonneesPourCompositionActeTexteMisAJourConfigApi";
import { CONFIG_PATCH_COMPOSER_DOCUMENT_FINAL_PROJET_ACTE_TRANSCRIT } from "@api/configurations/etatCivil/projetActe/PatchComposerDocumentFinalProjetActeTranscritConfigApi";
import { CONFIG_PATCH_INTEGRER_DOCUMENT_FINAL_PROJET_ACTE_TRANSCRIT } from "@api/configurations/etatCivil/projetActe/PatchIntegrerDocumentFinalProjetActeTranscritConfigApi";
import { CONFIG_PATCH_STATUT_REQUETE_CREATION } from "@api/configurations/requete/creation/PatchStatutRequeteCreationConfigApi";
import { MockApi } from "@mock/appelsApi/MockApi";
import MockRECEContextProvider from "@mock/context/MockRECEContextProvider";
import MockSaisieProjetActeContextProvider from "@mock/context/MockSaisieProjetActeContextProvider";
import { projetActeNaissanceDto } from "@mock/data/projetActeTranscrit";
import { requeteCreationTranscription } from "@mock/data/requeteCreationTranscription";
import MockUtilisateurBuilder from "@mock/model/agent/MockUtilisateur";
import { Droit } from "@model/agent/enum/Droit";
import { Perimetre } from "@model/agent/enum/Perimetre";
import { ProjetActeTranscrit } from "@model/etatcivil/acte/projetActe/transcription/ProjetActeTranscrit";
import { StatutRequete } from "@model/requete/enum/StatutRequete";
import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { mappingRequeteCreation } from "@views/common/hook/requete/DetailRequeteHook";
import { MemoryRouter } from "react-router";
import { describe, expect, test, vi } from "vitest";
import { ConteneurParentModales } from "../../../../../../composants/commun/conteneurs/modale/ConteneurModale";
import ModaleProjetActe from "../../../../../../composants/pages/requetesConsulaire/saisieProjet/formulaireSaisieProjet/ModaleProjetActe";
const projetActe = ProjetActeTranscrit.depuisDto(projetActeNaissanceDto);

describe("ModaleProjetActe - Tests du composant", () => {
  const listenerSignature = (valeurRetour: object[]) => {
    const retourSignature = (() => {
      dispatchEvent(new CustomEvent("signWebextResponse", { detail: valeurRetour.shift() }));
    }) as EventListener;

    window.top?.addEventListener("signWebextCall", retourSignature);

    return () => window.top?.removeEventListener("signWebextCall", retourSignature);
  };
  test("DOIT afficher le message 'Aucun document à afficher' QUAND il n'y a pas de projet d'acte", async () => {
    MockApi.deployer(CONFIG_POST_COMPOSITION_ACTE_TEXTE, {}, { data: { contenu: "", nbPages: 1 } });

    const mockApi = MockApi.getMock();

    render(
      <>
        <ConteneurParentModales />
        {projetActe && (
          <MockRECEContextProvider>
            <MockSaisieProjetActeContextProvider
              projetActe={null}
              requete={mappingRequeteCreation(requeteCreationTranscription)}
              mettreAJourDonneesContext={vi.fn()}
            >
              <ModaleProjetActe
                projetActe={projetActe}
                fermerModale={() => {}}
              />
            </MockSaisieProjetActeContextProvider>
          </MockRECEContextProvider>
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
          <MockRECEContextProvider>
            <MockSaisieProjetActeContextProvider
              projetActe={null}
              requete={mappingRequeteCreation(requeteCreationTranscription)}
              mettreAJourDonneesContext={vi.fn()}
            >
              <ModaleProjetActe
                projetActe={projetActe}
                fermerModale={() => {}}
              />
            </MockSaisieProjetActeContextProvider>
          </MockRECEContextProvider>
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

  test("DOIT appeler fermerModale quand le bouton de fermeture est cliqué", async () => {
    const mockFermerModale = vi.fn();
    MockApi.deployer(CONFIG_POST_COMPOSITION_ACTE_TEXTE, {}, { data: { contenu: "Q29udGVudSBkZSB0ZXN0IHBvdXIgbGUgUERG", nbPages: 1 } });

    await act(async () =>
      render(
        <>
          <ConteneurParentModales />
          {projetActe && (
            <MockRECEContextProvider>
              <MockSaisieProjetActeContextProvider
                projetActe={null}
                requete={mappingRequeteCreation(requeteCreationTranscription)}
                mettreAJourDonneesContext={vi.fn()}
              >
                <ModaleProjetActe
                  projetActe={projetActe}
                  fermerModale={mockFermerModale}
                />
              </MockSaisieProjetActeContextProvider>
            </MockRECEContextProvider>
          )}
        </>
      )
    );

    fireEvent.click(screen.getByText("X"));
    expect(mockFermerModale).toHaveBeenCalledTimes(1);
    MockApi.stopMock();
  });

  test("DOIT composer et intégrer le document final QUAND l'utilisateur clique sur 'Valider'", async () => {
    MockApi.deployer(CONFIG_POST_COMPOSITION_ACTE_TEXTE, {}, { data: { contenu: "Q29udGVudSBkZSB0ZXN0IHBvdXIgbGUgUERG", nbPages: 1 } })
      .deployer(
        CONFIG_PATCH_COMPOSER_DOCUMENT_FINAL_PROJET_ACTE_TRANSCRIT,
        {
          path: { idActe: "6190b304-18dc-43e5-a53a-02612dbadeae" },
          body: { issuerCertificat: "testIssuer", entiteCertificat: "testEntity" }
        },
        { data: "documentASigner" }
      )
      .deployer(
        CONFIG_PATCH_INTEGRER_DOCUMENT_FINAL_PROJET_ACTE_TRANSCRIT,
        {
          path: { idActe: "6190b304-18dc-43e5-a53a-02612dbadeae" },
          body: {
            documentPadesBase64: "",
            signature: {
              entiteCertificat: "",
              noSerieCarte: "",
              manufacturerIDCarte: "",
              modelCarte: "",
              flagsCarte: "",
              algoSignature: "",
              notBeforeCertificat: "",
              notAfterCertificat: "",
              noSerieCertificat: "",
              issuerCertificat: ""
            },
            modeAuthentification: "AROBAS_MDP"
          }
        },
        { data: "documentASigner" }
      );

    MockApi.deployer(CONFIG_PATCH_STATUT_REQUETE_CREATION, {
      path: { idRequete: "3ed9aa4e-921b-489f-b8fe-531dd703c60c" },
      query: { statut: StatutRequete.getKey(StatutRequete.TRAITE) }
    });

    MockApi.deployer(
      CONFIG_GET_DONNEES_POUR_COMPOSITION_ACTE_TEXTE_MIS_A_JOUR,
      {
        path: { idActe: "6190b304-18dc-43e5-a53a-02612dbadeae" }
      },
      { data: "documentComposer" }
    );

    const mockApi = MockApi.getMock();

    render(
      <>
        <ConteneurParentModales />
        {projetActe && (
          <MemoryRouter>
            <MockRECEContextProvider
              utilisateurConnecte={MockUtilisateurBuilder.utilisateurConnecte()
                .avecDroit(Droit.SIGNER_ACTE, { perimetres: [Perimetre.TOUS_REGISTRES] })
                .generer()}
            >
              <MockSaisieProjetActeContextProvider
                projetActe={projetActe}
                requete={mappingRequeteCreation(requeteCreationTranscription)}
                mettreAJourDonneesContext={vi.fn()}
              >
                <ModaleProjetActe
                  projetActe={projetActe}
                  fermerModale={() => {}}
                />
              </MockSaisieProjetActeContextProvider>
            </MockRECEContextProvider>
          </MemoryRouter>
        )}
      </>
    );

    await waitFor(() => {
      expect(mockApi.history.post.length).toBe(1);
    });

    const demonterListener = listenerSignature([
      { infosSignature: { issuerCertificat: "testIssuer", entiteCertificat: "testEntity" } },
      { infosSignature: { issuerCertificat: "testIssuer", entiteCertificat: "testEntity" }, document: "documentSigne" }
    ]);

    await userEvent.type(screen.getByLabelText("Code pin"), "0000");
    await userEvent.click(screen.getByTitle("Valider"));

    await waitFor(() => {
      expect(mockApi.history.patch.length).toBe(3);
    });

    await waitFor(() => {
      expect(mockApi.history.get.length).toBe(1);
      expect(mockApi.history.get[0].url).contain("6190b304-18dc-43e5-a53a-02612dbadeae/donnees-pour-composition-acte-texte-mis-a-jour");
      expect(screen.getByText("Mes requêtes consulaires")).toBeDefined();
    });

    demonterListener();

    MockApi.stopMock();
  });
});
