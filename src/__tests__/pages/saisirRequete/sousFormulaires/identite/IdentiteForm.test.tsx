import {
  act,
  fireEvent,
  render,
  screen,
  waitFor
} from "@testing-library/react";
import { Field, Form, Formik } from "formik";
import React, { useState } from "react";
import { INTERESSE } from "../../../../../views/pages/saisirRequete/modelForm/ISaisirRDCSCPageModel";
import IdentiteForm, {
  IdentiteFormDefaultValues,
  IdentiteFormValidationSchema,
  IdentiteSubFormProps
} from "../../../../../views/pages/saisirRequete/sousFormulaires/identite/IdentiteForm";

const HookIdentiteForm: React.FC = () => {
  const [result, setResult] = useState("");

  const identiteFormProps = {
    nom: INTERESSE,
    filiation: true
  } as IdentiteSubFormProps;

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
    fireEvent.blur(inputNomFamille);
    fireEvent.blur(inputNomUsage);
    fireEvent.click(submit);
  });

  const result = screen.getByTestId("result");
  const ajouterFiliation = screen.getByText(/ajouter une filiation/i);

  await waitFor(() => {
    expect(ajouterFiliation).toBeDefined();
    expect(result.innerHTML).toBe(
      '{"interesse":{"nomFamille":"MOCKNOMFAMILLE","nomUsage":"MOCKNOMUSAGE","prenoms":{"prenom1":"","prenom2":"","prenom3":""},"sexe":"MASCULIN","naissance":{"dateEvenement":{"jour":"","mois":"","annee":""},"villeEvenement":"","paysEvenement":""},"nationalite":"FRANCAISE","parent1":"","parent2":""}}'
    );
  });

  await act(async () => {
    fireEvent.click(ajouterFiliation);
  });

  await waitFor(() => {
    const parent1 = screen.getByText(/Parent 1/i);
    const parent2 = screen.getByText(/Parent 2/i);

    expect(parent1).toBeDefined();
    expect(parent2).toBeDefined();
  });
});
