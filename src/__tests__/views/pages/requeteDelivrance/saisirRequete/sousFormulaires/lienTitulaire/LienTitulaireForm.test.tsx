import { LIEN_TITULAIRE } from "@composant/formulaire/ConstantesNomsForm";
import { TypeLienRequerant } from "@model/requete/enum/TypeLienRequerant";
import LienTitulaireForm, {
  LienTitulaireFormDefaultValues,
  LienTitulaireFormValidationSchema
} from "@pages/requeteDelivrance/saisirRequete/sousFormulaires/lienTitulaire/LienTitulaireForm";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { SubFormProps } from "@widget/formulaire/utils/FormUtil";
import { Field, Form, Formik } from "formik";
import React, { useState } from "react";
import { expect, test } from "vitest";

const HookLienTitulaireForm: React.FC = () => {
  const [result, setResult] = useState("");

  const requerantFormProps = {
    nom: LIEN_TITULAIRE,
    options: TypeLienRequerant.getAllEnumsAsOptions()
  } as SubFormProps;

  const handleClickButton = (values: any) => {
    setResult(JSON.stringify(values));
  };

  return (
    <Formik
      initialValues={{
        [LIEN_TITULAIRE]: { ...LienTitulaireFormDefaultValues }
      }}
      validationSchema={LienTitulaireFormValidationSchema}
      onSubmit={handleClickButton}
    >
      <Form>
        <LienTitulaireForm {...requerantFormProps} />
        <button type="submit">Submit</button>
        <Field as="textarea" value={result} data-testid="result" />
      </Form>
    </Formik>
  );
};

test("render formulaire LienTitulaire", () => {
  render(<HookLienTitulaireForm />);

  const submit = screen.getByText(/Submit/i);

  fireEvent.click(submit);

  const result = screen.getByTestId("result");

  waitFor(() => {
    expect(result.innerHTML).toBe(
      '{"lienTitulaire":{"lien":"TITULAIRE","natureLien":""}}'
    );
  });
});

test("input Nature du formulaire LienTitulaire", () => {
  render(<HookLienTitulaireForm />);

  const inputLien = screen.getByTestId(
    "lienTitulaire.lien"
  ) as HTMLSelectElement;

  fireEvent.change(inputLien, {
    target: {
      value: "AUTRE"
    }
  });

  const inputNatureLien = screen.getByLabelText(
    "lienTitulaire.natureLien"
  ) as HTMLInputElement;

  const submit = screen.getByText(/Submit/i);
  fireEvent.change(inputNatureLien, {
    target: {
      value: "mockNature"
    }
  });
  fireEvent.click(submit);

  const result = screen.getByTestId("result");

  waitFor(() => {
    expect(result.innerHTML).toBe(
      '{"lienTitulaire":{"lien":"AUTRE","natureLien":"mockNature"}}'
    );
  });
});
