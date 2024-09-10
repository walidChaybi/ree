import { RECONNAISSANCE } from "@composant/formulaire/ConstantesNomsForm";
import EvenementReconnaissanceTitulaireForm, {
  EvenementReconnaissanceTitulaireFormDefaultValues,
  EvenementReconnaissanceTitulaireFormValidationSchema,
  EvenementReconnaissanceTitulaireSubFormProps
} from "@pages/requeteCreation/saisirRequete/sousForm/evenement/EvenementReconnaissanceTitulaireForm";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { Field, Form, Formik } from "formik";
import React, { useState } from "react";
import { expect, test } from "vitest";

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

test("DOIT rendre le composant d'évènement de reconnaissance d'un titulaire correctement", () => {
  render(<HookEvenementForm />);

  const boutonsRadioTitulaireReconnu = screen.getByText("Oui");

  fireEvent.click(boutonsRadioTitulaireReconnu);

  waitFor(() => {
    expect(screen.getByText("Date de reconnaissance")).toBeDefined();
    expect(screen.getByText("Lieu de l'acte de reconnaissance")).toBeDefined();
  });

  const boutonsRadioLieuActeReconnaissanceEtranger =
    screen.getByText("Etranger");

  fireEvent.click(boutonsRadioLieuActeReconnaissanceEtranger);

  waitFor(() => {
    expect(screen.getByText("Ville de la reconnaissance")).toBeDefined();
    expect(screen.getByText("Région/état de la reconnaissance")).toBeDefined();
    expect(screen.getByText("Pays de la reconnaissance")).toBeDefined();
  });

  const boutonsRadioLieuActeReconnaissanceFrance = screen.getByText("France");

  fireEvent.click(boutonsRadioLieuActeReconnaissanceFrance);

  waitFor(() => {
    expect(screen.getByText("Département de la reconnaissance")).toBeDefined();
  });
});
