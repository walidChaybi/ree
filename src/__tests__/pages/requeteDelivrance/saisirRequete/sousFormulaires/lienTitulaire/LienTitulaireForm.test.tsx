import {
  act,
  fireEvent,
  render,
  screen,
  waitFor
} from "@testing-library/react";
import { Field, Form, Formik } from "formik";
import React, { useState } from "react";
import { TypeLienRequerant } from "../../../../../../model/requete/enum/TypeLienRequerant";
import { SubFormProps } from "../../../../../../views/common/widget/formulaire/utils/FormUtil";
import { LIEN_TITULAIRE } from "../../../../../../views/pages/requeteDelivrance/saisirRequete/modelForm/ISaisirRDCPageModel";
import LienTitulaireForm, {
  LienTitulaireFormDefaultValues,
  LienTitulaireFormValidationSchema
} from "../../../../../../views/pages/requeteDelivrance/saisirRequete/sousFormulaires/lienTitulaire/LienTitulaireForm";

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

test("render formulaire LienTitulaire", async () => {
  await act(async () => {
    render(<HookLienTitulaireForm />);
  });

  const submit = screen.getByText(/Submit/i);
  await act(async () => {
    fireEvent.click(submit);
  });

  const result = screen.getByTestId("result");

  await waitFor(() => {
    expect(result.innerHTML).toBe(
      '{"lienTitulaire":{"lien":"TITULAIRE","natureLien":""}}'
    );
  });
});

test("input Nature du formulaire LienTitulaire", async () => {
  await act(async () => {
    render(<HookLienTitulaireForm />);
  });

  const inputLien = screen.getByTestId("lienTitulaire.lien")
    .childNodes[0] as HTMLInputElement;

  act(() => {
    fireEvent.change(inputLien, {
      target: {
        value: "AUTRE"
      }
    });
  });

  const inputNatureLien = screen.getByLabelText(
    "lienTitulaire.natureLien"
  ) as HTMLInputElement;

  const submit = screen.getByText(/Submit/i);
  await act(async () => {
    fireEvent.change(inputNatureLien, {
      target: {
        value: "mockNature"
      }
    });
    fireEvent.click(submit);
  });

  const result = screen.getByTestId("result");

  await waitFor(() => {
    expect(result.innerHTML).toBe(
      '{"lienTitulaire":{"lien":"AUTRE","natureLien":"mockNature"}}'
    );
  });
});
