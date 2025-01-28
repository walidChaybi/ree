import { REQUETE } from "@composant/formulaire/ConstantesNomsForm";
import { DOCUMENT_DELIVRANCE } from "@mock/data/NomenclatureDocumentDelivrance";
import { DocumentDelivrance } from "@model/requete/enum/DocumentDelivrance";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import RequeteForm, { RequeteFormDefaultValues, RequeteFormValidationSchema } from "@widget/formulaire/requete/RequeteForm";
import { SubFormProps } from "@widget/formulaire/utils/FormUtil";
import { Field, Form, Formik } from "formik";
import React, { act, useState } from "react";
import { describe, expect, test } from "vitest";

describe("Test RequeteForm", () => {
  DocumentDelivrance.init(DOCUMENT_DELIVRANCE);

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
          <Field
            as="textarea"
            value={result}
            data-testid="result"
          />
        </Form>
      </Formik>
    );
  };

  test("render component Requete Formulaire", async () => {
    render(<HookRequeteForm />);

    const inputNatureActe: HTMLSelectElement = screen.getByTestId("requete.natureActe");
    const inputDocumentDemande: HTMLSelectElement = screen.getByTestId("requete.documentDemande");
    const inputNbExemplaire: HTMLInputElement = screen.getByLabelText("requete.nbExemplaire");
    const inputMotif: HTMLSelectElement = screen.getByTestId("requete.motif");

    const submit = screen.getByText(/Submit/i);

    act(() => {
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
    });

    await waitFor(() => {
      expect(inputNatureActe.value).toBe("NAISSANCE");
      expect(inputDocumentDemande.value).toBe("0e1e909f-f74c-4b16-9c03-b3733354c6ce");
      expect(inputNbExemplaire.value).toBe("2");
      expect(inputMotif.value).toBe("AUTRE");
    });

    const inputComplementMotif: HTMLInputElement = screen.getByLabelText("requete.complementMotif");

    fireEvent.change(inputComplementMotif, {
      target: {
        value: "mockComplementMotif"
      }
    });
    fireEvent.click(submit);

    await waitFor(() => expect(inputComplementMotif.value).toBe("mockComplementMotif"));
  });
});
