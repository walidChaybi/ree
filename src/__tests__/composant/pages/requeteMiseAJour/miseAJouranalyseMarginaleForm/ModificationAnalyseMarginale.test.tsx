// ModificationAnalyseMarginale.test.tsx
import { fireEvent, render, screen } from "@testing-library/react";
import { Formik } from "formik";
import { expect, it, vi } from "vitest";
import ModificationAnalyseMarginale from "../../../../../composants/pages/requetesMiseAJour/miseAJourAnalyseMarginaleForm/ModificationAnalyseMarginale";

const titulaireNonSecable = {
  analyseMarginale: {
    nom: "Doe",
    prenoms: { prenom1: "John" },
    motif: ""
  },
  nomSecable: {
    nomPartie1: "",
    nomPartie2: "",
    secable: false
  }
};

const titulaireSecableNonDecoupe = {
  analyseMarginale: {
    nom: "Doe Nut",
    prenoms: { prenom1: "John" },
    motif: ""
  },
  nomSecable: {
    nomPartie1: "",
    nomPartie2: "",
    secable: false
  }
};

const titulaireSecableDecoupe = {
  analyseMarginale: {
    nom: "Doe Nut",
    prenoms: { prenom1: "John" },
    motif: ""
  },
  nomSecable: {
    nomPartie1: "Doe",
    nomPartie2: "Nut",
    secable: true
  }
};

it("render les input du formulaire correctement", () => {
  render(
    <Formik initialValues={titulaireNonSecable} onSubmit={vi.fn()}>
      <ModificationAnalyseMarginale />
    </Formik>
  );

  // Check that the input fields are rendered correctly
  expect(screen.getByText("Nom")).toBeDefined();
  expect(screen.getByText("Prénom")).toBeDefined();
  expect(screen.getByText("Motif")).toBeDefined();
});

it("ajoute et retire un prénom", () => {
  render(
    <Formik initialValues={titulaireNonSecable} onSubmit={vi.fn()}>
      <ModificationAnalyseMarginale />
    </Formik>
  );

  expect(screen.getByText("Prénom")).toBeDefined();

  const boutonAjouterPrenom = screen.getByText("Ajouter prénom");
  fireEvent.click(boutonAjouterPrenom);

  expect(screen.getByText("Prénom 1")).toBeDefined();
  expect(screen.getByText("Prénom 2")).toBeDefined();

  const boutonRetirerPrenom = screen.getByText("Annuler la saisie");
  fireEvent.click(boutonRetirerPrenom);

  expect(screen.getByText("Prénom")).toBeDefined();
});

it("toggle du checkbox nom sécable et update des noms découpés", () => {
  render(
    <Formik initialValues={titulaireSecableNonDecoupe} onSubmit={vi.fn()}>
      <ModificationAnalyseMarginale />
    </Formik>
  );

  const checkbox: HTMLInputElement = screen.getByLabelText("Nom sécable");
  expect(checkbox.checked).toBeFalsy();

  fireEvent.click(checkbox);
  expect(checkbox.checked).toBeTruthy();

  expect(screen.queryByText("1re partie")).toBeDefined();
  expect(screen.queryByText("2nde partie")).toBeDefined();

  fireEvent.click(checkbox);
  expect(checkbox.checked).toBeFalsy();

  expect(screen.queryByText("1re partie")).toBeNull();
  expect(screen.queryByText("2nde partie")).toBeNull();
});

it("toggle du checkbox déjà actif et les champs noms pré-remplis lorsque le titulaire possède déjà un nom découpé", () => {
  const { container } = render(
    <Formik initialValues={titulaireSecableDecoupe} onSubmit={vi.fn()}>
      <ModificationAnalyseMarginale />
    </Formik>
  );

  const checkbox: HTMLInputElement = screen.getByLabelText("Nom sécable");
  expect(checkbox.checked).toBeTruthy();
  const nom1 = container.querySelector('input[name="nomSecable.nomPartie1"]');
  const nom2 = container.querySelector('input[name="nomSecable.nomPartie2"]');

  expect(nom1?.getAttribute("value")).toContain("Doe");
  expect(nom2?.getAttribute("value")).toContain("Nut");
});

it("toggle du checkbox nom sécable et update l'input", () => {
  render(
    <Formik initialValues={titulaireNonSecable} onSubmit={vi.fn()}>
      <ModificationAnalyseMarginale />
    </Formik>
  );

  const checkbox: HTMLInputElement = screen.getByLabelText("Nom sécable");
  expect(checkbox.disabled).toBeTruthy();
});
