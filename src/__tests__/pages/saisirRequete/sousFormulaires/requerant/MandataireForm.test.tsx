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
import { MANDATAIRE } from "../../../../../views/pages/saisirRequete/sousFormulaires/requerant/RequerantForm";
import MandataireForm, {
  MandataireFormDefaultValues,
  MandataireFormValidationSchema
} from "../../../../../views/pages/saisirRequete/sousFormulaires/requerant/mandataire/MandataireForm";

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

test("render composant Mandataire Formulaire", async () => {
  await act(async () => {
    render(<HookMandataireForm />);
  });

  const inputType = screen.getByLabelText(
    "mandataire.type"
  ) as HTMLInputElement;
  const inputNature = screen.getByLabelText(
    "mandataire.nature"
  ) as HTMLInputElement;
  const inputRaisonSociale = screen.getByLabelText(
    "mandataire.raisonSociale"
  ) as HTMLInputElement;
  const inputNom = screen.getByLabelText("mandataire.nom") as HTMLInputElement;
  const inputPrenom = screen.getByLabelText(
    "mandataire.prenom"
  ) as HTMLInputElement;

  act(() => {
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
  });

  const submit = screen.getByText(/Submit/i);
  await act(async () => {
    fireEvent.blur(inputNom);
    fireEvent.blur(inputPrenom);
    fireEvent.click(submit);
  });

  const result = screen.getByTestId("result");

  await waitFor(() => {
    expect(inputNature.disabled).toBeTruthy();
    expect(result.innerHTML).toBe(
      '{"mandataire":{"type":"AVOCAT","nature":"","raisonSociale":"mockRaisonSociale","nom":"MOCKNOM","prenom":"Mockprenom"}}'
    );
  });
});
