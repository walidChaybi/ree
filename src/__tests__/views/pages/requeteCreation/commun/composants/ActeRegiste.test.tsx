import { TypeAlerte } from "@model/etatcivil/enum/TypeAlerte";
import ActeRegistre from "@pages/requeteCreation/commun/composants/ActeRegistre";
import { render, screen, waitFor } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { elementAvecContexte } from "../../../../../__tests__utils__/testsUtil";
import { TYPE_ALERTE } from "../../../../../mock/data/NomenclatureTypeAlerte";

describe("test ActeRegistre", () => {
  TypeAlerte.init(TYPE_ALERTE);

  test("Doit rendre le composant ApercuProjet de la page création correctement QUAND on ne vient pas d'un parcours de signature d'acte", async () => {
    const { container } = render(elementAvecContexte(<ActeRegistre idActeAAfficher={"885bdb13-d995-4dbd-93cb-a7a3b2eee5c8"} />));

    waitFor(() => {
      expect(container.getElementsByClassName("AlertesActes")).toBeDefined();
      expect(container.getElementsByClassName("DocumentActeViewer")).toBeDefined();

      expect(screen.getByTitle("Visionneuse PDF")).toBeDefined();
    });
  });

  test("Doit rendre le composant ApercuProjet de la page création correctement QUAND on vient d'un parcours de signature d'acte", () => {
    render(
      elementAvecContexte(
        <ActeRegistre
          idActeAAfficher={"885bdb13-d995-4dbd-93cb-a7a3b2eee5c8"}
          affichageApresSignature={true}
        />
      )
    );
    waitFor(() => {
      expect(screen.getByTitle("Visionneuse acte registre")).toBeDefined();
    });
  });
});
