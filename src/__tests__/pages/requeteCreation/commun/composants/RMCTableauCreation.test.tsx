import { RMCTableauCreation } from "@pages/requeteCreation/commun/composants/RMCTableauCreation";
import { act, render } from "@testing-library/react";
import React from "react";

test("Doit rendre le composant RMCTableauCreation de la page création correctement", async () => {
  await act(async () => {
    const { container } = render(<RMCTableauCreation />);
    expect(container.getElementsByClassName("RMCTableauCreation").length).toBe(
      1
    );
  });
});
