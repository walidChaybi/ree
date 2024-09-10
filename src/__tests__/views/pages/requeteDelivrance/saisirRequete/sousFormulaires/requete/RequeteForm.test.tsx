import { REQUETE } from "@composant/formulaire/ConstantesNomsForm";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import RequeteForm, {
  RequeteFormDefaultValues,
  RequeteFormValidationSchema
} from "@widget/formulaire/requete/RequeteForm";
import { SubFormProps } from "@widget/formulaire/utils/FormUtil";
import { Field, Form, Formik } from "formik";
import React, { useState } from "react";
import { expect, test } from "vitest";

const HookRequeteForm: React.FC = () => {
  const [result, setResult] = useState("");

  const requeteFormProps = {
    nom: REQUETE
  } as SubFormProps;

  const handleClickButton = (values: any) => {
    setResult(JSON.stringify(values));
  };

  return (
    <Formik
      initialValues={{
        [REQUETE]: { ...RequeteFormDefaultValues }
      }}
      validationSchema={RequeteFormValidationSchema}
      onSubmit={handleClickButton}
    >
      <Form>
        <RequeteForm {...requeteFormProps} />
        <button type="submit">Submit</button>
        <Field as="textarea" value={result} data-testid="result" />
      </Form>
    </Formik>
  );
};

test("render component Requete Formulaire", () => {
  render(<HookRequeteForm />);

  const inputNatureActe = screen.getByTestId(
    "requete.natureActe"
  ) as HTMLSelectElement;
  const inputDocumentDemande = screen.getByTestId(
    "requete.documentDemande"
  ) as HTMLSelectElement;
  const inputNbExemplaire = screen.getByLabelText(
    "requete.nbExemplaire"
  ) as HTMLInputElement;
  const inputMotif = screen.getByTestId("requete.motif") as HTMLSelectElement;

  const submit = screen.getByText(/Submit/i);

  fireEvent.change(inputNatureActe, {
    target: {
      value: "NAISSANCE"
    }
  });
  fireEvent.change(inputDocumentDemande, {
    target: {
      value: "0e1e909f-f74c-4b16-9c03-b3733354c6ce"
    }
  });
  fireEvent.change(inputNbExemplaire, {
    target: {
      value: "2"
    }
  });
  fireEvent.change(inputMotif, {
    target: {
      value: "AUTRE"
    }
  });

  waitFor(() => {
    expect(inputNatureActe.value).toBe("NAISSANCE");
    expect(inputDocumentDemande.value).toBe(
      "0e1e909f-f74c-4b16-9c03-b3733354c6ce"
    );
    expect(inputNbExemplaire.value).toBe("2");
    expect(inputMotif.value).toBe("AUTRE");
  });

  const inputComplementMotif = screen.getByLabelText(
    "requete.complementMotif"
  ) as HTMLInputElement;

  fireEvent.change(inputComplementMotif, {
    target: {
      value: "mockComplementMotif"
    }
  });
  fireEvent.click(submit);

    waitFor(() => {
      expect(inputComplementMotif.value).toBe("mockComplementMotif");
    });
});


