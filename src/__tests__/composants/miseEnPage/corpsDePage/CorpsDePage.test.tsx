import MockRECEContextProvider from "@mock/context/MockRECEContextProvider";
import { UtilisateurConnecte } from "@model/agent/Utilisateur";
import { render } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import CorpsDePage from "../../../../composants/miseEnPage/corpsDePage/CorpsDePage";

describe("test du composant CorpsDePage", () => {
  const snapshotCorpsDePage = (utilisateur?: UtilisateurConnecte, avecErreur: boolean = false): ChildNode | null => {
    const { container } = render(
      <div>
        <MockRECEContextProvider
          utilisateurConnecte={utilisateur ?? UtilisateurConnecte.inconnu()}
          erreurConnexion={{ avecErreur }}
        >
          <CorpsDePage />
        </MockRECEContextProvider>
      </div>
    );

    return container.firstChild;
  };

  test("Doit afficher correctement le corps de page", () => {
    const snapshot = snapshotCorpsDePage();

    expect(snapshot).toMatchSnapshot();
  });
});
