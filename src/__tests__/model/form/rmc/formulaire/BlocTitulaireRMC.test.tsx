import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Formik } from "formik";
import { expect, test } from "vitest";
import BlocTitulaireRMC from "../../../../../composants/pages/rmc/formulaire/BlocTitulaire";

test("DOIT réinitialiser les champs QUAND le bouton réinitialiser est cliqué", async () => {
  render(
    <Formik
      initialValues={{
        titulaire: { nom: "", prenom: "", paysNaissance: "", dateNaissance: { jour: "", mois: "", annee: "" } }
      }}
      onSubmit={() => {}}
    >
      <BlocTitulaireRMC />
    </Formik>
  );

  const boutonReinitialiser: HTMLButtonElement = screen.getByTitle("Réinitialiser les données du bloc");
  const champNom: HTMLInputElement = screen.getByLabelText("Nom");
  const champPrenom: HTMLInputElement = screen.getByLabelText("Prénom");
  const champPays: HTMLInputElement = screen.getByLabelText("Pays de naissance");
  const champAnneeNaissance: HTMLInputElement = screen.getByPlaceholderText("AAAA");
  const champMoisNaissance: HTMLInputElement = screen.getByPlaceholderText("MM");
  const champJourNaissance: HTMLInputElement = screen.getByPlaceholderText("JJ");

  await userEvent.type(champNom, "Son");
  await userEvent.type(champPrenom, "Goku");
  await userEvent.type(champPays, "France");
  await userEvent.type(champAnneeNaissance, "2002");
  await userEvent.type(champMoisNaissance, "12");
  await userEvent.type(champJourNaissance, "10");

  expect(champNom.value).toBe("Son");
  expect(champPrenom.value).toBe("Goku");
  expect(champPays.value).toBe("France");
  expect(champAnneeNaissance.value).toBe("2002");
  expect(champMoisNaissance.value).toBe("12");
  expect(champJourNaissance.value).toBe("10");

  await userEvent.click(boutonReinitialiser);

  expect(champNom.value).toBe("");
  expect(champPrenom.value).toBe("");
  expect(champPays.value).toBe("");
  expect(champAnneeNaissance.value).toBe("");
  expect(champMoisNaissance.value).toBe("");
  expect(champJourNaissance.value).toBe("");
});
