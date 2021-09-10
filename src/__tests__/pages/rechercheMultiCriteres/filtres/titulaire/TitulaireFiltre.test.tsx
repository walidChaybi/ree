import {
  act,
  fireEvent,
  render,
  screen,
  waitFor
} from "@testing-library/react";
import { Field, Form, Formik } from "formik";
import React, { useState } from "react";
import { TITULAIRE } from "../../../../../views/pages/rechercheMultiCriteres/acteInscription/RMCActeInscriptionForm";
import TitulaireFiltre, {
  TitulaireDefaultValues,
  TitulaireFiltreProps
} from "../../../../../views/pages/rechercheMultiCriteres/filtres/titulaire/TitulaireFiltre";

const HookConsummerTitulaireForm: React.FC = () => {
  const [result, setResult] = useState("");

  const titulaireFiltreProps = {
    nomFiltre: TITULAIRE
  } as TitulaireFiltreProps;

  const handleClickButton = (values: any) => {
    setResult(JSON.stringify(values));
  };

  return (
    <>
      <Formik
        initialValues={{
          [TITULAIRE]: { ...TitulaireDefaultValues }
        }}
        onSubmit={handleClickButton}
      >
        <Form>
          <TitulaireFiltre {...titulaireFiltreProps} />
          <button type="submit">Submit</button>
          <Field as="textarea" value={result} data-testid="result" />
        </Form>
      </Formik>
    </>
  );
};

test("render composant formulaire Titulaire", async () => {
  await act(async () => {
    render(<HookConsummerTitulaireForm />);
  });
  const inputNom = screen.getByLabelText("Nom") as HTMLInputElement;
  const inputPrenom = screen.getByLabelText("Prénom") as HTMLInputElement;
  const inputPays = screen.getByLabelText(
    "Pays de naissance"
  ) as HTMLInputElement;

  act(() => {
    fireEvent.change(inputNom, {
      target: {
        value: "mockNom"
      }
    });
    fireEvent.change(inputPrenom, {
      target: {
        value: "mockPrenom"
      }
    });
    fireEvent.change(inputPays, {
      target: {
        value: "mockPays"
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
      '{"titulaire":{"nom":"mockNom","prenom":"mockPrenom","dateNaissance":{"jour":"","mois":"","annee":""},"paysNaissance":"mockPays"}}'
    );
  });
});

test("bouton switch Nom et Prénom", async () => {
  await act(async () => {
    const component = render(<HookConsummerTitulaireForm />);

    const inputNom = component.getByLabelText("Nom") as HTMLInputElement;
    const inputPrenom = component.getByLabelText("Prénom") as HTMLInputElement;

    act(() => {
      fireEvent.change(inputNom, {
        target: {
          value: "mockNom"
        }
      });
      fireEvent.change(inputPrenom, {
        target: {
          value: "mockPrenom"
        }
      });
    });

    const boutonSwitch = component.container.getElementsByClassName(
      "BtnNomPrenom"
    );

    await waitFor(() => {
      expect(inputNom.value).toBe("mockNom");
      expect(inputPrenom.value).toBe("mockPrenom");
    });

    await act(async () => {
      fireEvent.click(boutonSwitch[0]);
    });

    await waitFor(() => {
      expect(inputNom.value).toBe("mockPrenom");
      expect(inputPrenom.value).toBe("mockNom");
    });
  });
});

test("onBlur input titulaire", async () => {
  await act(async () => {
    const { getByLabelText } = render(<HookConsummerTitulaireForm />);

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
