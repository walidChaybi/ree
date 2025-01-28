import { PARTICULIER } from "@composant/formulaire/ConstantesNomsForm";
import ParticulierForm, {
  ParticulierFormDefaultValues,
  ParticulierFormValidationSchema
} from "@pages/requeteDelivrance/saisirRequete/sousFormulaires/requerant/particulier/ParticulierForm";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { SubFormProps } from "@widget/formulaire/utils/FormUtil";
import { Field, Form, Formik } from "formik";
import React, { useState } from "react";
import { describe, expect, test } from "vitest";

describe("Test ParticulierForm", () => {
  const HookParticulierForm: React.FC = () => {
    const [result, setResult] = useState("");

    const particulierFormProps = {
      nom: PARTICULIER
    } as SubFormProps;

    const handleClickButton = (values: any) => {
      setResult(JSON.stringify(values));
    };

    return (
      <Formik
        initialValues={{
          [PARTICULIER]: { ...ParticulierFormDefaultValues }
        }}
        validationSchema={ParticulierFormValidationSchema}
        onSubmit={handleClickButton}
      >
        <Form>
          <ParticulierForm {...particulierFormProps} />
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

  test("render composant Particulier Formulaire", async () => {
    render(<HookParticulierForm />);

    const inputNomNaissance: HTMLInputElement = screen.getByLabelText("particulier.nomNaissance");
    const inputNomUsage: HTMLInputElement = screen.getByLabelText("particulier.nomUsage");
    const inputPrenom: HTMLInputElement = screen.getByLabelText("particulier.prenom");

    fireEvent.change(inputNomNaissance, {
      target: {
        value: "mockNomNaissance"
      }
    });
    fireEvent.change(inputNomUsage, {
      target: {
        value: "mockNomUsage"
      }
    });
    fireEvent.change(inputPrenom, {
      target: {
        value: "mockPrenom"
      }
    });

    const submit = screen.getByText(/Submit/i);

    fireEvent.blur(inputNomNaissance);
    fireEvent.blur(inputNomUsage);
    fireEvent.blur(inputPrenom);
    fireEvent.click(submit);

    await waitFor(() =>
      expect(screen.getByTestId("result").innerHTML).toBe(
        '{"particulier":{"nomNaissance":"mockNomNaissance","nomUsage":"mockNomUsage","prenom":"MockPrenom"}}'
      )
    );
  });
});
