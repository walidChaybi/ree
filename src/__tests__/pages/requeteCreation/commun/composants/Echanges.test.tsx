import { Echanges } from "@pages/requeteCreation/commun/composants/Echanges";
import { act, render } from "@testing-library/react";
import React from "react";

test("Doit rendre le composant Echanges de la page création saisie de projet correctement", async () => {
  await act(async () => {
    const { container } = render(<Echanges />);
    expect(container.getElementsByClassName("Echanges").length).toBe(1);
  });
});
