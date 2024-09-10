import { GestionMentions } from "@pages/requeteCreation/commun/composants/GestionMentions";
import { render } from "@testing-library/react";
import { expect, test } from "vitest";

test("Doit rendre le composant GestionMentions de la page création correctement", () => {
  const { container } = render(<GestionMentions />);
  expect(container.getElementsByClassName("GestionMentions").length).toBe(1);
});
