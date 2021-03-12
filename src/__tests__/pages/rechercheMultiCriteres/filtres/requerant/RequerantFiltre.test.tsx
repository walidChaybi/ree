import React, { useState } from "react";
import {
  fireEvent,
  render,
  waitFor,
  act,
  screen
} from "@testing-library/react";
import { Field, Form, Formik } from "formik";
import RequerantFiltre, {
  RequerantDefaultValues,
  RequerantFiltreProps
} from "../../../../../views/pages/rechercheMultiCriteres/filtres/requerant/RequerantFiltre";
import { REQUERANT } from "../../../../../views/pages/rechercheMultiCriteres/requete/RMCRequetePage";

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

test("render composant formulaire Requerant", async () => {
  await act(async () => {
    render(<HookConsummerRequerantForm />);
  });
  const inputNom = screen.getByLabelText("Nom") as HTMLInputElement;
  const inputRaison = screen.getByLabelText(
    "Raison sociale / Institutionnel"
  ) as HTMLInputElement;

  act(() => {
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
  });

  const submit = screen.getByText(/Submit/i);
  await act(async () => {
    fireEvent.click(submit);
  });

  const result = screen.getByTestId("result");

  await waitFor(() => {
    expect(result.innerHTML).toBe(
      '{"requerant":{"nom":"mockNom","raisonSociale":"mockRaison"}}'
    );
  });
});

test("onBlur input requerant", async () => {
  await act(async () => {
    const { getByLabelText } = render(<HookConsummerRequerantForm />);

    const inputNom = getByLabelText("Nom") as HTMLInputElement;

    act(() => {
      fireEvent.change(inputNom, {
        target: {
          value: "  mock  Nom  "
        }
      });
    });

    await waitFor(() => {
      expect(inputNom.value).toBe("  mock  Nom  ");
    });

    await act(async () => {
      fireEvent.blur(inputNom);
    });

    await waitFor(() => {
      expect(inputNom.value).toBe("mock Nom");
    });
  });
});
