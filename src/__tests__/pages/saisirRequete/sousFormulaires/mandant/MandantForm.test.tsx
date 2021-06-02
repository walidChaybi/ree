import {
  act,
  fireEvent,
  render,
  screen,
  waitFor
} from "@testing-library/react";
import { Field, Form, Formik } from "formik";
import React, { useState } from "react";
import { TypeMandant } from "../../../../../model/requete/v2/enum/TypeMandant";
import { SubFormProps } from "../../../../../views/common/widget/formulaire/utils/FormUtil";
import { MANDANT } from "../../../../../views/pages/saisirRequete/modelForm/ISaisirRDCPageModel";
import MandantForm, {
  MandantFormDefaultValues,
  MandantFormValidationSchema
} from "../../../../../views/pages/saisirRequete/sousFormulaires/mandant/MandantForm";

const HookMandantForm: React.FC = () => {
  const [result, setResult] = useState("");

  const requerantFormProps = {
    nom: MANDANT,
    options: TypeMandant.getAllEnumsAsOptions()
  } as SubFormProps;

  const handleClickButton = (values: any) => {
    setResult(JSON.stringify(values));
  };

  return (
    <Formik
      initialValues={{
        [MANDANT]: { ...MandantFormDefaultValues }
      }}
      validationSchema={MandantFormValidationSchema}
      onSubmit={handleClickButton}
    >
      <Form>
        <MandantForm {...requerantFormProps} />
        <button type="submit">Submit</button>
        <Field as="textarea" value={result} data-testid="result" />
      </Form>
    </Formik>
  );
};

test("test Type Mandant", async () => {
  await act(async () => {
    render(<HookMandantForm />);
  });

  const inputTypeMandantPersonnePhysique = screen.getByLabelText(
    "mandant.typemandant.personne_physique"
  ) as HTMLInputElement;
  const inputTypeMandantPersonneMorale = screen.getByLabelText(
    "mandant.typemandant.personne_morale"
  ) as HTMLInputElement;

  expect(inputTypeMandantPersonnePhysique).toHaveProperty("checked", true);
  expect(inputTypeMandantPersonneMorale).toHaveProperty("checked", false);

  await act(async () => {
    fireEvent.click(inputTypeMandantPersonneMorale);
  });

  await waitFor(() => {
    expect(inputTypeMandantPersonnePhysique).toHaveProperty("checked", false);
    expect(inputTypeMandantPersonneMorale).toHaveProperty("checked", true);
  });
});

test("retour du formulaire Mandant", async () => {
  await act(async () => {
    render(<HookMandantForm />);
  });

  const inputTypeMandantPersonnePhysique = screen.getByLabelText(
    "mandant.typemandant.personne_physique"
  ) as HTMLInputElement;
  const inputTypeMandantPersonneMorale = screen.getByLabelText(
    "mandant.typemandant.personne_morale"
  ) as HTMLInputElement;

  expect(inputTypeMandantPersonnePhysique).toHaveProperty("checked", true);
  expect(inputTypeMandantPersonneMorale).toHaveProperty("checked", false);

  await act(async () => {
    fireEvent.click(inputTypeMandantPersonneMorale);
  });

  await waitFor(() => {
    expect(inputTypeMandantPersonnePhysique).toHaveProperty("checked", false);
    expect(inputTypeMandantPersonneMorale).toHaveProperty("checked", true);
  });

  const inputRaisonSociale = screen.getByLabelText(
    "mandant.raisonSociale"
  ) as HTMLInputElement;
  const inputNom = screen.getByLabelText("mandant.nom") as HTMLInputElement;
  const inputPrenom = screen.getByLabelText(
    "mandant.prenom"
  ) as HTMLInputElement;

  await act(async () => {
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

  await waitFor(() => {
    fireEvent.blur(inputNom);
    fireEvent.blur(inputPrenom);
  });

  const submit = screen.getByText(/Submit/i);
  await act(async () => {
    fireEvent.click(submit);
  });

  const result = screen.getByTestId("result");

  await waitFor(() => {
    expect(result.innerHTML).toBe(
      '{"mandant":{"typeMandant":"PERSONNE_MORALE","raisonSociale":"mockRaisonSociale","nom":"MOCKNOM","prenom":"Mockprenom"}}'
    );
  });
});
