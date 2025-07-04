import MockRECEContextProvider from "@mock/context/MockRECEContextProvider";
import MockUtilisateurBuilder from "@mock/model/agent/MockUtilisateur";
import { UtilisateurConnecte } from "@model/agent/Utilisateur";
import { Droit } from "@model/agent/enum/Droit";
import { render, screen } from "@testing-library/react";
import { act } from "react";
import { describe, expect, test } from "vitest";
import BoutonTerminerEtSigner from "../../../../../../composants/pages/requetesMiseAJour/formulaires/BoutonTerminerEtSigner";
import { EditionMiseAJourContext, IEditionMiseAJourContext } from "../../../../../../contexts/EditionMiseAJourContextProvider";

const ID_ACTE = "1010";
const mockUtilisateurSansDroit = MockUtilisateurBuilder.utilisateurConnecte().generer();

const utilisateurAvecDroitSigner = MockUtilisateurBuilder.utilisateurConnecte()
  .avecAttributs({ id: "7a091a3b-6835-4824-94fb-527d68926d55" })
  .avecDroits([Droit.SIGNER_MENTION, Droit.METTRE_A_JOUR_ACTE])
  .generer();

const renderSnapshot = async (mockUtilisateur: UtilisateurConnecte, saisieMentionEnCours: boolean): Promise<ChildNode | null> => {
  const { container } = await act(async () =>
    render(
      <div>
        <MockRECEContextProvider utilisateurConnecte={mockUtilisateur}>
          <EditionMiseAJourContext.Valeurs.Provider value={{ idActe: ID_ACTE, miseAJourEffectuee: true } as IEditionMiseAJourContext}>
            <BoutonTerminerEtSigner saisieMentionEnCours={saisieMentionEnCours} />
          </EditionMiseAJourContext.Valeurs.Provider>
        </MockRECEContextProvider>
      </div>
    )
  );

  return container.firstChild;
};

describe("BoutonTerminerEtSigner", () => {
  test("n'affiche pas le bouton si l'utilisateur n'a pas les droits", async () => {
    const snapshot = await renderSnapshot(mockUtilisateurSansDroit, false);
    expect(snapshot).toMatchSnapshot();
  });

  test("affiche le bouton si l'utilisateur a les droits", async () => {
    const snapshot = await renderSnapshot(utilisateurAvecDroitSigner, false);
    expect(snapshot).toMatchSnapshot();

    const bouton = screen.getByRole("button", { name: /terminer et signer/i });
    expect(bouton).toBeDefined();
  });

  test("désactive le bouton quand saisie en cours ou mise à jour non effectuée", async () => {
    const snapshot = await renderSnapshot(utilisateurAvecDroitSigner, true);
    expect(snapshot).toMatchSnapshot();
  });
});
