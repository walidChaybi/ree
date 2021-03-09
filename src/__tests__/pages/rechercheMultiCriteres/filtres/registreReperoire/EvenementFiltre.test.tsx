import React, { useState } from "react";
import {
  render,
  waitFor,
  act,
  screen,
  fireEvent
} from "@testing-library/react";
import { Field, Formik, Form } from "formik";
import EvenementFiltre, {
  EvenementDefaultValues,
  EvenementFiltreProps
} from "../../../../../views/pages/rechercheMultiCriteres/filtres/registreReperoire/EvenementFiltre";
import { EVENEMENT } from "../../../../../views/pages/rechercheMultiCriteres/filtres/registreReperoire/RegistreReperoireFiltre";
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

test("render composant EvenementFiltre", async () => {
  await act(async () => {
    render(<HookEvenementFiltre />);
  });

  const inputJour = screen.getByLabelText(
    "evenement.dateEvenement jour"
  ) as HTMLInputElement;
  const inputMois = screen.getByLabelText(
    "evenement.dateEvenement mois"
  ) as HTMLInputElement;
  const inputAnnee = screen.getByLabelText(
    "evenement.dateEvenement année"
  ) as HTMLInputElement;
  const pays = screen.getByLabelText(
    "evenement.paysEvenement"
  ) as HTMLInputElement;

  const allInputEvenement = [inputJour, inputMois, inputAnnee, pays];

  await waitFor(() => {
    expectToBeDefined([...allInputEvenement]);
  });

  act(() => {
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
  });

  const submit = screen.getByText(/Submit/i);
  await act(async () => {
    fireEvent.click(submit);
  });

  const result = screen.getByTestId("result");

  await waitFor(() => {
    expect(result.innerHTML).toBe(
      '{"evenement":{"dateEvenement":{"jour":"20","mois":"12","annee":"2020"},"paysEvenement":"France"}}'
    );
  });
});

function expectToBeDefined(elements: HTMLElement[]) {
  elements.forEach(el => expect(el).toBeDefined());
}

test("onBlur input pays", async () => {
  await act(async () => {
    render(<HookEvenementFiltre />);

    const inputPays = screen.getByLabelText(
      "evenement.paysEvenement"
    ) as HTMLInputElement;

    act(() => {
      fireEvent.change(inputPays, {
        target: {
          value: "  mock  pays  "
        }
      });
    });

    await waitFor(() => {
      expect(inputPays.value).toBe("  mock  pays  ");
    });

    await act(async () => {
      fireEvent.blur(inputPays);
    });

    await waitFor(() => {
      expect(inputPays.value).toBe("mock pays");
    });
  });
});
