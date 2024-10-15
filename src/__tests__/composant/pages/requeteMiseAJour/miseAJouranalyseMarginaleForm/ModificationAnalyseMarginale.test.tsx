import { render, screen } from "@testing-library/react";
import { Formik } from "formik";
import { expect, test, vi } from "vitest";
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

test("render les input du formulaire correctement", () => {
  render(
    <Formik initialValues={titulaireNonSecable} onSubmit={vi.fn()}>
      <ModificationAnalyseMarginale onValiderEtTerminer={() => {}} />
    </Formik>
  );

  expect(screen.getByText("Nom")).toBeDefined();
  expect(screen.getByText("Prénom")).toBeDefined();
  expect(screen.getByText("Motif")).toBeDefined();
});
