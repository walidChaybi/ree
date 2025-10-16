import { CONFIG_POST_COMPOSITION_ACTE_TEXTE } from "@api/configurations/composition/PostCompositionActeTexteApiConfigApi";
import { CONFIG_PATCH_PROJET_ACTE_TRANSCRIPTION } from "@api/configurations/etatCivil/acte/transcription/PatchProjetActeTranscriptionConfigApi";
import { CONFIG_GET_LIBELLE_DECRET } from "@api/configurations/etatCivil/typesRegistres/GetLibelleDecretConfigApi";
import { mappingRequeteCreation } from "@hook/requete/DetailRequeteHook";
import { MockApi } from "@mock/appelsApi/MockApi";
import MockRECEContextProvider from "@mock/context/MockRECEContextProvider";
import MockSaisieProjetActeContextProvider from "@mock/context/MockSaisieProjetActeContextProvider";
import { projetActe, projetActeNaissanceDto, projetActeNaissancePatchDto } from "@mock/data/projetActeTranscrit";
import { requeteCreationTranscription } from "@mock/data/requeteCreationTranscription";
import MockUtilisateurBuilder from "@mock/model/agent/MockUtilisateur";
import { Droit } from "@model/agent/enum/Droit";
import { StatutRequete } from "@model/requete/enum/StatutRequete";
import { act, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { RouterProvider, createMemoryRouter } from "react-router";
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import FormulaireSaisieProjet from "../../../../../../composants/pages/requetesConsulaire/saisieProjet/formulaireSaisieProjet/FormulaireSaisieProjet";

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

describe("Test du composant FormulaireSaiseProjet", async () => {
  const renderWithRouter = (component: React.ReactElement, initialEntries = ["/"]) => {
    const router = createMemoryRouter(
      [
        {
          path: "/",
          element: component
        },
        {
          path: "/autre-page",
          element: <div>Autre page</div>
        }
      ],
      {
        initialEntries
      }
    );

    return {
      ...render(<RouterProvider router={router} />),
      router
    };
  };
  beforeEach(() => {
    vi.clearAllMocks();

    MockApi.deployer(
      CONFIG_GET_LIBELLE_DECRET,
      {
        path: { idTypeRegistre: "7a091a3b-6835-4824-94fb-527d62926d45" }
      },
      { data: { libelleDecret: "libelleDecret" } }
    );
  });

  afterEach(() => {
    MockApi.stopMock();
  });

  describe("Test des boutons et appels API", async () => {
    vi.mock("../../../../../../composants/pages/requetesConsulaire/saisieProjet/formulaireSaisieProjet/BlocDeclarant.tsx", () => ({
      default: () => <div>{"Bloc declarant"}</div>
    }));

    vi.mock("../../../../../../composants/pages/requetesConsulaire/saisieProjet/formulaireSaisieProjet/BlocAutresEnonciations.tsx", () => ({
      default: () => <div>{"Bloc autres enonciations"}</div>
    }));

    vi.mock("../../../../../../composants/pages/requetesConsulaire/saisieProjet/formulaireSaisieProjet/BlocActeEtranger.tsx", () => ({
      default: () => <div>{"Bloc acte etranger"}</div>
    }));

    vi.mock("../../../../../../composants/pages/requetesConsulaire/saisieProjet/formulaireSaisieProjet/BlocMentions.tsx", () => ({
      default: () => <div>{"Bloc mentions"}</div>
    }));

    vi.mock("../../../../../../composants/pages/requetesConsulaire/saisieProjet/formulaireSaisieProjet/BlocFormuleFinale.tsx", () => ({
      default: () => <div>{"Bloc formule finale"}</div>
    }));

    test("DOIT afficher le bouton 'enregistrer' QUAND l'utilisateur ne possède pas le droit signer_acte", async () => {
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

      const button = await screen.findByRole("button", { name: "Enregistrer" });
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
      const inputNomRetenuOEC: HTMLInputElement = screen.getByRole("textbox", { name: /Nom retenu par l'OEC/i });

      await userEvent.type(inputNomRetenuOEC, "Xi phun bin");

      const boutonTerminerSigner = screen.getByRole("button", { name: "Terminer et signer" });
      const boutonEnregistrer = screen.getByRole("button", { name: "Enregistrer" });
      expect(boutonTerminerSigner).toBeDefined();
      expect(boutonEnregistrer).toBeDefined();
    });

    test("DOIT appeler la fonction enregistrer QUAND l'utilisateur clique sur 'Enregistrer' avec des modifications", async () => {
      MockApi.deployer(CONFIG_PATCH_PROJET_ACTE_TRANSCRIPTION, { body: projetActeNaissancePatchDto }, { data: projetActeNaissanceDto });

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

      const mockApi = MockApi.getMock();

      const inputNomRetenuOEC: HTMLInputElement = screen.getByRole("textbox", { name: /Nom retenu par l'OEC/i });
      await userEvent.type(inputNomRetenuOEC, "Xi phun bin");

      const boutonEnregistrer = screen.getByRole("button", { name: "Enregistrer" });
      await userEvent.click(boutonEnregistrer);

      await waitFor(() => {
        expect(mockApi.history.patch.length).toBe(1);
      });
    });

    test("DOIT appeler la fonction terminer et signer QUAND l'utilisateur clique sur 'Terminer et signer' avec des modifications", async () => {
      MockApi.deployer(CONFIG_PATCH_PROJET_ACTE_TRANSCRIPTION, { body: projetActeNaissancePatchDto }, { data: projetActeNaissanceDto });

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
            mettreAJourDonneesContext={vi.fn().mockResolvedValue({})}
            requete={requeteTranscriptionASigner}
          >
            <FormulaireSaisieProjet />
          </MockSaisieProjetActeContextProvider>
        </MockRECEContextProvider>
      );

      const mockApi = MockApi.getMock();

      const inputNomRetenuOEC: HTMLInputElement = screen.getByRole("textbox", { name: /Nom retenu par l'OEC/i });
      await userEvent.type(inputNomRetenuOEC, "Xi phun bin");

      const boutonTerminerEtSigner = screen.getByRole("button", { name: "Terminer et signer" });
      await userEvent.click(boutonTerminerEtSigner);

      await waitFor(() => {
        expect(mockApi.history.patch.length).toBe(1);
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
        expect(mockApi.history.patch.length).toBe(0);
      });
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

    test("DOIT afficher la modale du blocker QUAND l'utilisateur tente de quitter la page en ayant fait une modification", async () => {
      const { router } = renderWithRouter(
        <MockRECEContextProvider
          utilisateurConnecte={MockUtilisateurBuilder.utilisateurConnecte().avecDroit(Droit.TRANSCRIPTION_CREER_PROJET_ACTE).generer()}
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

      const inputNomRetenuOEC: HTMLInputElement = screen.getByRole("textbox", { name: /Nom retenu par l'OEC/i });

      await userEvent.type(inputNomRetenuOEC, "Xi phun bin");

      act(() => {
        router.navigate("/autre-page");
      });

      await waitFor(() => {
        expect(screen.getByText("Modifications à enregistrer")).toBeDefined();
        expect(screen.getByText("Des modifications ont été apportées au projet. Que souhaitez-vous faire ?")).toBeDefined();
      });
    });

    test("DOIT pas afficher la modale du blocker QUAND l'utilisateur tente de quitter la page si le statut de la requête est TRAITE ", async () => {
      const { router } = renderWithRouter(
        <MockRECEContextProvider
          utilisateurConnecte={MockUtilisateurBuilder.utilisateurConnecte().avecDroit(Droit.TRANSCRIPTION_CREER_PROJET_ACTE).generer()}
        >
          <MockSaisieProjetActeContextProvider
            projetActe={null}
            requete={{
              ...requeteTranscriptionASigner,
              statutCourant: { ...requeteTranscriptionASigner.statutCourant, statut: StatutRequete.TRAITE }
            }}
            mettreAJourDonneesContext={vi.fn()}
          >
            <FormulaireSaisieProjet />
          </MockSaisieProjetActeContextProvider>
        </MockRECEContextProvider>
      );

      const inputNomRetenuOEC: HTMLInputElement = screen.getByRole("textbox", { name: /Nom retenu par l'OEC/i });

      await userEvent.type(inputNomRetenuOEC, "Xi phun bin");

      act(() => {
        router.navigate("/autre-page");
      });

      await waitFor(() => {
        expect(screen.getByText("Autre page")).toBeDefined();
      });
    });
  });

  describe("Affichage du formulaire", () => {
    test("DOIT afficher le formulaire de saisie de projet d'acte", async () => {
      const { container } = renderWithRouter(
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

      await waitFor(() => {
        expect(container.firstChild).toBeTruthy();
      });

      expect(container.firstChild).toMatchSnapshot();
    });
  });
});
