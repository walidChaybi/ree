// ModificationAnalyseMarginale.test.tsx
import { render, screen } from "@testing-library/react";
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
