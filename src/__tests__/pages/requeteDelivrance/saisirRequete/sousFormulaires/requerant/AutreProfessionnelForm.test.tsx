import {
  act,
  fireEvent,
  render,
  screen,
  waitFor
} from "@testing-library/react";
import { Field, Form, Formik } from "formik";
import React, { useState } from "react";
import { SubFormProps } from "../../../../../../views/common/widget/formulaire/utils/FormUtil";
import { AUTRE_PROFESSIONNEL } from "../../../../../../views/pages/requeteDelivrance/saisirRequete/modelForm/ISaisirRequetePageModel";
import AutreProfessionnelForm, {
  AutreProfessionnelFormDefaultValues,
  AutreProfessionnelFormValidationSchema
} from "../../../../../../views/pages/requeteDelivrance/saisirRequete/sousFormulaires/requerant/autreProfessionnel/AutreProfessionnelForm";

const HookAutreProfessionnelForm: React.FC = () => {
  const [result, setResult] = useState("");

  const autreProfessionnelFormProps = {
    nom: AUTRE_PROFESSIONNEL
  } as SubFormProps;

  const handleClickButton = (values: any) => {
    setResult(JSON.stringify(values));
  };

  return (
    <Formik
      initialValues={{
        [AUTRE_PROFESSIONNEL]: { ...AutreProfessionnelFormDefaultValues }
      }}
      validationSchema={AutreProfessionnelFormValidationSchema}
      onSubmit={handleClickButton}
    >
      <Form>
        <AutreProfessionnelForm {...autreProfessionnelFormProps} />
        <button type="submit">Submit</button>
        <Field as="textarea" value={result} data-testid="result" />
      </Form>
    </Formik>
  );
};

test("render composant AutreProfessionnel Formulaire", async () => {
  await act(async () => {
    render(<HookAutreProfessionnelForm />);
  });
  const inputNature = screen.getByLabelText(
    "autreProfessionnel.nature"
  ) as HTMLInputElement;
  const inputRaisonSociale = screen.getByLabelText(
    "autreProfessionnel.raisonSociale"
  ) as HTMLInputElement;
  const inputNom = screen.getByLabelText(
    "autreProfessionnel.nom"
  ) as HTMLInputElement;
  const inputPrenom = screen.getByLabelText(
    "autreProfessionnel.prenom"
  ) as HTMLInputElement;

  act(() => {
    fireEvent.change(inputNature, {
      target: {
        value: "mockNature"
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
    fireEvent.blur(inputNature);
    fireEvent.blur(inputRaisonSociale);
    fireEvent.blur(inputNom);
    fireEvent.blur(inputPrenom);
    fireEvent.click(submit);
  });

  const result = screen.getByTestId("result");

  await waitFor(() => {
    expect(result.innerHTML).toBe(
      '{"autreProfessionnel":{"nature":"mockNature","raisonSociale":"mockRaisonSociale","nom":"MOCKNOM","prenom":"MockPrenom"}}'
    );
  });
});
