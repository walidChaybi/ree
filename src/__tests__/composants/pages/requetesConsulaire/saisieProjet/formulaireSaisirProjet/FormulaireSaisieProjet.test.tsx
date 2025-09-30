import { CONFIG_POST_COMPOSITION_ACTE_TEXTE } from "@api/configurations/composition/PostCompositionActeTexteApiConfigApi";
import { mappingRequeteCreation } from "@hook/requete/DetailRequeteHook";
import { MockApi } from "@mock/appelsApi/MockApi";
import MockRECEContextProvider from "@mock/context/MockRECEContextProvider";
import MockSaisieProjetActeContextProvider from "@mock/context/MockSaisieProjetActeContextProvider";
import { projetActe } from "@mock/data/projetActeTranscrit";
import { requeteCreationTranscription } from "@mock/data/requeteCreationTranscription";
import MockUtilisateurBuilder from "@mock/model/agent/MockUtilisateur";
import { Droit } from "@model/agent/enum/Droit";
import { StatutRequete } from "@model/requete/enum/StatutRequete";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { RouterProvider, createMemoryRouter } from "react-router";
import { beforeEach, describe, expect, test, vi } from "vitest";
import FormulaireSaisieProjet from "../../../../../../composants/pages/requetesConsulaire/saisieProjet/formulaireSaisieProjet/FormulaireSaisieProjet";
import * as TraitementApiHook from "../../../../../../hooks/api/TraitementApiHook";

const requeteTranscriptionPriseEnCharge = mappingRequeteCreation({
  ...requeteCreationTranscription,
  statut: {
    statutRequete: StatutRequete.PRISE_EN_CHARGE
  }
});

const requeteTranscriptionASigner = mappingRequeteCreation({
  ...requeteCreationTranscription,
  statut: {
    statutRequete: StatutRequete.A_SIGNER
  }
});

describe("test du formulaire saisie projet acte transcrit de naissance", async () => {
  const mockLancerTraitement = vi.fn();

  vi.spyOn(TraitementApiHook, "default").mockReturnValue({
    lancerTraitement: mockLancerTraitement,
    traitementEnCours: false
  });

  beforeEach(() => {
    vi.clearAllMocks();
    mockLancerTraitement.mockClear();
  });

  const renderWithRouter = (component: React.ReactElement, initialEntries = ["/"]) => {
    const router = createMemoryRouter(
      [
        {
          path: "/",
          element: component
        }
      ],
      {
        initialEntries
      }
    );

    return render(<RouterProvider router={router} />);
  };

  test("Doit afficher le formulaire de saisie de projet d'acte", async () => {
    const { container } = renderWithRouter(
      <MockRECEContextProvider
        utilisateurConnecte={MockUtilisateurBuilder.utilisateurConnecte().avecDroit(Droit.TRANSCRIPTION_SIGNER_ACTE).generer()}
      >
        <MockSaisieProjetActeContextProvider
          projetActe={null}
          requete={requeteTranscriptionPriseEnCharge}
          mettreAJourDonneesContext={vi.fn()}
        >
          <FormulaireSaisieProjet />
        </MockSaisieProjetActeContextProvider>
      </MockRECEContextProvider>
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test("DOIT afficher le bouton 'enregistrer' QUAND l'utilisateur ne possède pas le droit signer_acte", () => {
    renderWithRouter(
      <MockRECEContextProvider
        utilisateurConnecte={MockUtilisateurBuilder.utilisateurConnecte().avecDroit(Droit.TRANSCRIPTION_CREER_PROJET_ACTE).generer()}
      >
        <MockSaisieProjetActeContextProvider
          projetActe={null}
          requete={requeteTranscriptionPriseEnCharge}
          mettreAJourDonneesContext={vi.fn()}
        >
          <FormulaireSaisieProjet />
        </MockSaisieProjetActeContextProvider>
      </MockRECEContextProvider>
    );

    const button = screen.getByRole("button", { name: "Enregistrer" });
    expect(button).toBeDefined();
  });

  test("DOIT afficher le bouton 'enregistrer' et 'terminer et signer' QUAND l'utilisateur possède le droit signer_acte", async () => {
    renderWithRouter(
      <MockRECEContextProvider
        utilisateurConnecte={MockUtilisateurBuilder.utilisateurConnecte().avecDroit(Droit.TRANSCRIPTION_SIGNER_ACTE).generer()}
      >
        <MockSaisieProjetActeContextProvider
          projetActe={null}
          requete={requeteTranscriptionASigner}
          mettreAJourDonneesContext={vi.fn()}
        >
          <FormulaireSaisieProjet />
        </MockSaisieProjetActeContextProvider>
      </MockRECEContextProvider>
    );
    const inputNomRetenuOEC: HTMLInputElement = screen.getByRole("textbox", { name: /titulaire.nomRetenuOEC/i });

    await userEvent.type(inputNomRetenuOEC, "Xi phun bin");

    const boutonTerminerSigner = screen.getByRole("button", { name: "Terminer et signer" });
    const boutonEnregistrer = screen.getByRole("button", { name: "Enregistrer" });
    expect(boutonTerminerSigner).toBeDefined();
    expect(boutonEnregistrer).toBeDefined();
  });

  test("DOIT appeler la fonction enregistrer QUAND l'utilisateur clique sur 'Enregistrer' avec des modifications", async () => {
    renderWithRouter(
      <MockRECEContextProvider
        utilisateurConnecte={MockUtilisateurBuilder.utilisateurConnecte().avecDroit(Droit.TRANSCRIPTION_CREER_PROJET_ACTE).generer()}
      >
        <MockSaisieProjetActeContextProvider
          projetActe={projetActe}
          mettreAJourDonneesContext={vi.fn().mockResolvedValue({})}
          requete={requeteTranscriptionASigner}
        >
          <FormulaireSaisieProjet />
        </MockSaisieProjetActeContextProvider>
      </MockRECEContextProvider>
    );

    const inputNomRetenuOEC: HTMLInputElement = screen.getByRole("textbox", { name: /titulaire.nomRetenuOEC/i });
    await userEvent.type(inputNomRetenuOEC, "Xi phun bin");

    const boutonEnregistrer = screen.getByRole("button", { name: "Enregistrer" });
    await userEvent.click(boutonEnregistrer);

    await waitFor(() => {
      expect(mockLancerTraitement).toHaveBeenCalled();
    });
  });

  test("DOIT appeler la fonction terminer et signer QUAND l'utilisateur clique sur 'Terminer et signer' avec des modifications", async () => {
    renderWithRouter(
      <MockRECEContextProvider
        utilisateurConnecte={MockUtilisateurBuilder.utilisateurConnecte().avecDroit(Droit.TRANSCRIPTION_SIGNER_ACTE).generer()}
      >
        <MockSaisieProjetActeContextProvider
          projetActe={projetActe}
          mettreAJourDonneesContext={vi.fn().mockResolvedValue({})}
          requete={requeteTranscriptionASigner}
        >
          <FormulaireSaisieProjet />
        </MockSaisieProjetActeContextProvider>
      </MockRECEContextProvider>
    );

    const inputNomRetenuOEC: HTMLInputElement = screen.getByRole("textbox", { name: /titulaire.nomRetenuOEC/i });
    await userEvent.type(inputNomRetenuOEC, "Xi phun bin");

    const boutonTerminerEtSigner = screen.getByRole("button", { name: "Terminer et signer" });
    await userEvent.click(boutonTerminerEtSigner);

    await waitFor(() => {
      expect(mockLancerTraitement).toHaveBeenCalled();
    });
  });

  test("DOIT pas appeler la fonction enregistrer ou terminer et signer QUAND aucune modification n'est effectuées", async () => {
    MockApi.deployer(
      CONFIG_POST_COMPOSITION_ACTE_TEXTE,
      { body: { nature_acte: "A", texte_corps_acte: "texte corps acte", titulaires: "" } },
      { data: { contenu: "", nbPages: 1 } }
    );

    renderWithRouter(
      <MockRECEContextProvider
        utilisateurConnecte={MockUtilisateurBuilder.utilisateurConnecte().avecDroit(Droit.TRANSCRIPTION_SIGNER_ACTE).generer()}
      >
        <MockSaisieProjetActeContextProvider
          projetActe={projetActe}
          requete={requeteTranscriptionASigner}
          mettreAJourDonneesContext={vi.fn()}
        >
          <FormulaireSaisieProjet />
        </MockSaisieProjetActeContextProvider>
      </MockRECEContextProvider>
    );
    const mockApi = MockApi.getMock();
    const boutonEnregistrer = screen.getByRole("button", { name: "Enregistrer" });
    const boutonTerminerSigner = screen.getByRole("button", { name: "Terminer et signer" });
    await userEvent.click(boutonEnregistrer);
    await userEvent.click(boutonTerminerSigner);

    await waitFor(() => {
      expect(mockApi.history.post.length).toBe(1);
    });

    expect(mockLancerTraitement).not.toHaveBeenCalled();
    MockApi.stopMock();
  });

  test("DOIT afficher la modale QUAND l'utilisateur clique sur le bouton 'terminer et signer'", async () => {
    MockApi.deployer(
      CONFIG_POST_COMPOSITION_ACTE_TEXTE,
      { body: { nature_acte: "A", texte_corps_acte: "texte corps acte", titulaires: "" } },
      { data: { contenu: "", nbPages: 1 } }
    );

    renderWithRouter(
      <MockRECEContextProvider
        utilisateurConnecte={MockUtilisateurBuilder.utilisateurConnecte().avecDroit(Droit.TRANSCRIPTION_SIGNER_ACTE).generer()}
      >
        <MockSaisieProjetActeContextProvider
          projetActe={projetActe}
          requete={requeteTranscriptionASigner}
          mettreAJourDonneesContext={vi.fn()}
        >
          <FormulaireSaisieProjet />
        </MockSaisieProjetActeContextProvider>
      </MockRECEContextProvider>
    );

    const mockApi = MockApi.getMock();

    const boutonTerminerSigner = screen.getByRole("button", { name: "Terminer et signer" });
    await userEvent.click(boutonTerminerSigner);

    await waitFor(() => {
      expect(mockApi.history.post.length).toBe(1);
      expect(mockApi.history.post[0].url).toContain("composition/ACTE_TEXTE/1");
    });
  });
});
