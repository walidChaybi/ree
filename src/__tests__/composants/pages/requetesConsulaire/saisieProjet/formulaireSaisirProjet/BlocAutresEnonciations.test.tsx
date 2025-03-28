import { fireEvent, render, screen } from "@testing-library/react";
import { Formik } from "formik";
import { describe, expect, test } from "vitest";
import BlocAutresEnonciations from "../../../../../../composants/pages/requetesConsulaire/saisieProjet/formulaireSaisieProjet/BlocAutresEnonciations";

const renderComponent = (initialValues: { autresEnonciations: { enonciations: string } }) => {
  return render(
    <Formik
      initialValues={initialValues}
      onSubmit={() => {}}
    >
      <BlocAutresEnonciations />
    </Formik>
  );
};

describe("BlocAutresEnonciations", () => {
  const initialValues = {
    autresEnonciations: {
      enonciations: ""
    }
  };

  test("doit afficher le champ de texte des énonciations", () => {
    renderComponent(initialValues);
    expect(screen.getByLabelText(/Texte énonciations/)).toBeDefined();
  });

  test("doit permettre la saisie de texte", () => {
    const { getByLabelText } = renderComponent(initialValues);
    const textArea = getByLabelText(/Texte énonciations/) as HTMLTextAreaElement;

    fireEvent.change(textArea, { target: { value: "Test d'énonciation" } });

    expect(textArea.value).toBe("Test d'énonciation");
  });

  test("ne doit pas permettre de dépasser 2000 caractères", () => {
    renderComponent(initialValues);
    const textArea = screen.getByLabelText(/Texte énonciations/) as HTMLTextAreaElement;

    const longTexte = "a".repeat(2005);

    fireEvent.change(textArea, { target: { value: longTexte } });

    expect(textArea.value.length).toBe(2000);
  });
});
