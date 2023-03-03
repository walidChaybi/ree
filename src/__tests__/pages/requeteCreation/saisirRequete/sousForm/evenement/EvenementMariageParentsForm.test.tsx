import { MARIAGE } from "@pages/requeteCreation/saisirRequete/modelForm/ISaisirRCTCPageModel";
import EvenementMariageParentsForm, {
  EvenementMariageParentsFormDefaultValues,
  EvenementMariageParentsFormValidationSchema
} from "@pages/requeteCreation/saisirRequete/sousForm/evenement/EvenementMariageParentsForm";
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor
} from "@testing-library/react";
import { Field, Form, Formik } from "formik";
import React, { useState } from "react";

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

test("DOIT rendre le composant d'évènement de mariage des parents correctement", async () => {
  await act(async () => {
    render(<HookEvenementForm />);
  });

  const boutonsRadioParentsMaries = screen.getByText("Oui");

  await act(async () => {
    fireEvent.click(boutonsRadioParentsMaries);
  });

  await waitFor(() => {
    expect(screen.getByText("Date du mariage")).toBeDefined();
    expect(screen.getByText("Lieu du mariage")).toBeDefined();
  });

  const boutonsRadioLieuLieuMariageEtranger = screen.getByText("Etranger");

  await act(async () => {
    fireEvent.click(boutonsRadioLieuLieuMariageEtranger);
  });

  await waitFor(() => {
    expect(screen.getByText("Ville du mariage")).toBeDefined();
    expect(screen.getByText("Pays du mariage")).toBeDefined();
  });

  const boutonsRadioLieuMariageFrance = screen.getByText("France");

  await act(async () => {
    fireEvent.click(boutonsRadioLieuMariageFrance);
  });

  await waitFor(() => {
    expect(screen.getByText("Ville du mariage")).toBeDefined();
  });
});
