import { Field, Form, Formik } from "formik";
import {
  render,
  waitFor,
  act,
  screen,
  fireEvent
} from "@testing-library/react";
import React, { useState } from "react";
import RequerantForm, {
  RequerantFormDefaultValues,
  RequerantFormValidationSchema
} from "../../../../../views/pages/saisirRequete/sousFormulaires/requerant/RequerantForm";
import { REQUERANT } from "../../../../../views/pages/saisirRequete/SaisirRDCSCPage";
import { SubFormProps } from "../../../../../views/common/widget/formulaire/utils/FormUtil";

const HookRequerantForm: React.FC = () => {
  const [result, setResult] = useState("");

  const requerantFormProps = {
    nom: REQUERANT
  } as SubFormProps;

  const handleClickButton = (values: any) => {
    setResult(JSON.stringify(values));
  };

  return (
    <Formik
      initialValues={{
        [REQUERANT]: { ...RequerantFormDefaultValues }
      }}
      validationSchema={RequerantFormValidationSchema}
      onSubmit={handleClickButton}
    >
      <Form>
        <RequerantForm {...requerantFormProps} />
        <button type="submit">Submit</button>
        <Field as="textarea" value={result} data-testid="result" />
      </Form>
    </Formik>
  );
};

test("Le champ Type Requerant", async () => {
  await act(async () => {
    render(<HookRequerantForm />);
  });

  const typeRequerantInteresse = screen.getByLabelText(
    "requerant.typerequerant.interesse"
  ) as HTMLInputElement;
  const typeRequerantMandataire = screen.getByLabelText(
    "requerant.typerequerant.mandataire"
  ) as HTMLInputElement;
  const typeRequerantInstitutionnel = screen.getByLabelText(
    "requerant.typerequerant.institutionnel"
  ) as HTMLInputElement;
  const typeRequerantParticulier = screen.getByLabelText(
    "requerant.typerequerant.particulier"
  ) as HTMLInputElement;

  expect(typeRequerantInteresse).toHaveProperty("checked", true);
  expect(typeRequerantMandataire).toHaveProperty("checked", false);
  expect(typeRequerantInstitutionnel).toHaveProperty("checked", false);
  expect(typeRequerantParticulier).toHaveProperty("checked", false);

  await act(async () => {
    fireEvent.click(typeRequerantMandataire);
  });

  await waitFor(() => {
    expect(typeRequerantInteresse).toHaveProperty("checked", false);
    expect(typeRequerantMandataire).toHaveProperty("checked", true);
    expect(typeRequerantInstitutionnel).toHaveProperty("checked", false);
    expect(typeRequerantParticulier).toHaveProperty("checked", false);
  });

  await act(async () => {
    fireEvent.click(typeRequerantInstitutionnel);
  });

  await waitFor(() => {
    expect(typeRequerantInteresse).toHaveProperty("checked", false);
    expect(typeRequerantMandataire).toHaveProperty("checked", false);
    expect(typeRequerantInstitutionnel).toHaveProperty("checked", true);
    expect(typeRequerantParticulier).toHaveProperty("checked", false);
  });

  await act(async () => {
    fireEvent.click(typeRequerantParticulier);
  });

  await waitFor(() => {
    expect(typeRequerantInteresse).toHaveProperty("checked", false);
    expect(typeRequerantMandataire).toHaveProperty("checked", false);
    expect(typeRequerantInstitutionnel).toHaveProperty("checked", false);
    expect(typeRequerantParticulier).toHaveProperty("checked", true);
  });
});

test("retour du formulaire Requerant", async () => {
  await act(async () => {
    render(<HookRequerantForm />);
  });

  const typeRequerantInteresse = screen.getByLabelText(
    "requerant.typerequerant.interesse"
  ) as HTMLInputElement;
  const typeRequerantParticulier = screen.getByLabelText(
    "requerant.typerequerant.particulier"
  ) as HTMLInputElement;

  act(() => {
    fireEvent.click(typeRequerantParticulier);
  });

  await waitFor(() => {
    expect(typeRequerantInteresse).toHaveProperty("checked", false);
    expect(typeRequerantParticulier).toHaveProperty("checked", true);
  });

  const typeRequerantParticulierPrenom = screen.getByLabelText(
    "requerant.particulier.prenom"
  ) as HTMLInputElement;

  await act(async () => {
    fireEvent.change(typeRequerantParticulierPrenom, {
      target: {
        value: "mockPrenom"
      }
    });
  });

  await waitFor(() => {
    fireEvent.blur(typeRequerantParticulierPrenom);
    expect(typeRequerantParticulierPrenom.value).toEqual("Mockprenom");
  });

  const submit = screen.getByText(/Submit/i);
  await act(async () => {
    fireEvent.click(submit);
  });

  const result = screen.getByTestId("result");

  await waitFor(() => {
    expect(result.innerHTML).toBe(
      '{"requerant":{"typeRequerant":"PARTICULIER","mandataire":{"type":"","nature":"","raisonSociale":"","nom":"","prenom":""},"institutionnel":{"type":"","nature":"","nomInstitution":"","nom":"","prenom":""},"particulier":{"nomFamille":"","nomUsage":"","prenom":"Mockprenom"}}}'
    );
  });
});
