import { REQUERANT } from "@composant/formulaire/ConstantesNomsForm";
import { TypeRequerant } from "@model/requete/enum/TypeRequerant";
import RequerantForm, {
  RequerantFormDefaultValues,
  RequerantFormValidationSchema
} from "@pages/requeteDelivrance/saisirRequete/sousFormulaires/requerant/RequerantForm";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { SubFormProps } from "@widget/formulaire/utils/FormUtil";
import { Field, Form, Formik } from "formik";
import React, { useState } from "react";
import { expect, test } from "vitest";

const HookRequerantForm: React.FC = () => {
  const [result, setResult] = useState("");

  const requerantFormProps = {
    nom: REQUERANT,
    options: TypeRequerant.getAllEnumsAsOptions()
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

test("Le champ Type Requerant", () => {
  render(<HookRequerantForm />);

  const typeRequerantInteresse = screen.getByLabelText(
    "requerant.typerequerant.titulaire1"
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

  waitFor(() => {
    expect(typeRequerantInteresse).toHaveProperty("checked", true);
    expect(typeRequerantMandataire).toHaveProperty("checked", false);
    expect(typeRequerantInstitutionnel).toHaveProperty("checked", false);
    expect(typeRequerantParticulier).toHaveProperty("checked", false);
  });

  fireEvent.click(typeRequerantMandataire);

  waitFor(() => {
    expect(typeRequerantInteresse).toHaveProperty("checked", false);
    expect(typeRequerantMandataire).toHaveProperty("checked", true);
    expect(typeRequerantInstitutionnel).toHaveProperty("checked", false);
    expect(typeRequerantParticulier).toHaveProperty("checked", false);
  });

  fireEvent.click(typeRequerantInstitutionnel);

  waitFor(() => {
    expect(typeRequerantInteresse).toHaveProperty("checked", false);
    expect(typeRequerantMandataire).toHaveProperty("checked", false);
    expect(typeRequerantInstitutionnel).toHaveProperty("checked", true);
    expect(typeRequerantParticulier).toHaveProperty("checked", false);
  });

  fireEvent.click(typeRequerantParticulier);

  waitFor(() => {
    expect(typeRequerantInteresse).toHaveProperty("checked", false);
    expect(typeRequerantMandataire).toHaveProperty("checked", false);
    expect(typeRequerantInstitutionnel).toHaveProperty("checked", false);
    expect(typeRequerantParticulier).toHaveProperty("checked", true);
  });
});

test("retour du formulaire Requerant", () => {
  render(<HookRequerantForm />);

  const typeRequerantInteresse = screen.getByLabelText(
    "requerant.typerequerant.titulaire1"
  ) as HTMLInputElement;
  const typeRequerantParticulier = screen.getByLabelText(
    "requerant.typerequerant.particulier"
  ) as HTMLInputElement;

  fireEvent.click(typeRequerantParticulier);

  waitFor(() => {
    expect(typeRequerantInteresse).toHaveProperty("checked", false);
    expect(typeRequerantParticulier).toHaveProperty("checked", true);
  });

  const typeRequerantParticulierPrenom = screen.getByLabelText(
    "requerant.particulier.prenom"
  ) as HTMLInputElement;

  fireEvent.change(typeRequerantParticulierPrenom, {
    target: {
      value: "mockPrenom"
    }
  });

  fireEvent.blur(typeRequerantParticulierPrenom);

  waitFor(() => {
    expect(typeRequerantParticulierPrenom.value).toEqual("MockPrenom");
  });

  const submit = screen.getByText(/Submit/i);

  fireEvent.click(submit);

  const result = screen.getByTestId("result");

  waitFor(() => {
    expect(result.innerHTML).toBe(
      '{"requerant":{"typeRequerant":"PARTICULIER","mandataire":{"type":"","nature":"","raisonSociale":"","nom":"","prenom":""},"institutionnel":{"type":"","nature":"","nomInstitution":"","nom":"","prenom":""},"particulier":{"nomNaissance":"","nomUsage":"","prenom":"MockPrenom"},"autreProfessionnel":{"nature":"","raisonSociale":"","nom":"","prenom":""}}}'
    );
  });
});
