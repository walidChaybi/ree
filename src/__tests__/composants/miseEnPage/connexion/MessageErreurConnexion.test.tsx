import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import MessageErreurConnexion from "../../../../composants/miseEnPage/connexion/MessageErreurConnexion";

describe("test du composant MessageErreurConnexion", () => {
  const renderComponent = (message: string) => {
    return render(<MessageErreurConnexion message={message} />);
  };

  test("Doit afficher correctement le composant", () => {
    const snapshot = renderComponent("Erreur fictive");

    expect(snapshot).toMatchSnapshot();
  });

  test("Le message affiché correspond à celui passé en paramètre", () => {
    const messageErreurDeTest = "Erreur fictive";

    renderComponent(messageErreurDeTest);

    expect(screen.getByText(messageErreurDeTest)).toBeDefined();
  });
});
