import MockRECEContextProvider from "@mock/context/MockRECEContextProvider";
import MockSaisieProjetActeContextProvider from "@mock/context/MockSaisieProjetActeContextProvider";
import { projetActe } from "@mock/data/projetActeTranscrit";
import MockUtilisateurBuilder from "@mock/model/agent/MockUtilisateur";
import { Droit } from "@model/agent/enum/Droit";
import { IRequeteCreationTranscription } from "@model/requete/IRequeteCreationTranscription";
import { StatutRequete } from "@model/requete/enum/StatutRequete";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeAll, beforeEach, describe, expect, test, vi } from "vitest";
import FormulaireSaisieProjet from "../../../../../../composants/pages/requetesConsulaire/saisieProjet/formulaireSaisieProjet/FormulaireSaisieProjet";
import * as TraitementApiHook from "../../../../../../hooks/api/TraitementApiHook";

describe("test du formulaire saisie projet acte transcrit de naissance", async () => {
  const mockLancerTraitement = vi.fn();

  vi.spyOn(TraitementApiHook, "default").mockReturnValue({
    lancerTraitement: mockLancerTraitement,
    traitementEnCours: false
  });

  beforeAll(() => {
    vi.mock("../../../../../hooks/api/TraitementApiHook", () => ({
      default: () => ({
        lancerTraitement: mockLancerTraitement,
        traitementEnCours: false
      })
    }));
  });

  beforeEach(() => {
    vi.clearAllMocks();
    mockLancerTraitement.mockClear();
  });

  test("Doit afficher le formulaire de saisie de projet d'acte", async () => {
    const { container } = render(
      <MockRECEContextProvider utilisateurConnecte={MockUtilisateurBuilder.utilisateurConnecte().avecDroit(Droit.SIGNER_ACTE).generer()}>
        <MockSaisieProjetActeContextProvider
          projetActe={null}
          requete={
            {
              statutCourant: {
                statut: StatutRequete.PRISE_EN_CHARGE,
                dateEffet: 1111
              }
            } as IRequeteCreationTranscription
          }
          mettreAJourDonneesContext={vi.fn()}
        >
          <FormulaireSaisieProjet />
        </MockSaisieProjetActeContextProvider>
      </MockRECEContextProvider>
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test("DOIT afficher le bouton 'enregistrer' QUAND l'utilisateur ne possède pas le droit signer_acte", () => {
    render(
      <MockRECEContextProvider
        utilisateurConnecte={MockUtilisateurBuilder.utilisateurConnecte().avecDroit(Droit.CREER_ACTE_TRANSCRIT).generer()}
      >
        <MockSaisieProjetActeContextProvider
          projetActe={null}
          requete={
            {
              statutCourant: {
                statut: StatutRequete.EN_TRAITEMENT,
                dateEffet: 1111
              }
            } as IRequeteCreationTranscription
          }
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
    render(
      <MockRECEContextProvider utilisateurConnecte={MockUtilisateurBuilder.utilisateurConnecte().avecDroit(Droit.SIGNER_ACTE).generer()}>
        <MockSaisieProjetActeContextProvider
          projetActe={null}
          requete={
            {
              statutCourant: {
                statut: StatutRequete.A_SIGNER,
                dateEffet: 1111
              }
            } as IRequeteCreationTranscription
          }
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
    render(
      <MockRECEContextProvider utilisateurConnecte={MockUtilisateurBuilder.utilisateurConnecte().avecDroit(Droit.SIGNER_ACTE).generer()}>
        <MockSaisieProjetActeContextProvider
          projetActe={projetActe}
          requete={
            {
              statutCourant: {
                statut: StatutRequete.A_SIGNER,
                dateEffet: 1111
              }
            } as IRequeteCreationTranscription
          }
          mettreAJourDonneesContext={vi.fn()}
        >
          <FormulaireSaisieProjet />
        </MockSaisieProjetActeContextProvider>
      </MockRECEContextProvider>
    );

    const inputNomRetenuOEC: HTMLInputElement = screen.getByRole("textbox", { name: /titulaire.nomRetenuOEC/i });
    await userEvent.type(inputNomRetenuOEC, "Xi phun bin");

    const boutonEnregistrer = screen.getByRole("button", { name: "Enregistrer" });
    await userEvent.click(boutonEnregistrer);

    expect(mockLancerTraitement).toHaveBeenCalled();
  });

  test("DOIT appeler la fonction terminer et signer QUAND l'utilisateur clique sur 'Terminer et signer' avec des modifications", async () => {
    render(
      <MockRECEContextProvider utilisateurConnecte={MockUtilisateurBuilder.utilisateurConnecte().avecDroit(Droit.SIGNER_ACTE).generer()}>
        <MockSaisieProjetActeContextProvider
          projetActe={projetActe}
          requete={
            {
              statutCourant: {
                statut: StatutRequete.A_SIGNER,
                dateEffet: 1111
              }
            } as IRequeteCreationTranscription
          }
          mettreAJourDonneesContext={vi.fn()}
        >
          <FormulaireSaisieProjet />
        </MockSaisieProjetActeContextProvider>
      </MockRECEContextProvider>
    );

    const inputNomRetenuOEC: HTMLInputElement = screen.getByRole("textbox", { name: /titulaire.nomRetenuOEC/i });
    await userEvent.type(inputNomRetenuOEC, "Xi phun bin");

    const boutonTerminerEtSigner = screen.getByRole("button", { name: "Terminer et signer" });
    await userEvent.click(boutonTerminerEtSigner);

    expect(mockLancerTraitement).toHaveBeenCalled();
  });

  test("DOIT pas appeler la fonction enregistrer ou terminer et signer QUAND aucune modification n'est effectuées", async () => {
    render(
      <MockRECEContextProvider utilisateurConnecte={MockUtilisateurBuilder.utilisateurConnecte().avecDroit(Droit.SIGNER_ACTE).generer()}>
        <MockSaisieProjetActeContextProvider
          projetActe={projetActe}
          requete={
            {
              statutCourant: {
                statut: StatutRequete.A_SIGNER,
                dateEffet: 1111
              }
            } as IRequeteCreationTranscription
          }
          mettreAJourDonneesContext={vi.fn()}
        >
          <FormulaireSaisieProjet />
        </MockSaisieProjetActeContextProvider>
      </MockRECEContextProvider>
    );

    const boutonEnregistrer = screen.getByRole("button", { name: "Enregistrer" });
    const boutonTerminerSigner = screen.getByRole("button", { name: "Terminer et signer" });
    await userEvent.click(boutonEnregistrer);
    await userEvent.click(boutonTerminerSigner);

    expect(mockLancerTraitement).not.toHaveBeenCalled();
  });

  test("DOIT afficher la modale QUAND l'utilisateur clique sur le bouton 'terminer et signer'", async () => {
    render(
      <MockRECEContextProvider utilisateurConnecte={MockUtilisateurBuilder.utilisateurConnecte().avecDroit(Droit.SIGNER_ACTE).generer()}>
        <MockSaisieProjetActeContextProvider
          projetActe={projetActe}
          requete={
            {
              statutCourant: {
                statut: StatutRequete.A_SIGNER,
                dateEffet: 1111
              }
            } as IRequeteCreationTranscription
          }
          mettreAJourDonneesContext={vi.fn()}
        >
          <FormulaireSaisieProjet />
        </MockSaisieProjetActeContextProvider>
      </MockRECEContextProvider>
    );

    const inputNomRetenuOEC: HTMLInputElement = screen.getByRole("textbox", { name: /titulaire.nomRetenuOEC/i });
    await userEvent.type(inputNomRetenuOEC, "Xi phun bin");

    const boutonTerminerSigner = screen.getByRole("button", { name: "Terminer et signer" });
    await userEvent.click(boutonTerminerSigner);

    await waitFor(() => {
      expect(document.getElementById("conteneur-modale-rece")).toBeDefined();
    });
  });
});
