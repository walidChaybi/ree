import { PARENT1 } from "@composant/formulaire/ConstantesNomsForm";
import ParentForm, {
  ParentFormDefaultValues,
  ParentFormValidationSchema,
  ParentSubFormProps
} from "@composant/formulaire/ParentForm";
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor
} from "@testing-library/react";
import { Field, Form, Formik } from "formik";
import React, { useState } from "react";

const HookParentForm: React.FC = () => {
  const [result, setResult] = useState("");

  const parentFormProps = {
    nom: PARENT1,
    index: 1
  } as ParentSubFormProps;

  const handleClickButton = (values: any) => {
    setResult(JSON.stringify(values));
  };

  return (
    <Formik
      initialValues={{
        [PARENT1]: { ...ParentFormDefaultValues }
      }}
      validationSchema={ParentFormValidationSchema}
      onSubmit={handleClickButton}
    >
      <Form>
        <ParentForm {...parentFormProps} />
        <button type="submit">Submit</button>
        <Field as="textarea" value={result} data-testid="result" />
      </Form>
    </Formik>
  );
};

test("render composant Parent Formulaire", async () => {
  await act(async () => {
    render(<HookParentForm />);
  });

  const inputNom = screen.getByLabelText(
    "parent1.nomNaissance"
  ) as HTMLInputElement;

  act(() => {
    fireEvent.change(inputNom, {
      target: {
        value: "mocknom"
      }
    });
  });

  const submit = screen.getByText(/Submit/i);

  await act(async () => {
    fireEvent.blur(inputNom);
    fireEvent.click(submit);
  });

  const titreParent1 = screen.getByText(/Parent 1/i);

  const result = screen.getByTestId("result");

  await waitFor(() => {
    expect(titreParent1).toBeDefined();
    expect(result.innerHTML).toBe(
      '{"parent1":{"nomNaissance":"MOCKNOM","prenoms":{"prenom1":"","prenom2":"","prenom3":"","prenom4":"","prenom5":"","prenom6":"","prenom7":"","prenom8":"","prenom9":"","prenom10":"","prenom11":"","prenom12":""}}}'
    );
  });
});
