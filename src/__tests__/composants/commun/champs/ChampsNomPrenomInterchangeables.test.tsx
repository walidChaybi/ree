import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
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

    const boutonIntervertir: HTMLButtonElement = screen.getByTitle("Intervertir Nom et Prénom");
    fireEvent.click(boutonIntervertir);

    expect(champNom.value).toBe("Goku");
    expect(champPrenom.value).toBe("Son");
  });

  test("Doit gérer le collage d'un nom complet", async () => {
    await act(async () => afficherFormulaire());
    const champNom: HTMLInputElement = screen.getByLabelText("Nom");
    const champPrenom: HTMLInputElement = screen.getByLabelText("Prénom");

    // Doit placer les vocables en majuscule dans nom et celles en minuscule dans prenom
    await userEvent.click(champNom);
    await userEvent.paste("NOM1 Prenom1");

    await waitFor(() => {
      expect(champNom.value).toBe("NOM1");
      expect(champPrenom.value).toBe("Prenom1");
    });

    await userEvent.click(champNom);
    await userEvent.paste("Prenom1 NOM1");

    await waitFor(() => {
      expect(champNom.value).toBe("NOM1");
      expect(champPrenom.value).toBe("Prenom1");
    });

    await userEvent.click(champNom);
    await userEvent.paste("NOM1 NOM-2 N'OM3 Prenom1 Prenom2 Pre-nom3");

    await waitFor(() => {
      expect(champNom.value).toBe("NOM1 NOM-2 N'OM3");
      expect(champPrenom.value).toBe("Prenom1 Prenom2 Pre-nom3");
    });

    // Ne DOIT PAS intervenir si les deux groupes de vocable ne sont pas clairement séparés
    champNom.value = "";
    champPrenom.value = "";

    await userEvent.clear(champNom);
    await userEvent.clear(champPrenom);

    await userEvent.click(champNom);
    await userEvent.paste("NOM1 NOM-2 N'OM3 Prenom1 NOM 4 Prenom2 Pre-nom3");

    await waitFor(() => {
      expect(champNom.value).toBe("NOM1 NOM-2 N'OM3 Prenom1 NOM 4 Prenom2 Pre-nom3");
      expect(champPrenom.value).toBe("");
    });
  });
});
