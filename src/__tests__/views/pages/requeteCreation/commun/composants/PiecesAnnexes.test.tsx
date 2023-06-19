import { PiecesAnnexes } from "@pages/requeteCreation/commun/composants/PiecesAnnexes";
import { act, render } from "@testing-library/react";

test("Doit rendre le composant PiecesAnnexes de la page création correctement", async () => {
  await act(async () => {
    const { container } = render(<PiecesAnnexes />);
    expect(container.getElementsByClassName("PiecesAnnexes").length).toBe(1);
  });
});
