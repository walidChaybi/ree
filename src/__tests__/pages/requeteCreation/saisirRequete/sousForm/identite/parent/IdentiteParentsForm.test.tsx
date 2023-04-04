import {
  DATE_NAISSANCE,
  NAISSANCE,
  NATIONALITES,
  NOM,
  PAS_DE_NOM_CONNU,
  PAS_DE_PRENOM_CONNU,
  PAYS_ORIGINE,
  PAYS_STATUT_REFUGIE,
  PRENOMS,
  SEXE
} from "@composant/formulaire/ConstantesNomsForm";
import { PrenomsFormDefaultValues } from "@composant/formulaire/nomsPrenoms/PrenomsForm";
import { EvenementEtrangerFormDefaultValues } from "@pages/requeteCreation/saisirRequete/sousForm/evenement/EvenementEtranger";
import IdentiteParentForm, {
  ParentSubFormProps
} from "@pages/requeteCreation/saisirRequete/sousForm/parent/IdentiteParentForm";
import { ParentFormValidationSchema } from "@pages/requeteCreation/saisirRequete/sousForm/parent/ParentsForm";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { DateDefaultValues } from "@widget/formulaire/champsDate/DateComposeForm";
import { NationalitesFormDefaultValues } from "@widget/formulaire/nationalites/Nationalites";
import { Field, Form, Formik } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";

const PARENTS = "parents";

const HookParentForm: React.FC = () => {
  const [result, setResult] = useState("");

  const IdentiteParentFormProps = {
    nom: "parents.parent1"
  } as ParentSubFormProps;

  const handleClickButton = (values: any) => {
    setResult(JSON.stringify(values));
  };

  const ValidationSchema = Yup.object().shape({
    [PARENTS]: ParentFormValidationSchema
  });

  return (
    <Formik
      initialValues={{
        [PARENTS]: {
          parent1: {
            [PAS_DE_NOM_CONNU]: "false",
            [NOM]: "",
            [PAS_DE_PRENOM_CONNU]: "false",
            [PRENOMS]: PrenomsFormDefaultValues,
            [SEXE]: "INCONNU",
            [DATE_NAISSANCE]: DateDefaultValues,
            [NAISSANCE]: EvenementEtrangerFormDefaultValues,
            [NATIONALITES]: NationalitesFormDefaultValues,
            [PAYS_STATUT_REFUGIE]: "",
            [PAYS_ORIGINE]: ""
          }
        }
      }}
      validationSchema={ValidationSchema}
      onSubmit={handleClickButton}
    >
      <Form>
        <IdentiteParentForm {...IdentiteParentFormProps} />
        <button type="submit">Submit</button>
        <Field as="textarea" value={result} data-testid="result" />
      </Form>
    </Formik>
  );
};

test("DOIT rendre le composant d'identite du parent correctement", async () => {
  await waitFor(async () => {
    render(<HookParentForm />);
  });

  const inputNomActeEtranger = screen.getByRole("textbox", {
    name: /parents.parent1.nom/i
  });

  const boutonsCheckboxParentsPasDeNomConnu = screen.getByLabelText(
    "parents.parent1.pasdenomconnu.pasdenomconnu"
  );

  await waitFor(async () => {
    fireEvent.click(boutonsCheckboxParentsPasDeNomConnu);
  });

  await waitFor(() => {
    expect(inputNomActeEtranger).not.toBeInTheDocument();
  });

  await waitFor(async () => {
    fireEvent.click(boutonsCheckboxParentsPasDeNomConnu);
  });

  await waitFor(() => {
    expect(inputNomActeEtranger).toBeDefined();
  });

  const inputPrenom1 = screen.queryByText("Prénom 1");

  await waitFor(() => {
    expect(inputPrenom1).toBeInTheDocument();
  });

  const boutonsCheckboxPasDePrenomConnu = screen.getByLabelText(
    "parents.parent1.pasdeprenomconnu.pasdeprenomconnu"
  );

  await waitFor(async () => {
    fireEvent.click(boutonsCheckboxPasDePrenomConnu);
  });

  await waitFor(() => {
    expect(inputPrenom1).not.toBeInTheDocument();
  });

  await waitFor(async () => {
    fireEvent.click(boutonsCheckboxPasDePrenomConnu);
  });
});

test("DOIT formater correctement", async () => {
  await waitFor(async () => {
    render(<HookParentForm />);
  });

  const inputPaysStatutRefugie = screen.getByRole("textbox", {
    name: /parents.parent1.paysStatutRefugie/i
  });

  const inputPaysOrigine = screen.getByRole("textbox", {
    name: /parents.parent1.paysOrigine/i
  });

  await waitFor(async () => {
    fireEvent.blur(inputPaysStatutRefugie, {
      target: {
        value: "algérie"
      }
    });

    fireEvent.blur(inputPaysOrigine, {
      target: {
        value: "tunisie"
      }
    });
  });

  expect(screen.getByLabelText("Pays du statut de réfugié")).toHaveValue(
    "Algérie"
  );

  expect(screen.getByLabelText("Pays d'origine du réfugié")).toHaveValue(
    "Tunisie"
  );
});