import { Echanges } from "@pages/requeteCreation/commun/composants/Echanges";
import { render } from "@testing-library/react";
import { expect, test } from "vitest";

test("Doit rendre le composant Echanges de la page création saisie de projet correctement", () => {
  const { container } = render(<Echanges />);
  expect(container.getElementsByClassName("Echanges").length).toBe(1);
});
