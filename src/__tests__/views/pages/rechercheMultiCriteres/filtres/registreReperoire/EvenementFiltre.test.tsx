import EvenementFiltre, {
  EvenementDefaultValues,
  EvenementFiltreProps
} from "@pages/rechercheMultiCriteres/filtres/registreReperoire/EvenementFiltre";
import { EVENEMENT } from "@pages/rechercheMultiCriteres/filtres/registreReperoire/RegistreRepertoireFiltre";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { Field, Form, Formik } from "formik";
import React, { useState } from "react";
import { expect, test } from "vitest";
const HookEvenementFiltre: React.FC = () => {
  const [result, setResult] = useState("");

  const evenementFiltreProps = {
    nomFiltre: EVENEMENT
  } as EvenementFiltreProps;

  const handleClickButton = (values: any) => {
    setResult(JSON.stringify(values));
  };
  return (
    <Formik
      initialValues={{
        [EVENEMENT]: { ...EvenementDefaultValues }
      }}
      onSubmit={handleClickButton}
    >
      <Form>
        <EvenementFiltre {...evenementFiltreProps} />
        <button type="submit">Submit</button>
        <Field as="textarea" value={result} data-testid="result" />
      </Form>
    </Formik>
  );
};

test("render composant EvenementFiltre", () => {
  render(<HookEvenementFiltre />);

  const inputJour = screen.getByLabelText(
    "evenement.dateEvenement.jour"
  ) as HTMLInputElement;
  const inputMois = screen.getByLabelText(
    "evenement.dateEvenement.mois"
  ) as HTMLInputElement;
  const inputAnnee = screen.getByLabelText(
    "evenement.dateEvenement.annee"
  ) as HTMLInputElement;
  const pays = screen.getByLabelText(
    "evenement.paysEvenement"
  ) as HTMLInputElement;

  const allInputEvenement = [inputJour, inputMois, inputAnnee, pays];

  waitFor(() => {
    expectToBeDefined([...allInputEvenement]);
  });

  fireEvent.change(inputJour, {
    target: {
      value: "20"
    }
  });
  fireEvent.change(inputMois, {
    target: {
      value: "12"
    }
  });
  fireEvent.change(inputAnnee, {
    target: {
      value: "2020"
    }
  });
  fireEvent.change(pays, {
    target: {
      value: "France"
    }
  });

  const submit = screen.getByText(/Submit/i);
  fireEvent.click(submit);

  const result = screen.getByTestId("result");

  waitFor(() => {
    expect(result.innerHTML).toBe(
      '{"evenement":{"dateEvenement":{"jour":"20","mois":"12","annee":"2020"},"paysEvenement":"France"}}'
    );
  });
});

function expectToBeDefined(elements: HTMLElement[]) {
  elements.forEach(el => expect(el).toBeDefined());
}

test("onBlur input pays", () => {
  render(<HookEvenementFiltre />);

  const inputPays = screen.getByLabelText(
    "evenement.paysEvenement"
  ) as HTMLInputElement;

  fireEvent.change(inputPays, {
    target: {
      value: "  mock  pays  "
    }
  });

  waitFor(() => {
    expect(inputPays.value).toBe("  mock  pays  ");
  });

  fireEvent.blur(inputPays);

  waitFor(() => {
    expect(inputPays.value).toBe("mock pays");
  });
});
