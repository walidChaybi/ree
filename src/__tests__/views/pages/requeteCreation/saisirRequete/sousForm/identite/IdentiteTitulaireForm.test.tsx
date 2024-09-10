import {
  NOMS,
  PAS_DE_PRENOM_CONNU,
  PRENOMS
} from "@composant/formulaire/ConstantesNomsForm";
import {
  creerValidationSchemaPrenom,
  genererDefaultValuesPrenoms
} from "@composant/formulaire/nomsPrenoms/PrenomsForm";
import IdentiteTitulaireForm from "@pages/requeteCreation/saisirRequete/sousForm/identite/IdentiteTitulaireForm";
import {
  NomsFormDefaultValues,
  NomsFormValidationSchema
} from "@pages/requeteCreation/saisirRequete/sousForm/identite/nomsPrenoms/NomsForm";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { Field, Form, Formik } from "formik";
import React, { useState } from "react";
import { expect, test } from "vitest";
import * as Yup from "yup";

const TITULAIRE = "titulaire";

const HookTitulaireForm: React.FC = () => {
  const [result, setResult] = useState("");

  const handleClickButton = (values: any) => {
    setResult(JSON.stringify(values));
  };

  const ValidationSchema = Yup.object().shape({
    [TITULAIRE]: Yup.object({
      [NOMS]: NomsFormValidationSchema,
      [PRENOMS]: creerValidationSchemaPrenom()
    })
  });

  return (
    <Formik
      initialValues={{
        [TITULAIRE]: {
          [NOMS]: NomsFormDefaultValues,
          [PAS_DE_PRENOM_CONNU]: "false",
          [PRENOMS]: genererDefaultValuesPrenoms()
        }
      }}
      validationSchema={ValidationSchema}
      onSubmit={handleClickButton}
    >
      <Form>
        <IdentiteTitulaireForm key={TITULAIRE} nom={TITULAIRE} />
        <button type="submit">Submit</button>
        <Field as="textarea" value={result} data-testid="result" />
      </Form>
    </Formik>
  );
};

test("DOIT rendre le composant d'identite du titulaire correctement", () => {
  render(<HookTitulaireForm />);

  const boutonsCheckboxTitulaireNomActeEtranger = screen.getByLabelText(
    "titulaire.noms.pasdenomacteetranger.pasdenomacteetranger"
  );

  const inputNomActeEtranger = screen.getByRole("textbox", {
    name: /titulaire.noms.nomActeEtranger/i
  });

  fireEvent.click(boutonsCheckboxTitulaireNomActeEtranger);

  waitFor(() => {
    expect(inputNomActeEtranger).not.toBeDefined();
  });

  fireEvent.click(boutonsCheckboxTitulaireNomActeEtranger);

  waitFor(() => {
    expect(inputNomActeEtranger).toBeDefined();
  });

  fireEvent.blur(inputNomActeEtranger, {
    target: {
      value: "mockNom"
    }
  });

  const boutonsCheckboxTitulaireNomActeFrancais = screen.getByLabelText(
    "titulaire.noms.nomSouhaiteActeFR"
  );

  fireEvent.blur(boutonsCheckboxTitulaireNomActeFrancais, {
    target: {
      value: "mockNomActeFrancais"
    }
  });

  fireEvent.click(boutonsCheckboxTitulaireNomActeEtranger);
});

test("DOIT cacher le sous formulaire des prénoms quand la checkbox 'pas de prénom connu' est coché", () => {
  render(<HookTitulaireForm />);

  const inputPrenom1 = screen.getByLabelText("Prénom");

  waitFor(() => {
    expect(inputPrenom1).toBeDefined();
  });

  fireEvent.blur(inputPrenom1, {
    target: {
      value: "mockPrenomTitulaire"
    }
  });

  const boutonsCheckboxPasDePrenomConnu = screen.getByLabelText(
    "titulaire.pasdeprenomconnu.pasdeprenomconnu"
  );

  fireEvent.click(boutonsCheckboxPasDePrenomConnu);

  waitFor(() => {
    expect(screen.queryByText("Prénom")).not.toBeDefined();
  });

  fireEvent.click(boutonsCheckboxPasDePrenomConnu);
});