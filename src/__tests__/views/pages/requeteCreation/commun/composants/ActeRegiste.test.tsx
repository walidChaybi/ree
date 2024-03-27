import ActeRegistre from "@pages/requeteCreation/commun/composants/ActeRegistre";
import { render, screen, waitFor } from "@testing-library/react";

test("Doit rendre le composant ApercuProjet de la page création correctement QUAND on ne vient pas d'un parcours de signature d'acte", async () => {
  const { container } = render(
    <ActeRegistre idActeAAfficher={"885bdb13-d995-4dbd-93cb-a7a3b2eee5c8"} />
  );

  await waitFor(() => {
    expect(container.getElementsByClassName("AlertesActes")).toBeDefined();
    expect(
      container.getElementsByClassName("DocumentActeViewer")
    ).toBeDefined();


    expect(screen.getByTitle("Visionneuse PDF")).toBeDefined();
  });
});

test("Doit rendre le composant ApercuProjet de la page création correctement QUAND on vient d'un parcours de signature d'acte", async () => {
  render(
    <ActeRegistre
      idActeAAfficher={"885bdb13-d995-4dbd-93cb-a7a3b2eee5c8"}
      affichageApresSignature={true}
    />
  );
  await waitFor(() => {
    expect(screen.getByTitle("Visionneuse acte registre")).toBeDefined();
  });
});