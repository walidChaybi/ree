import {
  act,
  fireEvent,
  render,
  screen,
  waitFor
} from "@testing-library/react";
import { Field, Form, Formik } from "formik";
import React, { useState } from "react";
import { SubFormProps } from "../../../../../views/common/widget/formulaire/utils/FormUtil";
import { PARTICULIER } from "../../../../../views/pages/saisirRequete/modelForm/ISaisirRequetePageModel";
import ParticulierForm, {
  ParticulierFormDefaultValues,
  ParticulierFormValidationSchema
} from "../../../../../views/pages/saisirRequete/sousFormulaires/requerant/particulier/ParticulierForm";

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
  const inputNomNaissance = screen.getByLabelText(
    "particulier.nomNaissance"
  ) as HTMLInputElement;
  const inputNomUsage = screen.getByLabelText(
    "particulier.nomUsage"
  ) as HTMLInputElement;
  const inputPrenom = screen.getByLabelText(
    "particulier.prenom"
  ) as HTMLInputElement;

  act(() => {
    fireEvent.change(inputNomNaissance, {
      target: {
        value: "mockNomNaissance"
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
    fireEvent.blur(inputNomNaissance);
    fireEvent.blur(inputNomUsage);
    fireEvent.blur(inputPrenom);
    fireEvent.click(submit);
  });

  const result = screen.getByTestId("result");

  await waitFor(() => {
    expect(result.innerHTML).toBe(
      '{"particulier":{"nomNaissance":"MOCKNOMNAISSANCE","nomUsage":"MOCKNOMUSAGE","prenom":"MockPrenom"}}'
    );
  });
});
