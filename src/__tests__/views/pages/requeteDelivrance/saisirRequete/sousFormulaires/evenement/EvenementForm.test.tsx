import EvenementForm, {
  EvenementFormDefaultValues,
  EvenementFormValidationSchema,
  EvenementSubFormProps
} from "@pages/requeteDelivrance/saisirRequete/sousFormulaires/evenement/EvenementForm";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { Field, Form, Formik } from "formik";
import React, { useState } from "react";
import { expect, test } from "vitest";

const EVENEMENT = "evenement";

const HookEvenementForm: React.FC = () => {
  const [result, setResult] = useState("");

  const evenementFormProps = {
    nom: EVENEMENT,
    libelle: "libelle"
  } as EvenementSubFormProps;

  const handleClickButton = (values: any) => {
    setResult(JSON.stringify(values));
  };

  return (
    <Formik
      initialValues={{
        [EVENEMENT]: { ...EvenementFormDefaultValues }
      }}
      validationSchema={EvenementFormValidationSchema}
      onSubmit={handleClickButton}
    >
      <Form>
        <EvenementForm {...evenementFormProps} />
        <button type="submit">Submit</button>
        <Field as="textarea" value={result} data-testid="result" />
      </Form>
    </Formik>
  );
};

test("render composant Evenement Formulaire", () => {
  render(<HookEvenementForm />);

  const inputVille = screen.getByLabelText(
    "evenement.villeEvenement"
  ) as HTMLInputElement;
  const inputPays = screen.getByLabelText(
    "evenement.paysEvenement"
  ) as HTMLInputElement;

  fireEvent.change(inputVille, {
    target: {
      value: "mockVille"
    }
  });
  fireEvent.change(inputPays, {
    target: {
      value: "mockPays"
    }
  });

  const submit = screen.getByText(/Submit/i);

  fireEvent.blur(inputVille);
  fireEvent.blur(inputPays);
  fireEvent.click(submit);

  const result = screen.getByTestId("result");
  const libelleDateLieu = screen.getByText(/Date et lieu de libelle/i);
  const libellePays = screen.getByText(/Pays de libelle/i);

  waitFor(() => {
    expect(libelleDateLieu).toBeDefined();
    expect(libellePays).toBeDefined();
    expect(result.innerHTML).toBe(
      '{"evenement":{"dateEvenement":{"jour":"","mois":"","annee":""},"villeEvenement":"MockVille","paysEvenement":"MockPays"}}'
    );
  });
});
