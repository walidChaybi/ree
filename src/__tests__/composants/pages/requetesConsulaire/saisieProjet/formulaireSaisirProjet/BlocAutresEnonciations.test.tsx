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
});
