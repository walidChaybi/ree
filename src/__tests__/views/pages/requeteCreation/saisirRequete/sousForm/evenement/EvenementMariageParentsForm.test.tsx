import { MARIAGE } from "@composant/formulaire/ConstantesNomsForm";
import EvenementMariageParentsForm, {
  EvenementMariageParentsFormDefaultValues,
  EvenementMariageParentsFormValidationSchema
} from "@pages/requeteCreation/saisirRequete/sousForm/evenement/EvenementMariageParentsForm";
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
          ...EvenementMariageParentsFormDefaultValues
        }
      }}
      validationSchema={EvenementMariageParentsFormValidationSchema}
      onSubmit={handleClickButton}
    >
      <Form>
        <EvenementMariageParentsForm nom={EVENEMENT} />
        <button type="submit">Submit</button>
        <Field as="textarea" value={result} data-testid="result" />
      </Form>
    </Formik>
  );
};

test("DOIT rendre le composant d'évènement de mariage des parents correctement", () => {
  render(<HookEvenementForm />);

  const boutonsRadioParentsMaries = screen.getByText("Oui");

  fireEvent.click(boutonsRadioParentsMaries);

  waitFor(() => {
    expect(screen.getByText("Date du mariage")).toBeDefined();
    expect(screen.getByText("Lieu du mariage")).toBeDefined();
  });

  const boutonsRadioLieuLieuMariageEtranger = screen.getByText("Etranger");

  fireEvent.click(boutonsRadioLieuLieuMariageEtranger);

  waitFor(() => {
    expect(screen.getByText("Ville du mariage")).toBeDefined();
    expect(screen.getByText("Pays du mariage")).toBeDefined();
  });

  const boutonsRadioLieuMariageFrance = screen.getByText("France");

  fireEvent.click(boutonsRadioLieuMariageFrance);

  waitFor(() => {
    expect(screen.getByText("Ville du mariage")).toBeDefined();
  });
});
