import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor
} from "@testing-library/react";
import DateComposeForm, {
  DateComposeFormProps,
  DateDefaultValues,
  onDatePickerValueChange
} from "@widget/formulaire/champsDate/DateComposeForm";
import { Field, Form, Formik } from "formik";
import React, { useState } from "react";
import { afterEach, describe, expect, test, vi } from "vitest";

const HookConsummerDateComposeForm: React.FC = () => {
  const [result, setResult] = useState("");
  const onDateDebutChange = vi.fn();

  const dateDebutComposeFormProps = {
    labelDate: "De: ",
    nomDate: "dateDebut",
    showDatePicker: true,
    onChange: onDateDebutChange
  } as any as DateComposeFormProps;
  const handleClickButton = (values: any) => {
    setResult(JSON.stringify(values));
  };
  return (
    <Formik
      initialValues={{ dateDebut: { ...DateDefaultValues } }}
      onSubmit={handleClickButton}
    >
      <Form>
        <DateComposeForm disabled={false} {...dateDebutComposeFormProps} />
        <button type="submit">Submit</button>
        <Field as="textarea" value={result} data-testid="result" />
      </Form>
    </Formik>
  );
};

describe.skip("DateComposeForm - ", () => {
  test("render composant DateComposeForm", () => {
    render(<HookConsummerDateComposeForm />);

    const inputJour = screen.getByLabelText(
      "dateDebut.jour"
    ) as HTMLInputElement;
    const inputMois = screen.getByLabelText(
      "dateDebut.mois"
    ) as HTMLInputElement;
    const inputAnnee = screen.getByLabelText(
      "dateDebut.annee"
    ) as HTMLInputElement;

    waitFor(() => {
      expect(inputJour).toBeDefined();
      expect(inputMois).toBeDefined();
      expect(inputAnnee).toBeDefined();
    });

    fireEvent.input(inputJour, {
      target: {
        value: "1"
      }
    });
    fireEvent.blur(inputJour, {
      target: {
        value: "1"
      }
    });
    fireEvent.input(inputMois, {
      target: {
        value: "2"
      }
    });
    fireEvent.blur(inputMois, {
      target: {
        value: "2"
      }
    });

    fireEvent.input(inputAnnee, {
      target: {
        value: "2021"
      }
    });

    const submit = screen.getByText(/Submit/i);
    fireEvent.click(submit);

    const result = screen.getByTestId("result");

    waitFor(() => {
      expect(result.innerHTML).toBe(
        '{"dateDebut":{"jour":"01","mois":"02","annee":"2021"}}'
      );
    });

    // Click bouton effacer
    const iconEffacer = screen.getByTitle("Vider les champs");
    fireEvent.click(iconEffacer);

    waitFor(() => {
      expect(inputJour.value).toBe("");
      expect(inputMois.value).toBe("");
      expect(inputAnnee.value).toBe("");
    });
  });

  test("render composant DateComposeForm: onDatePickerValueChange", () => {
    const setDateSaisie = vi.fn();
    const date = new Date();
    const props = {
      formik: {
        setFieldValue: vi.fn()
      }
    };
    onDatePickerValueChange(props, date, setDateSaisie);

    waitFor(() => {
      expect(setDateSaisie).toHaveBeenCalledTimes(1);
      expect(props.formik.setFieldValue).toHaveBeenCalledTimes(3);
    });
  });
});

afterEach(cleanup);
