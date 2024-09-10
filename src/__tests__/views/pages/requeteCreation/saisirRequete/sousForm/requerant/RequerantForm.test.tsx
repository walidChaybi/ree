import {
  ADRESSE,
  AUTRE_ADRESSE_COURRIEL,
  AUTRE_NUMERO_TELEPHONE,
  NOM,
  PRENOM
} from "@composant/formulaire/ConstantesNomsForm";
import RequerantForm from "@pages/requeteCreation/saisirRequete/sousForm/requerant/RequerantForm";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import {
  ADRESSE_MAIL_NON_CONFORME,
  CARACTERES_AUTORISES_MESSAGE,
  NUMERO_TELEPHONE_NON_CONFORME
} from "@widget/formulaire/FormulaireMessages";
import {
  AdresseFormDefaultValues,
  AdresseFormValidationSchema
} from "@widget/formulaire/adresse/AdresseForm";
import { SubFormProps } from "@widget/formulaire/utils/FormUtil";
import { Field, Form, Formik } from "formik";
import React, { useState } from "react";
import { expect, test } from "vitest";
import * as Yup from "yup";
import {
  CaracteresAutorises,
  NumeroTelephone
} from "../../../../../../../ressources/Regex";

const REQUERANT = "requerant";

const HookParentsForm: React.FC = () => {
  const [result, setResult] = useState("");

  const ParentsFormProps = {
    nom: REQUERANT
  } as SubFormProps;

  const handleClickButton = (values: any) => {
    setResult(JSON.stringify(values));
  };

  const ValidationSchema = Yup.object().shape({
    [NOM]: Yup.string().matches(
      CaracteresAutorises,
      CARACTERES_AUTORISES_MESSAGE
    ),
    [PRENOM]: Yup.string().matches(
      CaracteresAutorises,
      CARACTERES_AUTORISES_MESSAGE
    ),
    [AUTRE_ADRESSE_COURRIEL]: Yup.string().email(ADRESSE_MAIL_NON_CONFORME),
    [AUTRE_NUMERO_TELEPHONE]: Yup.string().matches(
      NumeroTelephone,
      NUMERO_TELEPHONE_NON_CONFORME
    ),
    [ADRESSE]: AdresseFormValidationSchema
  });

  return (
    <Formik
      initialValues={{
        [REQUERANT]: {
          [NOM]: "",
          [PRENOM]: "",
          [ADRESSE]: AdresseFormDefaultValues,
          [AUTRE_ADRESSE_COURRIEL]: "",
          [AUTRE_NUMERO_TELEPHONE]: ""
        }
      }}
      validationSchema={ValidationSchema}
      onSubmit={handleClickButton}
    >
      <Form>
        <RequerantForm {...ParentsFormProps} />
        <button type="submit">Submit</button>
        <Field as="textarea" value={result} data-testid="result" />
      </Form>
    </Formik>
  );
};

test("DOIT rendre le composant formulaire du requerant correctement", () => {
  render(<HookParentsForm />);

  const inputNomRequerant = screen.getByLabelText("requerant.nom");
  const inputPrenomRequerant = screen.getByLabelText("requerant.prenom");
  const inputAutreAdresseCourielRequerant = screen.getByLabelText(
    "requerant.autreAdresseCourriel"
  );
  const inputAutreNumeroTelRequerant = screen.getByLabelText(
    "requerant.autreNumeroTelephone"
  );

  fireEvent.blur(inputNomRequerant, {
    target: {
      value: "mockNomRequerant"
    }
  });

  fireEvent.blur(inputPrenomRequerant, {
    target: {
      value: "mockPrenomRequerant"
    }
  });

  fireEvent.blur(inputAutreAdresseCourielRequerant, {
    target: {
      value: "mockAdresseRequerant"
    }
  });

  fireEvent.blur(inputAutreNumeroTelRequerant, {
    target: {
      value: "mockNumeroRequerant"
    }
  });
});

test("DOIT ajouter l'input nomUsage au click sur le bouton ajouter", () => {
  render(<HookParentsForm />);
  const boutonAjouter = screen.getByText("Ajouter un nom d'usage");

  fireEvent.click(boutonAjouter);

  const inputNomUsage = screen.getByLabelText("Nom d'usage");
  waitFor(() => {
    expect(inputNomUsage).toBeDefined();
  });
});
