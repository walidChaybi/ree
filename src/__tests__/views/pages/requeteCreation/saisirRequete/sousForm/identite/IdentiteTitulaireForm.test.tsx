import {
  DATE_NAISSANCE,
  IDENTIFIANT,
  LIEN_REQUERANT,
  NAISSANCE,
  NOM_ACTE_ETRANGER,
  NOM_SOUHAITE_ACTE_FR,
  PRENOMS,
  REQUERANT,
  REQUETE,
  SEXE
} from "@composant/formulaire/ConstantesNomsForm";
import { EvenementEtrangerFormDefaultValues } from "@pages/requeteCreation/saisirRequete/sousForm/evenement/EvenementEtranger";
import IdentiteTitulaireForm from "@pages/requeteCreation/saisirRequete/sousForm/identite/IdentiteTitulaireForm";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { Form, Formik } from "formik";
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
    [TITULAIRE]: Yup.object().shape({
      [NOM_ACTE_ETRANGER]: Yup.string(),
      [NOM_SOUHAITE_ACTE_FR]: Yup.string(),
      [PRENOMS]: Yup.object(),
      [SEXE]: Yup.string(),
      [DATE_NAISSANCE]: Yup.object(),
      [NAISSANCE]: Yup.object()
    })
  });

  return (
    <Formik
      initialValues={{
        [TITULAIRE]: {
          [IDENTIFIANT]: "",
          [NOM_ACTE_ETRANGER]: "",
          [NOM_SOUHAITE_ACTE_FR]: "",
          [PRENOMS]: { prenom1: "" },
          [SEXE]: "INCONNU",
          [DATE_NAISSANCE]: { jour: "", mois: "", annee: "" },
          [NAISSANCE]: EvenementEtrangerFormDefaultValues
        },
        [REQUETE]: {
          [LIEN_REQUERANT]: ""
        },
        [REQUERANT]: {
          [NOM_ACTE_ETRANGER]: ""
        }
      }}
      validationSchema={ValidationSchema}
      onSubmit={handleClickButton}
    >
      <Form>
        <IdentiteTitulaireForm
          key={TITULAIRE}
          nom={TITULAIRE}
        />
        <button type="submit">Submit</button>
        <div data-testid="result">{result}</div>
      </Form>
    </Formik>
  );
};

test("DOIT rendre le composant d'identite du titulaire correctement", async () => {
  render(<HookTitulaireForm />);

  const inputNomActeEtranger = screen.getByLabelText(/Nom sur l'acte étranger/i);
  expect(inputNomActeEtranger).toBeDefined();

  fireEvent.change(inputNomActeEtranger, {
    target: { value: "mockNom" }
  });

  fireEvent.blur(inputNomActeEtranger);

  const inputNomSouhaiteActeFr = screen.getByLabelText(/Nom souhaité sur l'acte français/i);
  expect(inputNomSouhaiteActeFr).toBeDefined();

  fireEvent.change(inputNomSouhaiteActeFr, {
    target: { value: "mockNomSouhaite" }
  });

  const inputPrenom = screen.getByLabelText(/Prénom/i);
  expect(inputPrenom).toBeDefined();

  fireEvent.change(inputPrenom, {
    target: { value: "mockPrenom" }
  });

  const sexeRadioGroup = screen.getByText(/Sexe/i);
  expect(sexeRadioGroup).toBeDefined();

  const dateNaissanceField = screen.getByText(/Date de naissance/i);
  expect(dateNaissanceField).toBeDefined();

  const submitButton = screen.getByRole("button", { name: /Submit/i });
  fireEvent.click(submitButton);

  await waitFor(() => {
    const resultElement = screen.getByTestId("result");
    const resultJson = JSON.parse(resultElement.textContent || "{}");
    expect(resultJson[TITULAIRE][NOM_ACTE_ETRANGER]).toBe("mockNom");
    expect(resultJson[TITULAIRE][NOM_SOUHAITE_ACTE_FR]).toBe("mockNomSouhaite");
    expect(resultJson[TITULAIRE][PRENOMS].prenom1).toBe("mockPrenom");
  });
});
