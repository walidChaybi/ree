import { Field, Form, Formik } from "formik";
import {
  render,
  waitFor,
  act,
  screen,
  fireEvent
} from "@testing-library/react";
import React, { useState } from "react";
import ParticulierForm, {
  ParticulierFormDefaultValues,
  ParticulierFormValidationSchema
} from "../../../../../views/pages/saisirRequete/sousFormulaires/requerant/particulier/ParticulierForm";
import { SubFormProps } from "../../../../../views/common/widget/formulaire/utils/FormUtil";
import { PARTICULIER } from "../../../../../views/pages/saisirRequete/sousFormulaires/requerant/RequerantForm";

const HookParticulierForm: React.FC = () => {
  const [result, setResult] = useState("");

  const particulierFormProps = {
    nom: PARTICULIER
  } as SubFormProps;

  const handleClickButton = (values: any) => {
    setResult(JSON.stringify(values));
  };

  return (
    <Formik
      initialValues={{
        [PARTICULIER]: { ...ParticulierFormDefaultValues }
      }}
      validationSchema={ParticulierFormValidationSchema}
      onSubmit={handleClickButton}
    >
      <Form>
        <ParticulierForm {...particulierFormProps} />
        <button type="submit">Submit</button>
        <Field as="textarea" value={result} data-testid="result" />
      </Form>
    </Formik>
  );
};

test("render composant Particulier Formulaire", async () => {
  await act(async () => {
    render(<HookParticulierForm />);
  });
  const inputNomFamille = screen.getByLabelText(
    "particulier.nomFamille"
  ) as HTMLInputElement;
  const inputNomUsage = screen.getByLabelText(
    "particulier.nomUsage"
  ) as HTMLInputElement;
  const inputPrenom = screen.getByLabelText(
    "particulier.prenom"
  ) as HTMLInputElement;

  act(() => {
    fireEvent.change(inputNomFamille, {
      target: {
        value: "mockNomFamille"
      }
    });
    fireEvent.change(inputNomUsage, {
      target: {
        value: "mockNomUsage"
      }
    });
    fireEvent.change(inputPrenom, {
      target: {
        value: "mockPrenom"
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
      '{"particulier":{"nomFamille":"MOCKNOMFAMILLE","nomUsage":"MOCKNOMUSAGE","prenom":"Mockprenom"}}'
    );
  });
});
