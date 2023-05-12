import {
  ADRESSE,
  AUTRE_ADRESSE_COURRIEL,
  AUTRE_NUMERO_TELEPHONE,
  NOM,
  PRENOM
} from "@composant/formulaire/ConstantesNomsForm";
import RequerantForm from "@pages/requeteCreation/saisirRequete/sousForm/requerant/RequerantForm";
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor
} from "@testing-library/react";
import {
  AdresseFormDefaultValues,
  AdresseFormValidationSchema
} from "@widget/formulaire/adresse/AdresseForm";
import {
  ADRESSE_MAIL_NON_CONFORME,
  CARATERES_AUTORISES_MESSAGE,
  NUMERO_TELEPHONE_NON_CONFORME
} from "@widget/formulaire/FormulaireMessages";
import { SubFormProps } from "@widget/formulaire/utils/FormUtil";
import { Field, Form, Formik } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";
import {
  CarateresAutorise,
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
    [NOM]: Yup.string().matches(CarateresAutorise, CARATERES_AUTORISES_MESSAGE),
    [PRENOM]: Yup.string().matches(
      CarateresAutorise,
      CARATERES_AUTORISES_MESSAGE
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

test("DOIT rendre le composant formulaire du requerant correctement", async () => {
  await act(async () => {
    render(<HookParentsForm />);
  });

  const inputNomRequerant = screen.getByLabelText("requerant.nom");
  const inputPrenomRequerant = screen.getByLabelText("requerant.prenom");
  const inputAutreAdresseCourielRequerant = screen.getByLabelText(
    "requerant.autreAdresseCourriel"
  );
  const inputAutreNumeroTelRequerant = screen.getByLabelText(
    "requerant.autreNumeroTelephone"
  );

  await act(async () => {
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
});

test("DOIT ajouter l'input nomUsage au click sur le bouton ajouter", async () => {
  render(<HookParentsForm />);
  const boutonAjouter = screen.getByText("Ajouter un nom d'usage");

  fireEvent.click(boutonAjouter);

  const inputNomUsage = screen.getByLabelText("Nom d'usage");
  await waitFor(() => {
    expect(inputNomUsage).toBeDefined();
  });
});
