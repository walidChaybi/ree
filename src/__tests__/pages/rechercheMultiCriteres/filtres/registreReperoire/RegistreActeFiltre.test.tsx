import React, { useState } from "react";
import {
  render,
  waitFor,
  act,
  screen,
  fireEvent
} from "@testing-library/react";
import { Field, Formik, Form } from "formik";
import RegistreActeFiltre, {
  RegistreActeDefaultValues,
  RegistreActeFiltreProps
} from "../../../../../views/pages/rechercheMultiCriteres/filtres/registreReperoire/RegistreActeFiltre";
import { REGISTRE_REPERTOIRE } from "../../../../../views/pages/rechercheMultiCriteres/RMCActeInscriptionPage";
const HookRegistreActeFiltre: React.FC = () => {
  const [result, setResult] = useState("");

  const registreFiltreProps = {
    nomFiltre: REGISTRE_REPERTOIRE
  } as RegistreActeFiltreProps;

  const handleClickButton = (values: any) => {
    setResult(JSON.stringify(values));
  };
  return (
    <Formik
      initialValues={{
        [REGISTRE_REPERTOIRE]: { ...RegistreActeDefaultValues }
      }}
      onSubmit={handleClickButton}
    >
      <Form>
        <RegistreActeFiltre {...registreFiltreProps} />
        <button type="submit">Submit</button>
        <Field as="textarea" value={result} data-testid="result" />
      </Form>
    </Formik>
  );
};

test("render composant RegistreActeFiltre", async () => {
  await act(async () => {
    render(<HookRegistreActeFiltre />);
  });

  const natureActe = screen.getByLabelText(
    "registreRepertoire.natureActe"
  ) as HTMLInputElement;
  const familleRegistre = screen.getByLabelText(
    "registreRepertoire.familleRegistre"
  ) as HTMLInputElement;
  const pocopa = screen.getByLabelText(
    "registreRepertoire.pocopa"
  ) as HTMLInputElement;
  const numeroActe = screen.getByLabelText(
    "registreRepertoire.numeroActe"
  ) as HTMLInputElement;

  const allInputRegistreActe = [
    natureActe,
    familleRegistre,
    pocopa,
    numeroActe
  ];

  await waitFor(() => {
    expectToBeDefined([...allInputRegistreActe]);
  });

  act(() => {
    fireEvent.change(natureActe, {
      target: {
        value: "MARIAGE"
      }
    });
    fireEvent.change(familleRegistre, {
      target: {
        value: "ACQ"
      }
    });
    fireEvent.change(pocopa, {
      target: {
        value: "Washington"
      }
    });
    fireEvent.change(numeroActe, {
      target: {
        value: "123456"
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
      '{"registreRepertoire":{"natureActe":"MARIAGE","familleRegistre":"ACQ","pocopa":"Washington","numeroActe":"123456"}}'
    );
  });
});

function expectToBeDefined(elements: HTMLElement[]) {
  elements.forEach(el => expect(el).toBeDefined());
}
