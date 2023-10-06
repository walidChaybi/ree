import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import NumeroActeForm, {
  NumeroActeDefaultValues
} from "@widget/formulaire/champNumeroActe/NumeroActeForm";
import { Field, Form, Formik } from "formik";
import { useState } from "react";

const HookNumeroActeForm: React.FC = () => {
  const [resultat, setResultat] = useState<string>("");

  const onSubmit = (values: any) => {
    setResultat(JSON.stringify(values));
  };

  return (
    <Formik initialValues={NumeroActeDefaultValues} onSubmit={onSubmit}>
      <Form>
        <NumeroActeForm nomFiltre="numeroActe" />
        <button type="submit">Soumettre</button>
        <Field as="textarea" value={resultat} data-testid="resultat" />
      </Form>
    </Formik>
  );
};

test("DOIT afficher les champs du composant NumeroActeForm", async () => {
  render(<HookNumeroActeForm />);

  await waitFor(() => {
    expect(screen.queryByText("N° d'acte / N° d'ordre")).toBeInTheDocument();
    expect(
      screen.queryByPlaceholderText("N° d'acte ou d'ordre")
    ).toBeInTheDocument();
    expect(screen.queryByPlaceholderText("N° BisTer")).toBeInTheDocument();
    expect(screen.queryByText("A partir de")).toBeInTheDocument();

    expect(
      screen.queryByLabelText("Numero d'acte ou d'ordre")
    ).toBeInTheDocument();
    expect(screen.queryByLabelText("A partir de")).toBeInTheDocument();
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
  "$libelleTestDebut verrouiller la case à cocher 'A partir de' QUAND le champ 'Numero acte ou d'ordre' $libelleTestFin saisie.",
  async params => {
    render(<HookNumeroActeForm />);

    const champNumeroActeOuOrdre = screen.getByLabelText(
      "Numero d'acte ou d'ordre"
    );
    const caseAPartirDe = screen.getByLabelText("A partir de");

    fireEvent.change(champNumeroActeOuOrdre, {
      target: { value: params.valeur }
    });

    await waitFor(() => {
      expect(champNumeroActeOuOrdre).toHaveValue(params.valeur);
      if (params.estVerrouille) {
        expect(caseAPartirDe).toBeDisabled();
      } else {
        expect(caseAPartirDe).not.toBeDisabled();
      }
    });
  }
);
