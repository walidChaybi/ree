import { AnalyseDuDossier } from "@pages/requeteCreation/commun/composants/AnalyseDuDossier";
import { act, render } from "@testing-library/react";
import React from "react";

test("Doit rendre le composant AnalyseDuDossier de la page de création correctement", async () => {
  await act(async () => {
    const { container } = render(<AnalyseDuDossier />);
    expect(container.getElementsByClassName("AnalyseDuDossier").length).toBe(1);
  });
});
