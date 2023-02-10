import { MANDATAIRE } from "@composant/formulaire/ConstantesNomsForm";
import MandataireForm, {
  MandataireFormDefaultValues,
  MandataireFormValidationSchema
} from "@pages/requeteDelivrance/saisirRequete/sousFormulaires/requerant/mandataire/MandataireForm";
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
import request from "superagent";
import { configRequetes } from "../../../../../../mock/superagent-config/superagent-mock-requetes";

const superagentMock = require("superagent-mock")(request, configRequetes);

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

  const inputType = screen.getByTestId("mandataire.type") as HTMLSelectElement;
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
    expect(result.innerHTML).toBe(
      '{"mandataire":{"type":"AVOCAT","nature":"","raisonSociale":"mockRaisonSociale","nom":"mockNom","prenom":"MockPrenom"}}'
    );
  });
});

test("render composant Mandataire Formulaire : Affichage de l'input Nature", async () => {
  await act(async () => {
    render(<HookMandataireForm />);
  });

  const inputType = screen.getByTestId("mandataire.type") as HTMLSelectElement;

  act(() => {
    fireEvent.change(inputType, {
      target: {
        value: "AUTRE"
      }
    });
  });

  const inputNature = screen.getByLabelText(
    "mandataire.nature"
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
      '{"mandataire":{"type":"AUTRE","nature":"mockNature","raisonSociale":"","nom":"","prenom":""}}'
    );
  });
});
