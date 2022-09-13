import { PRENOMS } from "@pages/requeteDelivrance/saisirRequete/modelForm/ISaisirRequetePageModel";
import PrenomsForm, {
  PrenomsFormDefaultValues,
  PrenomsFormValidationSchema
} from "@pages/requeteDelivrance/saisirRequete/sousFormulaires/identite/nomsPrenoms/PrenomsForm";
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor
} from "@testing-library/react";
import { SubFormProps } from "@widget/formulaire/utils/FormUtil";
import { Field, Form, Formik } from "formik";
import React, { useState } from "react";

const HookPrenomsForm: React.FC = () => {
  const [result, setResult] = useState("");

  const prenomsFormProps = {
    nom: PRENOMS
  } as SubFormProps;

  const handleClickButton = (values: any) => {
    setResult(JSON.stringify(values));
  };

  return (
    <Formik
      initialValues={{
        [PRENOMS]: { ...PrenomsFormDefaultValues }
      }}
      validationSchema={PrenomsFormValidationSchema}
      onSubmit={handleClickButton}
    >
      <Form>
        <PrenomsForm {...prenomsFormProps} />
        <button type="submit">Submit</button>
        <Field as="textarea" value={result} data-testid="result" />
      </Form>
    </Formik>
  );
};

test("render composant Prenoms Formulaire", async () => {
  await act(async () => {
    render(<HookPrenomsForm />);
  });

  const inputPrenom1 = screen.getByLabelText(
    "prenoms.prenom1"
  ) as HTMLInputElement;

  act(() => {
    fireEvent.change(inputPrenom1, {
      target: {
        value: "mockPrenom1"
      }
    });
  });

  const submit = screen.getByText(/Submit/i);
  await act(async () => {
    fireEvent.blur(inputPrenom1);
    fireEvent.click(submit);
  });

  const result = screen.getByTestId("result");

  await waitFor(() => {
    expect(result.innerHTML).toBe(
      '{"prenoms":{"prenom1":"MockPrenom1","prenom2":"","prenom3":""}}'
    );
  });
});

test("render composant Prenoms Formulaire Ajouter et Supprimer prénom", async () => {
  await act(async () => {
    render(<HookPrenomsForm />);
  });

  const inputPrenom1 = screen.getByLabelText(
    "prenoms.prenom1"
  ) as HTMLInputElement;

  act(() => {
    fireEvent.change(inputPrenom1, {
      target: {
        value: "mockPrenom1"
      }
    });
  });

  const ajoutPrenom = screen.getByText(/Ajouter un prénom/i);
  await act(async () => {
    fireEvent.blur(inputPrenom1);
    fireEvent.click(ajoutPrenom);
  });

  const inputPrenom2 = screen.getByLabelText(
    "prenoms.prenom2"
  ) as HTMLInputElement;

  await act(async () => {
    fireEvent.change(inputPrenom2, {
      target: {
        value: "mockprenom2"
      }
    });
  });

  const ajoutPrenom2 = screen.getByText(/Ajouter un prénom/i);
  await act(async () => {
    fireEvent.blur(inputPrenom2);
    fireEvent.click(ajoutPrenom2);
  });

  const inputPrenom3 = screen.getByLabelText(
    "prenoms.prenom3"
  ) as HTMLInputElement;

  await act(async () => {
    fireEvent.change(inputPrenom3, {
      target: {
        value: "mockprenom3"
      }
    });
  });

  const submit = screen.getByText(/Submit/i);
  await act(async () => {
    fireEvent.blur(inputPrenom3);
    fireEvent.click(submit);
  });

  const result = screen.getByTestId("result");

  await waitFor(() => {
    expect(result.innerHTML).toBe(
      '{"prenoms":{"prenom1":"MockPrenom1","prenom2":"Mockprenom2","prenom3":"Mockprenom3"}}'
    );
  });

  const supprPrenom = screen.getByText(/Supprimer un prénom/i);
  await act(async () => {
    fireEvent.click(supprPrenom);
  });

  await act(async () => {
    fireEvent.click(submit);
  });

  await waitFor(() => {
    expect(result.innerHTML).toBe(
      '{"prenoms":{"prenom1":"MockPrenom1","prenom2":"Mockprenom2","prenom3":""}}'
    );
  });
});
