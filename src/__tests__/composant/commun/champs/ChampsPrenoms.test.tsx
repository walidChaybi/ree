import { fireEvent, render, screen } from "@testing-library/react";
import { Formik } from "formik";
import { describe, expect, test } from "vitest";
import ChampsPrenoms from "../../../../composants/commun/champs/ChampsPrenoms";

describe("Test du composant Champs prénoms", () => {
  const afficherFormulaire = (prenoms: Object, chemin: boolean) =>
    render(
      <Formik
        initialValues={chemin ? { test: { prenoms: prenoms } } : prenoms}
        onSubmit={() => {}}
      >
        <ChampsPrenoms
          cheminPrenoms={chemin ? "test.prenoms" : ""}
          prefixePrenom={"prenom"}
        />
      </Formik>
    );

  test("Affichage du formulaire prénoms sans chemin", () => {
    afficherFormulaire({ prenom1: "John" }, false);

    expect(screen.getByText("Prénom")).toBeDefined();
    expect(screen.getByDisplayValue("John")).toBeDefined();

    fireEvent.click(screen.getByTitle("Ajouter un prénom"));

    expect(screen.getByText("Prénom 1")).toBeDefined();
    expect(screen.getByText("Prénom 2")).toBeDefined();

    fireEvent.click(screen.getByTitle("Ajouter un prénom"));

    expect(screen.getByText("Prénom 1")).toBeDefined();
    expect(screen.getByText("Prénom 2")).toBeDefined();
    expect(screen.getByText("Prénom 3")).toBeDefined();

    fireEvent.click(screen.getByTitle("Annuler la saisie"));

    expect(screen.getByText("Prénom 1")).toBeDefined();
    expect(screen.getByText("Prénom 2")).toBeDefined();
    expect(screen.queryByText("Prénom 3")).toBeNull();
  });

  test("Affichage du formulaire prénoms avec chemin", () => {
    afficherFormulaire({ prenom1: "John" }, true);

    expect(screen.getByText("Prénom")).toBeDefined();
    expect(screen.getByDisplayValue("John")).toBeDefined();

    fireEvent.click(screen.getByTitle("Ajouter un prénom"));

    expect(screen.getByText("Prénom 1")).toBeDefined();
    expect(screen.getByText("Prénom 2")).toBeDefined();

    fireEvent.click(screen.getByTitle("Ajouter un prénom"));

    expect(screen.getByText("Prénom 1")).toBeDefined();
    expect(screen.getByText("Prénom 2")).toBeDefined();
    expect(screen.getByText("Prénom 3")).toBeDefined();

    fireEvent.click(screen.getByTitle("Annuler la saisie"));

    expect(screen.getByText("Prénom 1")).toBeDefined();
    expect(screen.getByText("Prénom 2")).toBeDefined();
    expect(screen.queryByText("Prénom 3")).toBeNull();
  });
});
