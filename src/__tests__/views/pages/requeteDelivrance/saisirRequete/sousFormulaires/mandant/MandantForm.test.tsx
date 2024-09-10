import { MANDANT } from "@composant/formulaire/ConstantesNomsForm";
import { TypeMandant } from "@model/requete/enum/TypeMandant";
import MandantForm, {
  MandantFormDefaultValues,
  MandantFormValidationSchema
} from "@pages/requeteDelivrance/saisirRequete/sousFormulaires/mandant/MandantForm";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { SubFormProps } from "@widget/formulaire/utils/FormUtil";
import { Field, Form, Formik } from "formik";
import React, { useState } from "react";
import { expect, test } from "vitest";

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

test("test Type Mandant", () => {
  render(<HookMandantForm />);

  const inputTypeMandantPersonnePhysique = screen.getByLabelText(
    "mandant.typemandant.personne_physique"
  ) as HTMLInputElement;
  const inputTypeMandantPersonneMorale = screen.getByLabelText(
    "mandant.typemandant.personne_morale"
  ) as HTMLInputElement;

  expect(inputTypeMandantPersonnePhysique).toHaveProperty("checked", true);
  expect(inputTypeMandantPersonneMorale).toHaveProperty("checked", false);

  fireEvent.click(inputTypeMandantPersonneMorale);

  waitFor(() => {
    expect(inputTypeMandantPersonnePhysique).toHaveProperty("checked", false);
    expect(inputTypeMandantPersonneMorale).toHaveProperty("checked", true);
  });
});

test("retour du formulaire Mandant", () => {
  render(<HookMandantForm />);

  const inputTypeMandantPersonnePhysique = screen.getByLabelText(
    "mandant.typemandant.personne_physique"
  ) as HTMLInputElement;
  const inputTypeMandantPersonneMorale = screen.getByLabelText(
    "mandant.typemandant.personne_morale"
  ) as HTMLInputElement;

  waitFor(() => {
    expect(inputTypeMandantPersonnePhysique).toHaveProperty("checked", true);
    expect(inputTypeMandantPersonneMorale).toHaveProperty("checked", false);
  });

  fireEvent.click(inputTypeMandantPersonneMorale);

  waitFor(() => {
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

  waitFor(() => {
    fireEvent.blur(inputNom);
    fireEvent.blur(inputPrenom);
  });

  const submit = screen.getByText(/Submit/i);
  fireEvent.click(submit);

    const result = screen.getByTestId("result");

    waitFor(() => {
      expect(result.innerHTML).toBe(
        '{"mandant":{"typeMandant":"PERSONNE_MORALE","raisonSociale":"mockRaisonSociale","nom":"mockNom","prenom":"MockPrenom"}}'
      );
    });
});
