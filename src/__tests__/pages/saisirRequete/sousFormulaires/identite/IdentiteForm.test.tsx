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
import IdentiteForm, {
  IdentiteFormDefaultValues,
  IdentiteFormValidationSchema
} from "../../../../../views/pages/saisirRequete/sousFormulaires/identite/IdentiteForm";
import { INTERESSE } from "../../../../../views/pages/saisirRequete/SaisirRDCSCPage";

const HookIdentiteForm: React.FC = () => {
  const [result, setResult] = useState("");

  const identiteFormProps = {
    nom: INTERESSE
  } as SubFormProps;

  const handleClickButton = (values: any) => {
    setResult(JSON.stringify(values));
  };

  return (
    <Formik
      initialValues={{
        [INTERESSE]: { ...IdentiteFormDefaultValues }
      }}
      validationSchema={IdentiteFormValidationSchema}
      onSubmit={handleClickButton}
    >
      <Form>
        <IdentiteForm {...identiteFormProps} />
        <button type="submit">Submit</button>
        <Field as="textarea" value={result} data-testid="result" />
      </Form>
    </Formik>
  );
};

test("render composant Identite Formulaire", async () => {
  await act(async () => {
    render(<HookIdentiteForm />);
  });

  const inputNomFamille = screen.getByLabelText(
    "interesse.nomFamille"
  ) as HTMLInputElement;
  const inputNomUsage = screen.getByLabelText(
    "interesse.nomUsage"
  ) as HTMLInputElement;
  const radioMasculin = screen.getByLabelText(
    "interesse.sexe.masculin"
  ) as HTMLInputElement;
  const radioFrancaise = screen.getByLabelText(
    "interesse.nationalite.francaise"
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
    fireEvent.click(radioMasculin);
    fireEvent.click(radioFrancaise);
  });

  const submit = screen.getByText(/Submit/i);
  await act(async () => {
    fireEvent.click(submit);
  });

  const result = screen.getByTestId("result");

  await waitFor(() => {
    expect(result.innerHTML).toBe(
      '{"interesse":{"nomFamille":"MOCKNOMFAMILLE","nomUsage":"MOCKNOMUSAGE","prenoms":{"prenom1":"","prenom2":"","prenom3":""},"sexe":"MASCULIN","naissance":{"dateNaissance":{"jour":"","mois":"","annee":""},"villeNaissance":"","paysNaissance":""},"nationalite":"FRANCAISE"}}'
    );
  });
});
