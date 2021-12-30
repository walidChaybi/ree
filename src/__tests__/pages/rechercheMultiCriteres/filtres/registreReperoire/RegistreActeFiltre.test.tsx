import {
  act,
  fireEvent,
  render,
  screen,
  waitFor
} from "@testing-library/react";
import { Field, Form, Formik } from "formik";
import React, { useState } from "react";
import request from "superagent";
import { configEtatcivil } from "../../../../../mock/superagent-config/superagent-mock-etatcivil";
import RegistreActeFiltre, {
  RegistreActeDefaultValues,
  RegistreActeFiltreProps
} from "../../../../../views/pages/rechercheMultiCriteres/filtres/registreReperoire/RegistreActeFiltre";
import { REGISTRE } from "../../../../../views/pages/rechercheMultiCriteres/filtres/registreReperoire/RegistreReperoireFiltre";

const superagentMock = require("superagent-mock")(request, configEtatcivil);

const HookRegistreActeFiltre: React.FC = () => {
  const [result, setResult] = useState("");

  const registreFiltreProps = {
    nomFiltre: REGISTRE
  } as RegistreActeFiltreProps;

  const handleClickButton = (values: any) => {
    setResult(JSON.stringify(values));
  };
  return (
    <Formik
      initialValues={{
        [REGISTRE]: { ...RegistreActeDefaultValues }
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

  const natureActe = screen.getByTestId("registre.natureActe")
    .childNodes[0] as HTMLInputElement;
  const familleRegistre = screen.getByTestId("registre.familleRegistre")
    .childNodes[0] as HTMLInputElement;
  const autocomplete = screen.getByTestId("autocomplete");
  const pocopa = screen.getByLabelText("registre.pocopa") as HTMLInputElement;
  const numeroActe = screen.getByLabelText(
    "registre.numeroActe"
  ) as HTMLInputElement;

  const allInputRegistreActe = [
    natureActe,
    familleRegistre,
    pocopa,
    numeroActe,
    autocomplete
  ];

  await waitFor(() => {
    expectToBeDefined([...allInputRegistreActe]);
  });

  autocomplete.focus();

  act(() => {
    fireEvent.change(familleRegistre, {
      target: {
        value: "ACQ"
      }
    });
  });

  act(() => {
    fireEvent.change(pocopa, {
      target: {
        value: "t"
      }
    });
  });
  await waitFor(() => {
    expect(screen.getByText("TORONTO")).toBeInTheDocument();
  });
  act(() => {
    fireEvent.keyDown(pocopa, { key: "ArrowDown" });
    fireEvent.keyDown(pocopa, { key: "Enter" });
  });

  act(() => {
    fireEvent.change(natureActe, {
      target: {
        value: "MARIAGE"
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
      '{"registre":{"natureActe":"MARIAGE","familleRegistre":"ACQ","anneeRegistre":"","pocopa":{"value":"TORONTO","str":"TORONTO"},"numeroActe":"123456"}}'
    );
  });
});

function expectToBeDefined(elements: HTMLElement[]) {
  elements.forEach(el => expect(el).toBeDefined());
}

afterAll(() => {
  superagentMock.unset();
});
