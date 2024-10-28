import { PRENOMS } from "@composant/formulaire/ConstantesNomsForm";
import PrenomsForm, { creerValidationSchemaPrenom, genererDefaultValuesPrenoms } from "@composant/formulaire/nomsPrenoms/PrenomsForm";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { SubFormProps } from "@widget/formulaire/utils/FormUtil";
import { Field, Form, Formik } from "formik";
import React, { useState } from "react";
import { expect, test } from "vitest";

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
        [PRENOMS]: { ...genererDefaultValuesPrenoms() }
      }}
      validationSchema={creerValidationSchemaPrenom()}
      onSubmit={handleClickButton}
    >
      <Form>
        <PrenomsForm {...prenomsFormProps} />
        <button type="submit">Submit</button>
        <Field
          as="textarea"
          value={result}
          data-testid="result"
        />
      </Form>
    </Formik>
  );
};

test("render composant Prenoms Formulaire", async () => {
  render(<HookPrenomsForm />);

  const inputPrenom1: HTMLInputElement = screen.getByLabelText("prenoms.prenom1");

  waitFor(() => {
    expect(inputPrenom1).toBeDefined();
  });

  fireEvent.change(inputPrenom1, {
    target: {
      value: "mockPrenom1"
    }
  });

  const submit = screen.getByText(/Submit/i);

  fireEvent.blur(inputPrenom1);
  fireEvent.click(submit);

  const result = screen.getByTestId("result");

  await waitFor(() => {
    expect(result.innerHTML).toBe(
      '{"prenoms":{"prenom1":"mockPrenom1","prenom2":"","prenom3":"","prenom4":"","prenom5":"","prenom6":"","prenom7":"","prenom8":"","prenom9":"","prenom10":"","prenom11":"","prenom12":"","prenom13":"","prenom14":"","prenom15":""}}'
    );
  });
});

test("render composant Prenoms Formulaire Ajouter et Supprimer prénom", async () => {
  render(<HookPrenomsForm />);

  const inputPrenom1: HTMLInputElement = screen.getByLabelText("prenoms.prenom1");

  waitFor(() => {
    expect(inputPrenom1).toBeDefined();
  });

  fireEvent.change(inputPrenom1, {
    target: {
      value: "mockPrenom1"
    }
  });

  const ajoutPrenom = screen.getByText(/Ajouter prénom/i);
  fireEvent.blur(inputPrenom1);
  fireEvent.click(ajoutPrenom);

  const inputPrenom2: HTMLInputElement = screen.getByLabelText("prenoms.prenom2");

  fireEvent.change(inputPrenom2, {
    target: {
      value: "mockprenom2"
    }
  });

  const ajoutPrenom2 = screen.getByText(/Ajouter prénom/i);

  fireEvent.blur(inputPrenom2);
  fireEvent.click(ajoutPrenom2);

  const inputPrenom3: HTMLInputElement = screen.getByLabelText("prenoms.prenom3");

  expect(inputPrenom3).toBeDefined();

  fireEvent.change(inputPrenom3, {
    target: {
      value: "mockprenom3"
    }
  });

  const submit = screen.getByText(/Submit/i);

  fireEvent.blur(inputPrenom3);
  fireEvent.click(submit);

  const result = screen.getByTestId("result");

  await waitFor(() => {
    expect(result.innerHTML).toBe(
      '{"prenoms":{"prenom1":"mockPrenom1","prenom2":"mockprenom2","prenom3":"mockprenom3","prenom4":"","prenom5":"","prenom6":"","prenom7":"","prenom8":"","prenom9":"","prenom10":"","prenom11":"","prenom12":"","prenom13":"","prenom14":"","prenom15":""}}'
    );
  });

  const supprPrenom = screen.getByText(/annuler saisie/i);

  fireEvent.click(supprPrenom);

  fireEvent.click(submit);

  await waitFor(() => {
    expect(result.innerHTML).toBe(
      '{"prenoms":{"prenom1":"mockPrenom1","prenom2":"mockprenom2","prenom3":"","prenom4":"","prenom5":"","prenom6":"","prenom7":"","prenom8":"","prenom9":"","prenom10":"","prenom11":"","prenom12":"","prenom13":"","prenom14":"","prenom15":""}}'
    );
  });
});

test("DOIT afficher Prénom QAND il n'y a qu'un seul prénom et Prénom 1 QUAND il y en a plusieurs", () => {
  render(<HookPrenomsForm />);

  expect(screen.getByText("Prénom")).toBeDefined();
  expect(screen.queryByText("Prénom 1")).toBeNull();

  fireEvent.click(screen.getByText(/Ajouter prénom/i));

  expect(screen.queryByText("Prénom")).toBeNull();
  expect(screen.getByText("Prénom 1")).toBeDefined();
});
