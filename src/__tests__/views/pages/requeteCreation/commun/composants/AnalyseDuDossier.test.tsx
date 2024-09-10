import { AnalyseDuDossier } from "@pages/requeteCreation/commun/composants/AnalyseDuDossier";
import { render } from "@testing-library/react";
import { expect, test } from "vitest";

test("Doit rendre le composant AnalyseDuDossier de la page de création correctement", () => {
  const { container } = render(<AnalyseDuDossier />);
  expect(container.getElementsByClassName("AnalyseDuDossier").length).toBe(1);
});
