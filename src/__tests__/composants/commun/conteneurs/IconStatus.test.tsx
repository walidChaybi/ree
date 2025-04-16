import { render } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import IconeStatut from "../../../../composants/commun/conteneurs/IconeStatus";

describe("Composant IconeStatut", () => {
  test("doit rendre l'icône Update pour le statut 'En traitement'", () => {
    const { container } = render(<IconeStatut statut="En traitement" />);
    expect(container.firstChild).toMatchSnapshot();
  });

  test("doit rendre l'icône PendingActions pour le statut 'À signer'", () => {
    const { container } = render(<IconeStatut statut="À signer" />);

    expect(container.firstChild).toMatchSnapshot();
  });

  test("ne doit rien rendre pour un statut non reconnu", () => {
    const { container } = render(<IconeStatut statut="Statut inconnu" />);

    expect(container.firstChild).toMatchSnapshot();
  });
});
