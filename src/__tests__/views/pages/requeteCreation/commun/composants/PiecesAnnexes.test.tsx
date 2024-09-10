import { PiecesAnnexes } from "@pages/requeteCreation/commun/composants/PiecesAnnexes";
import { render } from "@testing-library/react";
import { expect, test } from "vitest";

test("Doit rendre le composant PiecesAnnexes de la page création correctement", () => {
  const { container } = render(<PiecesAnnexes />);
  expect(container.getElementsByClassName("PiecesAnnexes").length).toBe(1);
});
