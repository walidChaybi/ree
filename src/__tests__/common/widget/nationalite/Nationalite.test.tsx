import { PrenomsFormValidationSchema } from "@composant/formulaire/nomsPrenoms/PrenomsForm";
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor
} from "@testing-library/react";
import NationalitesForm, {
  NationalitesFormDefaultValues
} from "@widget/formulaire/nationalites/Nationalites";
import { SubFormProps } from "@widget/formulaire/utils/FormUtil";
import { Field, Form, Formik } from "formik";
import React, { useState } from "react";

const NATIONALITES = "nationalites";

const HookNationaliteForm: React.FC = () => {
  const [result, setResult] = useState("");

  const nationaliteFormProps = {
    nom: NATIONALITES
  } as SubFormProps;

  const handleClickButton = (values: any) => {
    setResult(JSON.stringify(values));
  };

  return (
    <Formik
      initialValues={{
        [NATIONALITES]: { ...NationalitesFormDefaultValues }
      }}
      validationSchema={PrenomsFormValidationSchema}
      onSubmit={handleClickButton}
    >
      <Form>
        <NationalitesForm {...nationaliteFormProps} />
        <button type="submit">Submit</button>
        <Field as="textarea" value={result} data-testid="result" />
      </Form>
    </Formik>
  );
};

test("DOIT rendre le sous formulaire de nationalité correctement", async () => {
  await act(async () => {
    render(<HookNationaliteForm />);
  });

  const inputNationalite1 = screen.getByLabelText(
    "nationalites.nationalite1"
  ) as HTMLInputElement;

  act(() => {
    fireEvent.change(inputNationalite1, {
      target: {
        value: "mockNationalite1"
      }
    });
  });

  const submit = screen.getByText(/Submit/i);
  await act(async () => {
    fireEvent.blur(inputNationalite1);
    fireEvent.click(submit);
  });

  const result = screen.getByTestId("result");

  await waitFor(() => {
    expect(result.innerHTML).toBe(
      '{"nationalites":{"nationalite1":"MockNationalite1","nationalite2":"","nationalite3":""}}'
    );
  });
});

test("DOIT rendre le composant de Nationalité et permettre l'ajout et la suppression correctement", async () => {
  await act(async () => {
    render(<HookNationaliteForm />);
  });

  const inputNationalite1 = screen.getByLabelText(
    "nationalites.nationalite1"
  ) as HTMLInputElement;

  act(() => {
    fireEvent.change(inputNationalite1, {
      target: {
        value: "mockNationalite1"
      }
    });
  });

  const ajoutNationalite = screen.getByText(/Ajouter une nationalité/i);
  await act(async () => {
    fireEvent.blur(inputNationalite1);
    fireEvent.click(ajoutNationalite);
  });

  const inputPrenom2 = screen.getByLabelText(
    "nationalites.nationalite2"
  ) as HTMLInputElement;

  await act(async () => {
    fireEvent.change(inputPrenom2, {
      target: {
        value: "mockNationalite2"
      }
    });
  });

  const ajoutNationalite2 = screen.getByText(/Ajouter une nationalité/i);
  await act(async () => {
    fireEvent.blur(inputPrenom2);
    fireEvent.click(ajoutNationalite2);
  });

  const inputNationalite3 = screen.getByLabelText(
    "nationalites.nationalite3"
  ) as HTMLInputElement;

  await act(async () => {
    fireEvent.change(inputNationalite3, {
      target: {
        value: "mockNationalite3"
      }
    });
  });

  const submit = screen.getByText(/Submit/i);
  await act(async () => {
    fireEvent.blur(inputNationalite3);
    fireEvent.click(submit);
  });

  const result = screen.getByTestId("result");

  await waitFor(() => {
    expect(result.innerHTML).toBe(
      '{"nationalites":{"nationalite1":"MockNationalite1","nationalite2":"MockNationalite2","nationalite3":"MockNationalite3"}}'
    );
  });

  const supprNationalite = screen.getByText(/annuler la saisie/i);
  await act(async () => {
    fireEvent.click(supprNationalite);
  });

  await act(async () => {
    fireEvent.click(submit);
  });

  await waitFor(() => {
    expect(result.innerHTML).toBe(
      '{"nationalites":{"nationalite1":"MockNationalite1","nationalite2":"MockNationalite2","nationalite3":""}}'
    );
  });
});
