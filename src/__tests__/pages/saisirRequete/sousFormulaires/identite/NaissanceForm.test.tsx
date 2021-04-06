import { Field, Form, Formik } from "formik";
import {
  render,
  waitFor,
  act,
  screen,
  fireEvent
} from "@testing-library/react";
import React, { useState } from "react";
import { SubFormProps } from "../../../../../views/common/widget/formulaire/utils/FormUtil";
import NaissanceForm, {
  NaissanceFormDefaultValues,
  NaissanceFormValidationSchema
} from "../../../../../views/pages/saisirRequete/sousFormulaires/identite/naissance/NaissanceForm";
import { NAISSANCE } from "../../../../../views/pages/saisirRequete/sousFormulaires/identite/IdentiteForm";

const HookNaissanceForm: React.FC = () => {
  const [result, setResult] = useState("");

  const naissanceFormProps = {
    nom: NAISSANCE
  } as SubFormProps;

  const handleClickButton = (values: any) => {
    setResult(JSON.stringify(values));
  };

  return (
    <Formik
      initialValues={{
        [NAISSANCE]: { ...NaissanceFormDefaultValues }
      }}
      validationSchema={NaissanceFormValidationSchema}
      onSubmit={handleClickButton}
    >
      <Form>
        <NaissanceForm {...naissanceFormProps} />
        <button type="submit">Submit</button>
        <Field as="textarea" value={result} data-testid="result" />
      </Form>
    </Formik>
  );
};

test("render composant Naissance Formulaire", async () => {
  await act(async () => {
    render(<HookNaissanceForm />);
  });

  const inputVille = screen.getByLabelText(
    "naissance.villeNaissance"
  ) as HTMLInputElement;
  const inputPays = screen.getByLabelText(
    "naissance.paysNaissance"
  ) as HTMLInputElement;

  act(() => {
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
  });

  const submit = screen.getByText(/Submit/i);
  await act(async () => {
    fireEvent.click(submit);
  });

  const result = screen.getByTestId("result");

  await waitFor(() => {
    expect(result.innerHTML).toBe(
      '{"naissance":{"dateNaissance":{"jour":"","mois":"","annee":""},"villeNaissance":"Mockville","paysNaissance":"Mockpays"}}'
    );
  });
});
