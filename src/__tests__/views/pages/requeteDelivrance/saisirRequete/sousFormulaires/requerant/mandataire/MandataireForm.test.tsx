import { MANDATAIRE } from "@composant/formulaire/ConstantesNomsForm";
import MandataireForm, {
  MandataireFormDefaultValues,
  MandataireFormValidationSchema
} from "@pages/requeteDelivrance/saisirRequete/sousFormulaires/requerant/mandataire/MandataireForm";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { SubFormProps } from "@widget/formulaire/utils/FormUtil";
import { Field, Form, Formik } from "formik";
import React, { useState } from "react";
import { expect, test } from "vitest";

const HookMandataireForm: React.FC = () => {
  const [result, setResult] = useState("");

  const mandataireFormProps = {
    nom: MANDATAIRE
  } as SubFormProps;

  const handleClickButton = (values: any) => {
    setResult(JSON.stringify(values));
  };

  return (
    <Formik
      initialValues={{
        [MANDATAIRE]: { ...MandataireFormDefaultValues }
      }}
      validationSchema={MandataireFormValidationSchema}
      onSubmit={handleClickButton}
    >
      <Form>
        <MandataireForm {...mandataireFormProps} />
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

test("render composant Mandataire Formulaire", async () => {
  render(<HookMandataireForm />);

  const inputType: HTMLSelectElement = screen.getByTestId("mandataire.type");
  const inputRaisonSociale: HTMLInputElement = screen.getByLabelText("mandataire.raisonSociale");
  const inputNom: HTMLInputElement = screen.getByLabelText("mandataire.nom");
  const inputPrenom: HTMLInputElement = screen.getByLabelText("mandataire.prenom");

  fireEvent.change(inputType, {
    target: {
      value: "AVOCAT"
    }
  });
  fireEvent.change(inputRaisonSociale, {
    target: {
      value: "mockRaisonSociale"
    }
  });
  fireEvent.change(inputNom, {
    target: {
      value: "mockNom"
    }
  });
  fireEvent.change(inputPrenom, {
    target: {
      value: "mockPrenom"
    }
  });

  const submit = screen.getByText(/Submit/i);

  fireEvent.blur(inputNom);
  fireEvent.blur(inputPrenom);
  fireEvent.click(submit);

  await waitFor(() => {
    const result = screen.getByTestId("result");
    expect(result.innerHTML).toBe(
      '{"mandataire":{"type":"AVOCAT","nature":"","raisonSociale":"mockRaisonSociale","nom":"mockNom","prenom":"MockPrenom"}}'
    );
  });
});

test("render composant Mandataire Formulaire : Affichage de l'input Nature", async () => {
  render(<HookMandataireForm />);

  const inputType: HTMLSelectElement = screen.getByTestId("mandataire.type");

  fireEvent.change(inputType, {
    target: {
      value: "AUTRE"
    }
  });

  const inputNature: HTMLInputElement = screen.getByLabelText("mandataire.nature");

  const submit = screen.getByText(/Submit/i);

  fireEvent.change(inputNature, {
    target: {
      value: "mockNature"
    }
  });
  fireEvent.click(submit);

  await waitFor(() => {
    expect(inputNature).toBeDefined();
    const result = screen.getByTestId("result");
    expect(result.innerHTML).toBe('{"mandataire":{"type":"AUTRE","nature":"mockNature","raisonSociale":"","nom":"","prenom":""}}');
  });
});
