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
import { INSTITUTI0NNEL } from "../../../../../views/pages/saisirRequete/sousFormulaires/requerant/RequerantForm";
import InstitutionnelForm, {
  InstitutionnelFormDefaultValues,
  InstitutionnelFormValidationSchema
} from "../../../../../views/pages/saisirRequete/sousFormulaires/requerant/institutionnel/InstitutionnelForm";

const HookInstitutionnelForm: React.FC = () => {
  const [result, setResult] = useState("");

  const institutionnelFormProps = {
    nom: INSTITUTI0NNEL
  } as SubFormProps;

  const handleClickButton = (values: any) => {
    setResult(JSON.stringify(values));
  };

  return (
    <Formik
      initialValues={{
        [INSTITUTI0NNEL]: { ...InstitutionnelFormDefaultValues }
      }}
      validationSchema={InstitutionnelFormValidationSchema}
      onSubmit={handleClickButton}
    >
      <Form>
        <InstitutionnelForm {...institutionnelFormProps} />
        <button type="submit">Submit</button>
        <Field as="textarea" value={result} data-testid="result" />
      </Form>
    </Formik>
  );
};

test("render composant Institutionnel Formulaire", async () => {
  await act(async () => {
    render(<HookInstitutionnelForm />);
  });

  const inputType = screen.getByLabelText(
    "institutionnel.type"
  ) as HTMLInputElement;
  const inputNature = screen.getByLabelText(
    "institutionnel.nature"
  ) as HTMLInputElement;
  const inputNomInstitution = screen.getByLabelText(
    "institutionnel.nomInstitution"
  ) as HTMLInputElement;
  const inputNom = screen.getByLabelText(
    "institutionnel.nom"
  ) as HTMLInputElement;
  const inputPrenom = screen.getByLabelText(
    "institutionnel.prenom"
  ) as HTMLInputElement;

  act(() => {
    fireEvent.change(inputType, {
      target: {
        value: "AUTRE"
      }
    });
    fireEvent.change(inputNature, {
      target: {
        value: "mockNature"
      }
    });
    fireEvent.change(inputNomInstitution, {
      target: {
        value: "mockNomInstitution"
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
    expect(inputNature.disabled).toBeFalsy();
    expect(result.innerHTML).toBe(
      '{"institutionnel":{"type":"AUTRE","nature":"mockNature","nomInstitution":"mockNomInstitution","nom":"MOCKNOM","prenom":"Mockprenom"}}'
    );
  });
});
