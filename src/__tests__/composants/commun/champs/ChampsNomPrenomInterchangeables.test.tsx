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

  test("DOIT appauvrir la valeur du champs Nom QUAND l'utilisateur clique sur le bouton 'appauvrir'", async () => {
    render(
      <Formik
        initialValues={{ nom: "Son", prenom: "Goku" }}
        onSubmit={() => {}}
      >
        <ChampsNomPrenomInterchangeables
          cheminNom="nom"
          cheminPrenom="prenom"
          avecAppauvrissement
        />
      </Formik>
    );

    const champNom: HTMLInputElement = screen.getByLabelText("Nom");

    await userEvent.clear(champNom);
    await userEvent.type(champNom, "Leroy");

    expect(champNom.value).toBe("Leroy");

    const boutonAppauvrir: HTMLButtonElement = screen.getByTitle("Appauvrir le nom");
    await userEvent.click(boutonAppauvrir);
    expect(champNom.value).toBe("Le*");

    await userEvent.clear(champNom);
    await userEvent.type(champNom, "L eroy");
    await userEvent.click(boutonAppauvrir);
    expect(champNom.value).toBe("L e*");

    await userEvent.clear(champNom);
    await userEvent.type(champNom, "Michel Leroy");
    await userEvent.click(boutonAppauvrir);
    expect(champNom.value).toBe("Mi*");

    await userEvent.clear(champNom);
    await userEvent.type(champNom, "Mi");
    await userEvent.click(boutonAppauvrir);
    expect(champNom.value).toBe("Mi*");

    await userEvent.clear(champNom);
    await userEvent.type(champNom, "Mi");
    await userEvent.click(boutonAppauvrir);
    expect(champNom.value).toBe("Mi*");
  });

  test("DOIT appauvrir la valeur du champs Prénom QUAND l'utilisateur clique sur le bouton 'appauvrir'", async () => {
    render(
      <Formik
        initialValues={{ nom: "Son", prenom: "Goku" }}
        onSubmit={() => {}}
      >
        <ChampsNomPrenomInterchangeables
          cheminNom="nom"
          cheminPrenom="prenom"
          avecAppauvrissement
        />
      </Formik>
    );

    const champPrenom: HTMLInputElement = screen.getByLabelText("Prénom");

    await userEvent.clear(champPrenom);
    await userEvent.type(champPrenom, "Michel");

    expect(champPrenom.value).toBe("Michel");

    const boutonAppauvrir: HTMLButtonElement = screen.getByTitle("Appauvrir le prénom");
    await userEvent.click(boutonAppauvrir);
    expect(champPrenom.value).toBe("M*");

    await userEvent.clear(champPrenom);
    await userEvent.type(champPrenom, "M ichel");
    await userEvent.click(boutonAppauvrir);
    expect(champPrenom.value).toBe("M*");

    await userEvent.clear(champPrenom);
    await userEvent.type(champPrenom, "Michel Leroy");
    await userEvent.click(boutonAppauvrir);
    expect(champPrenom.value).toBe("M*");

    await userEvent.clear(champPrenom);
    await userEvent.type(champPrenom, "M");
    await userEvent.click(boutonAppauvrir);
    expect(champPrenom.value).toBe("M*");
  });
});
