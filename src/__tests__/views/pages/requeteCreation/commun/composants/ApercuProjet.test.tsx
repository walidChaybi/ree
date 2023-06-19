import { ApercuProjet } from "@pages/requeteCreation/commun/composants/ApercuProjet";
import { act, render } from "@testing-library/react";

test("Doit rendre le composant ApercuProjet de la page création correctement", async () => {
  await act(async () => {
    const { container } = render(<ApercuProjet />);
    expect(container.getElementsByClassName("ApercuProjet").length).toBe(1);
  });
});
