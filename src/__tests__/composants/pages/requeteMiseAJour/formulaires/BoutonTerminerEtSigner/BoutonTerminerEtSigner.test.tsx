import MockRECEContextProvider from "@mock/context/MockRECEContextProvider";
import MockUtilisateurBuilder from "@mock/model/agent/MockUtilisateur";
import { UtilisateurConnecte } from "@model/agent/Utilisateur";
import { Droit } from "@model/agent/enum/Droit";
import { render, screen } from "@testing-library/react";
import { act } from "react";
import { describe, expect, test, vi } from "vitest";
import BoutonTerminerEtSigner from "../../../../../../composants/pages/requetesMiseAJour/formulaires/BoutonTerminerEtSigner";
import { EditionMiseAJourContext } from "../../../../../../contexts/EditionMiseAJourContextProvider";

const ID_ACTE = "369";

const mockUtilisateurSansDroit = MockUtilisateurBuilder.utilisateurConnecte().generer();

const utilisateurAvecDroitSigner: UtilisateurConnecte = MockUtilisateurBuilder.utilisateurConnecte()
  .avecDroits([Droit.SIGNER_MENTION, Droit.METTRE_A_JOUR_ACTE])
  .generer();

const valeursEditionParDefaut = {
  idActe: ID_ACTE,
  idRequete: "REQ-369",
  miseAJourEffectuee: true
} as any;

const actionsEdition = {
  setEstActeSigne: vi.fn(),
  desactiverBlocker: vi.fn(),
  changerOnglet: vi.fn()
} as any;

const renderBouton = async ({
  utilisateur,
  saisieMentionEnCours = false,
  miseAJourEffectuee = true
}: {
  utilisateur: UtilisateurConnecte;
  saisieMentionEnCours?: boolean;
  miseAJourEffectuee?: boolean;
}) => {
  await act(async () => {
    render(
      <MockRECEContextProvider utilisateurConnecte={utilisateur}>
        <EditionMiseAJourContext.Valeurs.Provider value={{ ...valeursEditionParDefaut, miseAJourEffectuee }}>
          <EditionMiseAJourContext.Actions.Provider value={actionsEdition}>
            <BoutonTerminerEtSigner
              saisieMentionEnCours={saisieMentionEnCours}
              acte={null}
            />
          </EditionMiseAJourContext.Actions.Provider>
        </EditionMiseAJourContext.Valeurs.Provider>
      </MockRECEContextProvider>
    );
  });
};

describe("BoutonTerminerEtSigner", () => {
  test("n'affiche pas le bouton si l'utilisateur n'a pas les droits", async () => {
    await renderBouton({ utilisateur: mockUtilisateurSansDroit });

    expect(screen.queryByRole("button", { name: /terminer et signer/i })).toBeNull();
  });

  test("affiche le bouton si l'utilisateur a les droits", async () => {
    await renderBouton({ utilisateur: utilisateurAvecDroitSigner });

    const bouton = screen.getByRole("button", { name: /terminer et signer/i });
    expect(bouton).toBeDefined();
    expect((bouton as HTMLButtonElement).disabled).toBe(false);
  });

  test("désactive le bouton quand une saisie de mention est en cours", async () => {
    await renderBouton({
      utilisateur: utilisateurAvecDroitSigner,
      saisieMentionEnCours: true
    });

    const bouton = screen.getByRole("button", { name: /terminer et signer/i });
    expect((bouton as HTMLButtonElement).disabled).toBe(true);
  });

  test("désactive le bouton quand la mise à jour n'est pas effectuée", async () => {
    await renderBouton({
      utilisateur: utilisateurAvecDroitSigner,
      miseAJourEffectuee: false
    });

    const bouton = screen.getByRole("button", { name: /terminer et signer/i });
    expect((bouton as HTMLButtonElement).disabled).toBe(true);
  });
});
