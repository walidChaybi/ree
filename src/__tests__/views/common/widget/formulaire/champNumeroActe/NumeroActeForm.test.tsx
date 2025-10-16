import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import NumeroActeForm, { NumeroActeDefaultValues } from "@widget/formulaire/champNumeroActe/NumeroActeForm";
import { Field, Form, Formik, useFormik } from "formik";
import { useState } from "react";
import { describe, expect, test } from "vitest";

describe("Test NumeroActeForm", () => {
  const HookNumeroActeForm: React.FC = () => {
    const [resultat, setResultat] = useState<string>("");

    const onSubmit = (values: any) => {
      setResultat(JSON.stringify(values));
    };

    const formik = useFormik({ initialValues: {}, onSubmit: onSubmit });

    return (
      <Formik
        initialValues={NumeroActeDefaultValues}
        onSubmit={onSubmit}
      >
        <Form>
          <NumeroActeForm
            nomFiltre="numeroActe"
            estInactifChampNumeroBisTer
            formik={formik}
          />
          <button type="submit">Soumettre</button>
          <Field
            as="textarea"
            value={resultat}
            data-testid="resultat"
          />
        </Form>
      </Formik>
    );
  };

  test("DOIT afficher les champs du composant NumeroActeForm", async () => {
    render(<HookNumeroActeForm />);

    await waitFor(() => {
      expect(screen.queryByText("N° d'acte / N° d'ordre")).toBeDefined();
      expect(screen.queryByPlaceholderText("N° d'acte ou d'ordre")).toBeDefined();
      expect(screen.queryByPlaceholderText("N° BisTer")).toBeDefined();
      expect(screen.queryByText("A partir de")).toBeDefined();

      expect(screen.queryByLabelText("Numero d'acte ou d'ordre")).toBeDefined();
      expect(screen.queryByLabelText("A partir de")).toBeDefined();
    });
  });

  test.each([
    {
      libelleTestDebut: "DOIT",
      libelleTestFin: "n'est pas",
      valeur: "",
      estVerrouille: true
    },
    {
      libelleTestDebut: "NE DOIT PAS",
      libelleTestFin: "est",
      valeur: "123",
      estVerrouille: false
    }
  ])(
    "$libelleTestDebut verrouiller la case à cocher 'A partir de' QUAND le champ 'Numéro acte ou d'ordre' $libelleTestFin saisie.",
    async params => {
      render(<HookNumeroActeForm />);

      const champNumeroActeOuOrdre: HTMLInputElement = screen.getByLabelText("Numéro d'acte ou d'ordre");
      const caseAPartirDe: HTMLInputElement = screen.getByLabelText("A partir de");

      fireEvent.change(champNumeroActeOuOrdre, {
        target: { value: params.valeur }
      });

      await waitFor(() => {
        expect(champNumeroActeOuOrdre.value).toBe(params.valeur);
        if (params.estVerrouille) {
          expect(caseAPartirDe.disabled).toBeTruthy();
        } else {
          expect(caseAPartirDe.disabled).not.toBeTruthy();
        }
      });
    }
  );
});
