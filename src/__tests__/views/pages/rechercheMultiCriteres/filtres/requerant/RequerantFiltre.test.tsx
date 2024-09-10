import { REQUERANT } from "@composant/formulaire/ConstantesNomsForm";
import RequerantFiltre, {
  RequerantDefaultValues,
  RequerantFiltreProps
} from "@pages/rechercheMultiCriteres/filtres/requerant/RequerantFiltre";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { Field, Form, Formik } from "formik";
import React, { useState } from "react";
import { expect, test } from "vitest";

const HookConsummerRequerantForm: React.FC = () => {
  const [result, setResult] = useState("");

  const requerantFiltreProps = {
    nomFiltre: REQUERANT
  } as RequerantFiltreProps;

  const handleClickButton = (values: any) => {
    setResult(JSON.stringify(values));
  };

  return (
    <>
      <Formik
        initialValues={{
          [REQUERANT]: { ...RequerantDefaultValues }
        }}
        onSubmit={handleClickButton}
      >
        <Form>
          <RequerantFiltre {...requerantFiltreProps} />
          <button type="submit">Submit</button>
          <Field as="textarea" value={result} data-testid="result" />
        </Form>
      </Formik>
    </>
  );
};

test("render composant formulaire Requerant", () => {
  render(<HookConsummerRequerantForm />);
  const inputNom = screen.getByLabelText("Nom") as HTMLInputElement;
  const inputRaison = screen.getByLabelText(
    "Raison sociale / Institutionnel"
  ) as HTMLInputElement;

  fireEvent.change(inputNom, {
    target: {
      value: "mockNom"
    }
  });
  fireEvent.change(inputRaison, {
    target: {
      value: "mockRaison"
    }
  });

  const submit = screen.getByText(/Submit/i);
  fireEvent.click(submit);

  const result = screen.getByTestId("result");

  waitFor(() => {
    expect(result.innerHTML).toBe(
      '{"requerant":{"nom":"mockNom","raisonSociale":"mockRaison"}}'
    );
  });
});

test("onBlur input requerant", () => {
  const { getByLabelText } = render(<HookConsummerRequerantForm />);

  const inputNom = getByLabelText("Nom") as HTMLInputElement;

  fireEvent.change(inputNom, {
    target: {
      value: "  mock  Nom  "
    }
  });

  waitFor(() => {
    expect(inputNom.value).toBe("  mock  Nom  ");
  });

  fireEvent.blur(inputNom);

  waitFor(() => {
    expect(inputNom.value).toBe("mock Nom");
  });
});
