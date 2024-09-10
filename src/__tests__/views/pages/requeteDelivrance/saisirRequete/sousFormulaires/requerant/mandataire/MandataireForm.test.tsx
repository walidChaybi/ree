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
        <Field as="textarea" value={result} data-testid="result" />
      </Form>
    </Formik>
  );
};

test("render composant Mandataire Formulaire", () => {
  render(<HookMandataireForm />);

  const inputType = screen.getByTestId("mandataire.type") as HTMLSelectElement;
  const inputRaisonSociale = screen.getByLabelText(
    "mandataire.raisonSociale"
  ) as HTMLInputElement;
  const inputNom = screen.getByLabelText("mandataire.nom") as HTMLInputElement;
  const inputPrenom = screen.getByLabelText(
    "mandataire.prenom"
  ) as HTMLInputElement;

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

    const result = screen.getByTestId("result");

    waitFor(() => {
      expect(result.innerHTML).toBe(
        '{"mandataire":{"type":"AVOCAT","nature":"","raisonSociale":"mockRaisonSociale","nom":"mockNom","prenom":"MockPrenom"}}'
      );
    });
});

test("render composant Mandataire Formulaire : Affichage de l'input Nature", () => {
  render(<HookMandataireForm />);

  const inputType = screen.getByTestId("mandataire.type") as HTMLSelectElement;

  fireEvent.change(inputType, {
    target: {
      value: "AUTRE"
    }
  });

  const inputNature = screen.getByLabelText(
    "mandataire.nature"
  ) as HTMLInputElement;

  const submit = screen.getByText(/Submit/i);

  fireEvent.change(inputNature, {
    target: {
      value: "mockNature"
    }
  });
  fireEvent.click(submit);

    const result = screen.getByTestId("result");

    waitFor(() => {
      expect(inputNature).toBeDefined();
      expect(result.innerHTML).toBe(
        '{"mandataire":{"type":"AUTRE","nature":"mockNature","raisonSociale":"","nom":"","prenom":""}}'
      );
    });
});
