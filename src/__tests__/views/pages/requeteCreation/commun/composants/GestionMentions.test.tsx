import { GestionMentions } from "@pages/requeteCreation/commun/composants/GestionMentions";
import { act, render } from "@testing-library/react";

test("Doit rendre le composant GestionMentions de la page création correctement", async () => {
  await act(async () => {
    const { container } = render(<GestionMentions />);
    expect(container.getElementsByClassName("GestionMentions").length).toBe(1);
  });
});
