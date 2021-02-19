import React, { useState } from "react";
import {
  render,
  waitFor,
  act,
  screen,
  fireEvent,
  cleanup
} from "@testing-library/react";
import DateComposeForm, {
  DateComposeFormProps,
  DateDefaultValues,
  onDatePickerValueChange,
  executeEnDiffere
} from "../../../../views/common/widget/formulaire/DateComposeForm";
import { Field, Formik, Form } from "formik";

const HookConsummerDateComposeForm: React.FC = () => {
  const [result, setResult] = useState("");
  const onDateDebutChange = jest.fn();

  const dateDebutComposeFormProps = ({
    labelDate: "De: ",
    nomFiltre: "dateDebut",
    showDatePicker: true,
    onChange: onDateDebutChange
  } as any) as DateComposeFormProps;
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

test("render composant DateComposeForm", async () => {
  await act(async () => {
    render(<HookConsummerDateComposeForm />);
  });
  const inputJour = screen.getByLabelText("dateDebut jour") as HTMLInputElement;
  const inputMois = screen.getByLabelText("dateDebut mois") as HTMLInputElement;
  const inputAnnee = screen.getByLabelText(
    "dateDebut année"
  ) as HTMLInputElement;

  await waitFor(() => {
    expect(inputJour).toBeDefined();
    expect(inputMois).toBeDefined();
    expect(inputAnnee).toBeDefined();
  });

  act(() => {
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
  });

  const submit = screen.getByText(/Submit/i);
  act(() => {
    fireEvent.click(submit);
  });

  const result = screen.getByTestId("result");

  await waitFor(() => {
    expect(result.innerHTML).toBe(
      '{"dateDebut":{"jour":"01","mois":"02","annee":"2021"}}'
    );
  });

  // Click bouton effacer
  const iconEffacer = screen.getByTitle("vider les champs");
  act(() => {
    fireEvent.click(iconEffacer);
  });

  await waitFor(() => {
    expect(inputJour.value).toBe("");
    expect(inputMois.value).toBe("");
    expect(inputAnnee.value).toBe("");
  });
});

test("render composant DateComposeForm: onDatePickerValueChange", async () => {
  const setDateSaisie = jest.fn();
  const date = new Date();
  const props = {
    formik: {
      setFieldValue: jest.fn()
    }
  };
  onDatePickerValueChange(props, date, setDateSaisie);

  waitFor(() => {
    expect(setDateSaisie).toHaveBeenCalledTimes(1);
    expect(props.formik.setFieldValue).toHaveBeenCalledTimes(3);
  });
});

afterEach(cleanup);
