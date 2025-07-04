import MockRECEContextProvider from "@mock/context/MockRECEContextProvider";
import MockUtilisateurBuilder from "@mock/model/agent/MockUtilisateur";
import { Droit } from "@model/agent/enum/Droit";
import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import PartieDroiteSaisieProjet from "../../../../../composants/pages/requetesConsulaire/saisieProjet/PartieDroiteSaisieProjet";

describe.skip("PartieDroiteSaisieProjet - Tests du composant", () => {
  // TODO: ajouter le contexte SaisieProjetActeTranscritContext

  test("PartieDroiteSaisieProjet - Doit afficher les onglets", async () => {
    render(
      <MockRECEContextProvider>
        <PartieDroiteSaisieProjet />
      </MockRECEContextProvider>
    );
    await waitFor(() => {
      expect(screen.getByTitle("Saisir le projet")).toBeDefined();
    });
  });

  test("PartieDroiteSaisieProjet - Doit afficher l'onglet 'Saisir le projet'", async () => {
    render(
      <MockRECEContextProvider utilisateurConnecte={MockUtilisateurBuilder.utilisateurConnecte().avecDroit(Droit.SIGNER_ACTE).generer()}>
        <PartieDroiteSaisieProjet />
      </MockRECEContextProvider>
    );
    const boutonSaisirProjet = screen.getByRole("button", { name: "Saisir le projet" });
    const boutonEnregistrerEtVisualiser = screen.getByRole("button", { name: "Terminer et signer" });
    expect(boutonSaisirProjet).toBeDefined();
    fireEvent.click(boutonSaisirProjet);
    await waitFor(() => {
      expect(screen.getByText("Titulaire")).toBeDefined();
      expect(screen.getByText("Parents")).toBeDefined();
      expect(screen.getByText("Déclarant")).toBeDefined();
      expect(screen.getByText("Autres énonciations intéressant l'état civil")).toBeDefined();
      expect(screen.getByText("Acte étranger")).toBeDefined();
      expect(screen.getByText("Mentions figurant dans l'acte étranger")).toBeDefined();
      expect(screen.getByText("Formule finale")).toBeDefined();
      expect(boutonEnregistrerEtVisualiser).toBeDefined();
    });
    await act(async () => fireEvent.click(boutonEnregistrerEtVisualiser));
  });
});
