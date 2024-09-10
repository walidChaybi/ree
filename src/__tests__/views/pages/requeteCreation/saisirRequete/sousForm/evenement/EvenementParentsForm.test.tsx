import { MARIAGE } from "@composant/formulaire/ConstantesNomsForm";
import EvenementParentsForm, {
  EvenementParentsFormDefaultValues,
  EvenementParentsFormValidationSchema
} from "@pages/requeteCreation/saisirRequete/sousForm/evenement/EvenementParentsForm";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { Field, Form, Formik } from "formik";
import React, { useState } from "react";
import { expect, test } from "vitest";

const EVENEMENT = "evenement";

const HookEvenementForm: React.FC = () => {
  const [result, setResult] = useState("");

  const handleClickButton = (values: any) => {
    setResult(JSON.stringify(values));
  };

  return (
    <Formik
      initialValues={{
        [MARIAGE]: {
          ...EvenementParentsFormDefaultValues
        }
      }}
      validationSchema={EvenementParentsFormValidationSchema}
      onSubmit={handleClickButton}
    >
      <Form>
        <EvenementParentsForm nom={EVENEMENT} />
        <button type="submit">Submit</button>
        <Field as="textarea" value={result} data-testid="result" />
      </Form>
    </Formik>
  );
};

test("DOIT rendre le composant d'évènement des parents correctement", () => {
  render(<HookEvenementForm />);

  const boutonsRadioLieuNaissanceEtranger = screen.getByText("Etranger");

  fireEvent.click(boutonsRadioLieuNaissanceEtranger);

  waitFor(() => {
    expect(screen.getByText("Ville de naissance")).toBeDefined();
    expect(screen.getByText("Pays de naissance")).toBeDefined();
    expect(screen.getByText("Région/état de naissance")).toBeDefined();
  });

  const boutonsRadioLieuNaissanceFrance = screen.getByText("France");

  fireEvent.click(boutonsRadioLieuNaissanceFrance);

    waitFor(() => {
      expect(screen.getByText("Ville de naissance")).toBeDefined();
      expect(screen.getByText("Département de naissance")).toBeDefined();
    });
});
