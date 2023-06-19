import { SaisieProjet } from "@pages/requeteCreation/commun/composants/SaisieProjet";
import { act, render } from "@testing-library/react";

test("Doit rendre le composant SaisieProjet de la page création correctement", async () => {
  await act(async () => {
    const { container } = render(<SaisieProjet />);
    expect(container.getElementsByClassName("SaisieProjet").length).toBe(1);
  });
});
