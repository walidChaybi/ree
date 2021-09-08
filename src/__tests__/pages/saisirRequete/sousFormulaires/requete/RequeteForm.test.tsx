import {
  act,
  fireEvent,
  render,
  screen,
  waitFor
} from "@testing-library/react";
import { Field, Form, Formik } from "formik";
import React, { useState } from "react";
import RequeteForm, {
  RequeteFormDefaultValues,
  RequeteFormValidationSchema
} from "../../../../../views/common/widget/formulaire/requete/RequeteForm";
import { SubFormProps } from "../../../../../views/common/widget/formulaire/utils/FormUtil";
import { REQUETE } from "../../../../../views/pages/saisirRequete/modelForm/ISaisirRDCPageModel";

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

test("render component Requete Formulaire", async () => {
  await act(async () => {
    render(<HookRequeteForm />);
  });

  const inputNatureActe = screen.getByLabelText(
    "requete.natureActe"
  ) as HTMLInputElement;
  const inputDocumentDemande = screen.getByLabelText(
    "requete.documentDemande"
  ) as HTMLInputElement;
  const inputNbExemplaire = screen.getByLabelText(
    "requete.nbExemplaire"
  ) as HTMLInputElement;
  const inputMotif = screen.getByLabelText("requete.motif") as HTMLInputElement;

  const submit = screen.getByText(/Submit/i);

  await act(async () => {
    fireEvent.change(inputNatureActe, {
      target: {
        value: "NAISSANCE"
      }
    });
    fireEvent.change(inputDocumentDemande, {
      target: {
        value: "COPIE_INTEGRALE"
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
    expect(inputDocumentDemande.value).toBe("COPIE_INTEGRALE");
    expect(inputNbExemplaire.value).toBe("2");
    expect(inputMotif.value).toBe("AUTRE");
  });

  const inputComplementMotif = screen.getByLabelText(
    "requete.complementMotif"
  ) as HTMLInputElement;

  await act(async () => {
    fireEvent.change(inputComplementMotif, {
      target: {
        value: "mockComplementMotif"
      }
    });
    fireEvent.click(submit);
  });

  await waitFor(() => {
    expect(inputComplementMotif.value).toBe("mockComplementMotif");
  });
});
