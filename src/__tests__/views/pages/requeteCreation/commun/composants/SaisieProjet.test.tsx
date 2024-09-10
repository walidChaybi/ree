import { SaisieProjet } from "@pages/requeteCreation/commun/composants/SaisieProjet";
import { render } from "@testing-library/react";
import { expect, test } from "vitest";

test("Doit rendre le composant SaisieProjet de la page création correctement", () => {
  const { container } = render(<SaisieProjet />);
  expect(container.getElementsByClassName("SaisieProjet").length).toBe(1);
});
