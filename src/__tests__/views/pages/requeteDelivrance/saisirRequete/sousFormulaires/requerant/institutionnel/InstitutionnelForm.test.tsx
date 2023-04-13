import { INSTITUTI0NNEL } from "@composant/formulaire/ConstantesNomsForm";
import InstitutionnelForm, {
    InstitutionnelFormDefaultValues,
    InstitutionnelFormValidationSchema
} from "@pages/requeteDelivrance/saisirRequete/sousFormulaires/requerant/institutionnel/InstitutionnelForm";
import {
    act,
    fireEvent,
    render,
    screen,
    waitFor
} from "@testing-library/react";
import { SubFormProps } from "@widget/formulaire/utils/FormUtil";
import { Field, Form, Formik } from "formik";
import React, { useState } from "react";

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

  const inputType = screen.getByTestId(
    "institutionnel.type"
  ) as HTMLSelectElement;
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
        value: "TRIBUNAL"
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
    expect(result.innerHTML).toBe(
      '{"institutionnel":{"type":"TRIBUNAL","nature":"","nomInstitution":"mockNomInstitution","nom":"mockNom","prenom":"MockPrenom"}}'
    );
  });
});

test("render input Nature Institutionnel Formulaire", async () => {
  await act(async () => {
    render(<HookInstitutionnelForm />);
  });

  const inputType = screen.getByTestId(
    "institutionnel.type"
  ) as HTMLSelectElement;

  act(() => {
    fireEvent.change(inputType, {
      target: {
        value: "AUTRE"
      }
    });
  });

  const inputNature = screen.getByLabelText(
    "institutionnel.nature"
  ) as HTMLInputElement;

  const submit = screen.getByText(/Submit/i);

  await act(async () => {
    fireEvent.change(inputNature, {
      target: {
        value: "mockNature"
      }
    });
    fireEvent.click(submit);
  });

  const result = screen.getByTestId("result");

  await waitFor(() => {
    expect(inputNature).toBeDefined();
    expect(result.innerHTML).toBe(
      '{"institutionnel":{"type":"AUTRE","nature":"mockNature","nomInstitution":"","nom":"","prenom":""}}'
    );
  });
});
