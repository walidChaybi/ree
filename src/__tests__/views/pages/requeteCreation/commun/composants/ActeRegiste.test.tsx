import ActeRegistre from "@pages/requeteCreation/commun/composants/ActeRegistre";
import { act, render } from "@testing-library/react";

test("Doit rendre le composant ApercuProjet de la page création correctement", async () => {
  await act(async () => {
    const { container } = render(
      <ActeRegistre idActeAAfficher={"885bdb13-d995-4dbd-93cb-a7a3b2eee5c8"} />
    );
    expect(container.getElementsByClassName("ActeRegistre").length).toBe(1);
  });
});
