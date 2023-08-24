import { TITULAIRES } from "@composant/formulaire/ConstantesNomsForm";
import IdentiteForm, {
  IdentiteFormDefaultValues,
  IdentiteFormValidationSchema,
  IdentiteSubFormProps
} from "@pages/requeteDelivrance/saisirRequete/sousFormulaires/identite/IdentiteForm";
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor
} from "@testing-library/react";
import { Field, Form, Formik } from "formik";
import React, { useState } from "react";

const HookIdentiteForm: React.FC = () => {
  const [result, setResult] = useState("");

  const identiteFormProps = {
    nom: TITULAIRES + ".titulaire1",
    filiation: true
  } as IdentiteSubFormProps;

  const handleClickButton = (values: any) => {
    setResult(JSON.stringify(values));
  };

  return (
    <Formik
      initialValues={{
        [TITULAIRES]: { titulaire1: { ...IdentiteFormDefaultValues } }
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

  const inputNomNaissance = screen.getByLabelText(
    "titulaires.titulaire1.noms.nomNaissance"
  ) as HTMLInputElement;
  const radioMasculin = screen.getByLabelText(
    "titulaires.titulaire1.sexe.masculin"
  ) as HTMLInputElement;
  const radioFrancaise = screen.getByLabelText(
    "titulaires.titulaire1.nationalite.francaise"
  ) as HTMLInputElement;

  act(() => {
    fireEvent.change(inputNomNaissance, {
      target: {
        value: "mockNomNaissance"
      }
    });

    fireEvent.click(radioMasculin);
    fireEvent.click(radioFrancaise);
  });

  const ajouterNomUsage = screen.getByText(/ajouter un nom d'usage/i);
  await act(async () => {
    fireEvent.click(ajouterNomUsage);
  });

  const inputNomUsage = screen.getByLabelText(
    "titulaires.titulaire1.noms.nomUsage"
  ) as HTMLInputElement;

  await act(async () => {
    fireEvent.change(inputNomUsage, {
      target: {
        value: "mockNomUsage"
      }
    });
  });

  const submit = screen.getByText(/Submit/i);
  await act(async () => {
    fireEvent.blur(inputNomNaissance);
    fireEvent.blur(inputNomUsage);
    fireEvent.click(submit);
  });

  const result = screen.getByTestId("result");
  const ajouterFiliation = screen.getByText(/ajouter une filiation/i);

  await waitFor(() => {
    expect(ajouterFiliation).toBeDefined();
    expect(result.innerHTML).toBe(
      '{"titulaires":{"titulaire1":{"noms":{"nomNaissance":"mockNomNaissance","nomUsage":"mockNomUsage"},"prenoms":{"prenom1":"","prenom2":"","prenom3":"","prenom4":"","prenom5":"","prenom6":"","prenom7":"","prenom8":"","prenom9":"","prenom10":"","prenom11":"","prenom12":"","prenom13":"","prenom14":"","prenom15":""},"sexe":"MASCULIN","naissance":{"dateEvenement":{"jour":"","mois":"","annee":""},"villeEvenement":"","paysEvenement":""},"nationalite":"FRANCAISE","parent1":{"nomNaissance":"","prenoms":{"prenom1":"","prenom2":"","prenom3":"","prenom4":"","prenom5":"","prenom6":"","prenom7":"","prenom8":"","prenom9":"","prenom10":"","prenom11":"","prenom12":"","prenom13":"","prenom14":"","prenom15":""}},"parent2":{"nomNaissance":"","prenoms":{"prenom1":"","prenom2":"","prenom3":"","prenom4":"","prenom5":"","prenom6":"","prenom7":"","prenom8":"","prenom9":"","prenom10":"","prenom11":"","prenom12":"","prenom13":"","prenom14":"","prenom15":""}}}}}'
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
