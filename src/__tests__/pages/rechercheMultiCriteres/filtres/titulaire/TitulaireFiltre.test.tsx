import React, { useState } from "react";
import { fireEvent, render, waitFor, act } from "@testing-library/react";
import { Field, Form, Formik } from "formik";
import TitulaireFiltre, {
  TitulaireDefaultValues
} from "../../../../../views/pages/rechercheMultiCriteres/filtres/titulaire/TitulaireFiltre";

const HookConsummerTitulaireForm: React.FC = () => {
  const [result, setResult] = useState("");
  const handleClickButton = (values: any) => {
    setResult(JSON.stringify(values));
  };

  return (
    <>
      <Formik
        initialValues={TitulaireDefaultValues}
        onSubmit={handleClickButton}
      >
        <Form>
          <TitulaireFiltre nomFiltre="" />
          <button type="submit" onSubmit={handleClickButton}>
            Submit
          </button>
          <Field as="textarea" value={result} data-testid="result" />
        </Form>
      </Formik>
    </>
  );
};

test("render composant formulaire Titulaire", async () => {
  await act(async () => {
    const { getByLabelText, getByText, getByTestId } = render(
      <HookConsummerTitulaireForm />
    );

    const inputNom = getByLabelText("Nom") as HTMLInputElement;
    const inputPrenom = getByLabelText("Prénom") as HTMLInputElement;
    const inputPays = getByLabelText("Pays de naissance") as HTMLInputElement;

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

    const submit = getByText(/Submit/i);
    await act(async () => {
      fireEvent.click(submit);
    });

    const result = getByTestId("result");

    await waitFor(() => {
      expect(result.innerHTML).toBe(
        '{"nom":"mockNom","prenom":"mockPrenom","dateNaissance":{"jour":"","mois":"","annee":""},"paysNaissance":"mockPays"}'
      );
    });
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
