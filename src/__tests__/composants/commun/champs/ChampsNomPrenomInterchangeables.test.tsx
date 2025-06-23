import { act, fireEvent, render, screen } from "@testing-library/react";
import { Formik } from "formik";
import { describe, expect, test } from "vitest";
import { ChampsNomPrenomInterchangeables } from "../../../../composants/commun/champs/ChampsNomPrenomInterchangeables";

describe("Test du composant Champs Nom Prenom Interchangeables", () => {
  const afficherFormulaire = () =>
    render(
      <Formik
        initialValues={{ nom: "Son", prenom: "Goku" }}
        onSubmit={() => {}}
      >
        <ChampsNomPrenomInterchangeables
          cheminNom="nom"
          cheminPrenom="prenom"
        />
      </Formik>
    );

  test("Doit afficher correctement le composant et gérer les interactions avec le nom sécable", async () => {
    await act(async () => afficherFormulaire());
    const champNom: HTMLInputElement = screen.getByLabelText("Nom");
    const champPrenom: HTMLInputElement = screen.getByLabelText("Prénom");

    expect(champNom.value).toBe("Son");
    expect(champPrenom.value).toBe("Goku");

    const boutonReinitialiser: HTMLButtonElement = screen.getByTitle("Intervertir Nom et Prénom");
    fireEvent.click(boutonReinitialiser);

    expect(champNom.value).toBe("Goku");
    expect(champPrenom.value).toBe("Son");
  });
});
