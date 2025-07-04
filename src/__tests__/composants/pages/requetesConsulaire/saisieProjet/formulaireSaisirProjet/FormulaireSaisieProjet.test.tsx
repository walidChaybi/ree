import MockRECEContextProvider from "@mock/context/MockRECEContextProvider";
import MockSaisieProjetActeContextProvider from "@mock/context/MockSaisieProjetActeContextProvider";
import MockUtilisateurBuilder from "@mock/model/agent/MockUtilisateur";
import { Droit } from "@model/agent/enum/Droit";
import { IRequeteCreationTranscription } from "@model/requete/IRequeteCreationTranscription";
import { StatutRequete } from "@model/requete/enum/StatutRequete";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import FormulaireSaisieProjet from "../../../../../../composants/pages/requetesConsulaire/saisieProjet/formulaireSaisieProjet/FormulaireSaisieProjet";

describe("test du formulaire saisie projet acte transcrit de naissance", async () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.resetAllMocks();
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

  test("Doit afficher le bouton submit QUAND le statut de la requete est en traitement", () => {
    render(
      <MockRECEContextProvider utilisateurConnecte={MockUtilisateurBuilder.utilisateurConnecte().avecDroit(Droit.SIGNER_ACTE).generer()}>
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

    const button = screen.getByRole("button", { name: "Terminer et signer" });
    expect(button.getAttribute("type")).toBe("submit");
  });

  test("Doit afficher le bouton submit QUAND les valeurs initiales sont modifiées", async () => {
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

    const button = screen.getByRole("button", { name: "Terminer et signer" });
    expect(button.getAttribute("type")).toBe("submit");
  });
});
