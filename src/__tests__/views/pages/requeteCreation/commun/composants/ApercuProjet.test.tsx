import { ApercuProjet } from "@pages/requeteCreation/commun/composants/ApercuProjet";
import { render } from "@testing-library/react";
import { expect, test } from "vitest";

test("Doit rendre le composant ApercuProjet de la page création correctement", () => {
  const { container } = render(<ApercuProjet />);
  expect(container.getElementsByClassName("ApercuProjet").length).toBe(1);
});
