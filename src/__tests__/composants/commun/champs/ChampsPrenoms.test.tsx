import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Form, Formik } from "formik";
import { describe, expect, test } from "vitest";
import ChampsPrenoms from "../../../../composants/commun/champs/ChampsPrenoms";

describe.skip("Test du composant Champs prénoms", () => {
  const afficherFormulaire = (prenoms: Object, chemin: boolean) =>
    render(
      <Formik
        initialValues={chemin ? { test: { prenoms: { nombrePrenomsAffiches: Object.keys(prenoms).length ?? 1, ...prenoms } } } : prenoms}
        onSubmit={() => {}}
      >
        <Form>
          <ChampsPrenoms
            cheminPrenoms={chemin ? "test.prenoms" : ""}
            prefixePrenom={"prenom"}
          />
        </Form>
      </Formik>
    );

  test("Affichage du formulaire prénoms", async () => {
    afficherFormulaire({ prenom1: "John" }, true);

    const boutonAjout = screen.getByTitle(/Ajouter un prénom/i);

    expect(screen.getByText("Prénom")).toBeDefined();
    expect(screen.getByDisplayValue("John")).toBeDefined();

    await act(() => userEvent.click(boutonAjout));

    expect(screen.getByText("Prénom 1")).toBeDefined();
    expect(screen.getByText("Prénom 2")).toBeDefined();

    await act(() => userEvent.click(boutonAjout));

    expect(screen.getByText("Prénom 1")).toBeDefined();
    expect(screen.getByText("Prénom 2")).toBeDefined();
    expect(screen.getByText("Prénom 3")).toBeDefined();

    await act(() => userEvent.click(screen.getAllByTitle("Supprimer ce prénom")[1]));

    expect(screen.getByText("Prénom 1")).toBeDefined();
    expect(screen.getByText("Prénom 2")).toBeDefined();
    expect(screen.queryByText("Prénom 3")).toBeNull();
  });
});
