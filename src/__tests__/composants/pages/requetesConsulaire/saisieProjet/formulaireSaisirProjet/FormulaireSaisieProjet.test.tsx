import MockRECEContextProvider from "@mock/context/MockRECEContextProvider";
import MockSaisieProjetActeContextProvider from "@mock/context/MockSaisieProjetActeContextProvider";
import MockUtilisateurBuilder from "@mock/model/agent/MockUtilisateur";
import { Droit } from "@model/agent/enum/Droit";
import { IRequeteCreationTranscription } from "@model/requete/IRequeteCreationTranscription";
import { StatutRequete } from "@model/requete/enum/StatutRequete";
import { URL_MES_REQUETES_CONSULAIRE_TRANSCRIPTION_APERCU_PRISE_EN_CHARGE_ID } from "@router/ReceUrls";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { RouterProvider } from "react-router";
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import FormulaireSaisieProjet from "../../../../../../composants/pages/requetesConsulaire/saisieProjet/formulaireSaisieProjet/FormulaireSaisieProjet";
import { createTestingRouter } from "../../../../../__tests__utils__/testsUtil";

const mockMettreAJourDonneesContext = vi.fn();
const mockLancerTraitement = vi.fn();

const mockUseTraitementApi = vi.fn().mockReturnValue({
  lancerTraitement: mockLancerTraitement,
  traitementEnCours: false
});

vi.mock("../../../../../hooks/api/TraitementApiHook", () => ({
  default: mockUseTraitementApi
}));

describe("test du formulaire saisie projet acte transcrit de naissance", async () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockLancerTraitement.mockClear();
    mockUseTraitementApi.mockClear();
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  const FormulaireavecProps = (statutRequete: StatutRequete, droit = Droit.CREER_ACTE_TRANSCRIT) => {
    const requete = {
      id: "test-id",
      statutCourant: {
        statut: statutRequete,
        dateEffet: 1111
      },
      titulaires: [
        {
          suiviDossiers: [
            {
              idSuiviDossier: "test-suivi-id"
            }
          ]
        }
      ]
    } as IRequeteCreationTranscription;

    const formulaireComponent = (
      <MockRECEContextProvider utilisateurConnecte={MockUtilisateurBuilder.utilisateurConnecte().avecDroit(droit).generer()}>
        <MockSaisieProjetActeContextProvider
          projetActe={null}
          requete={requete}
          mettreAJourDonneesContext={mockMettreAJourDonneesContext}
        >
          <FormulaireSaisieProjet />
        </MockSaisieProjetActeContextProvider>
      </MockRECEContextProvider>
    );

    const router = createTestingRouter(
      [
        {
          path: URL_MES_REQUETES_CONSULAIRE_TRANSCRIPTION_APERCU_PRISE_EN_CHARGE_ID,
          element: formulaireComponent
        }
      ],
      [URL_MES_REQUETES_CONSULAIRE_TRANSCRIPTION_APERCU_PRISE_EN_CHARGE_ID]
    );
    return <RouterProvider router={router} />;
  };

  test("Doit afficher le formulaire de saisie de projet d'acte", async () => {
    const { container } = render(FormulaireavecProps(StatutRequete.PRISE_EN_CHARGE, Droit.SIGNER_ACTE));
    expect(container.firstChild).toMatchSnapshot();
  });

  test("Doit afficher le bouton submit QUAND le statut de la requete est en traitement", () => {
    render(FormulaireavecProps(StatutRequete.PRISE_EN_CHARGE, Droit.CREER_ACTE_TRANSCRIT));

    const button = screen.getByRole("button", { name: "Enregistrer" });
    expect(button).toBeDefined();
  });

  test("Doit afficher le bouton submit QUAND les valeurs initiales sont modifiées", async () => {
    render(FormulaireavecProps(StatutRequete.PRISE_EN_CHARGE, Droit.SIGNER_ACTE));

    const inputNomRetenuOEC: HTMLInputElement = screen.getByRole("textbox", { name: /titulaire.nomRetenuOEC/i });

    await userEvent.type(inputNomRetenuOEC, "Xi phun bin");

    const boutonTerminerSigner = screen.getByRole("button", { name: "Terminer et signer" });
    const boutonEnregistrer = screen.getByRole("button", { name: "Enregistrer" });
    expect(boutonTerminerSigner).toBeDefined();
    expect(boutonEnregistrer).toBeDefined();
  });

  test.skip("DOIT appeler la fonction enregistrer QUAND l'utilisateur clique sur 'Enregistrer' avec des modifications", async () => {
    render(FormulaireavecProps(StatutRequete.PRISE_EN_CHARGE, Droit.SIGNER_ACTE));

    const inputNomRetenuOEC: HTMLInputElement = screen.getByRole("textbox", { name: /titulaire.nomRetenuOEC/i });
    await userEvent.type(inputNomRetenuOEC, "Xi phun bin");

    const boutonEnregistrer = screen.getByRole("button", { name: "Enregistrer" });
    await userEvent.click(boutonEnregistrer);

    expect(mockLancerTraitement).toHaveBeenCalled();
  });

  test.skip("DOIT appeler la fonction terminer et signer QUAND l'utilisateur clique sur 'Terminer et signer' avec des modifications", async () => {
    render(FormulaireavecProps(StatutRequete.PRISE_EN_CHARGE, Droit.SIGNER_ACTE));

    const inputNomRetenuOEC: HTMLInputElement = screen.getByRole("textbox", { name: /titulaire.nomRetenuOEC/i });
    await userEvent.type(inputNomRetenuOEC, "Xi phun bin");

    const boutonTerminerEtSigner = screen.getByRole("button", { name: "Terminer et signer" });
    await userEvent.click(boutonTerminerEtSigner);

    expect(mockLancerTraitement).toHaveBeenCalled();
  });

  test("DOIT pas appeler la fonction enregistrer ou terminer et signer QUAND aucune modification n'est effectuées", async () => {
    render(FormulaireavecProps(StatutRequete.PRISE_EN_CHARGE, Droit.SIGNER_ACTE));

    const boutonEnregistrer = screen.getByRole("button", { name: "Enregistrer" });
    const boutonTerminerSigner = screen.getByRole("button", { name: "Terminer et signer" });
    await userEvent.click(boutonEnregistrer);
    await userEvent.click(boutonTerminerSigner);

    expect(mockLancerTraitement).not.toHaveBeenCalled();
  });

  test("DOIT afficher la modale QUAND l'utilisateur clique sur le bouton 'terminer et signer'", async () => {
    render(FormulaireavecProps(StatutRequete.PRISE_EN_CHARGE, Droit.SIGNER_ACTE));

    const inputNomRetenuOEC: HTMLInputElement = screen.getByRole("textbox", { name: /titulaire.nomRetenuOEC/i });
    await userEvent.type(inputNomRetenuOEC, "Xi phun bin");

    const boutonTerminerSigner = screen.getByRole("button", { name: "Terminer et signer" });
    await userEvent.click(boutonTerminerSigner);

    await waitFor(() => {
      expect(document.getElementById("conteneur-modale-rece")).toBeDefined();
    });
  });
});
