import { RECONNAISSANCE } from "@composant/formulaire/ConstantesNomsForm";
import EvenementReconnaissanceTitulaireForm, {
  EvenementReconnaissanceTitulaireFormDefaultValues,
  EvenementReconnaissanceTitulaireFormValidationSchema,
  EvenementReconnaissanceTitulaireSubFormProps
} from "@pages/requeteCreation/saisirRequete/sousForm/evenement/EvenementReconnaissanceTitulaireForm";
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

  const evenementReconnaissanceTitulaireFormProps = {
    nom: EVENEMENT
  } as EvenementReconnaissanceTitulaireSubFormProps;

  const handleClickButton = (values: any) => {
    setResult(JSON.stringify(values));
  };

  return (
    <Formik
      initialValues={{
        [RECONNAISSANCE]: {
          ...EvenementReconnaissanceTitulaireFormDefaultValues
        }
      }}
      validationSchema={EvenementReconnaissanceTitulaireFormValidationSchema}
      onSubmit={handleClickButton}
    >
      <Form>
        <EvenementReconnaissanceTitulaireForm
          {...evenementReconnaissanceTitulaireFormProps}
        />
        <button type="submit">Submit</button>
        <Field as="textarea" value={result} data-testid="result" />
      </Form>
    </Formik>
  );
};

test("DOIT rendre le composant d'évènement de reconnaissance d'un titulaire correctement", async () => {
  await act(async () => {
    render(<HookEvenementForm />);
  });

  const boutonsRadioTitulaireReconnu = screen.getByText("Oui");

  await act(async () => {
    fireEvent.click(boutonsRadioTitulaireReconnu);
  });

  await waitFor(() => {
    expect(screen.getByText("Date de reconnaissance")).toBeDefined();
    expect(screen.getByText("Lieu de l'acte de reconnaissance")).toBeDefined();
  });

  const boutonsRadioLieuActeReconnaissanceEtranger =
    screen.getByText("Etranger");

  await act(async () => {
    fireEvent.click(boutonsRadioLieuActeReconnaissanceEtranger);
  });

  await waitFor(() => {
    expect(screen.getByText("Ville de la reconnaissance")).toBeDefined();
    expect(screen.getByText("Région/état de la reconnaissance")).toBeDefined();
    expect(screen.getByText("Pays de la reconnaissance")).toBeDefined();
  });

  const boutonsRadioLieuActeReconnaissanceFrance = screen.getByText("France");

  await act(async () => {
    fireEvent.click(boutonsRadioLieuActeReconnaissanceFrance);
  });

  await waitFor(() => {
    expect(screen.getByText("Département de la reconnaissance")).toBeDefined();
  });
});
