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
import { genererDefaultValuesPrenoms } from "@composant/formulaire/nomsPrenoms/PrenomsForm";
import { EvenementEtrangerFormDefaultValues } from "@pages/requeteCreation/saisirRequete/sousForm/evenement/EvenementEtranger";
import IdentiteParentForm, {
  ParentSubFormProps
} from "@pages/requeteCreation/saisirRequete/sousForm/parent/IdentiteParentForm";
import { ParentFormValidationSchema } from "@pages/requeteCreation/saisirRequete/sousForm/parent/ParentsForm";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { DateDefaultValues } from "@widget/formulaire/champsDate/DateComposeForm";
import { NationalitesFormDefaultValues } from "@widget/formulaire/nationalites/NationalitesForm";
import { Field, Form, Formik } from "formik";
import React, { useState } from "react";
import { expect, test } from "vitest";
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
            [PRENOMS]: genererDefaultValuesPrenoms(),
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

test.skip("DOIT rendre le composant d'identite du parent correctement", () => {
  render(<HookParentForm />);

  const inputNomActeEtranger = screen.getByRole("textbox", {
    name: /parents.parent1.nom/i
  });

  const boutonsCheckboxParentsPasDeNomConnu = screen.getByLabelText(
    "parents.parent1.pasdenomconnu.pasdenomconnu"
  );

  fireEvent.click(boutonsCheckboxParentsPasDeNomConnu);

  waitFor(() => {
    expect(inputNomActeEtranger).not.toBeDefined();
  });

  fireEvent.click(boutonsCheckboxParentsPasDeNomConnu);

  const inputPrenom1 = screen.queryByText("Prénom");

  waitFor(() => {
    expect(inputNomActeEtranger).toBeDefined();
    expect(inputPrenom1).toBeDefined();
  });

  const boutonsCheckboxPasDePrenomConnu = screen.getByLabelText(
    "parents.parent1.pasdeprenomconnu.pasdeprenomconnu"
  );

  fireEvent.click(boutonsCheckboxPasDePrenomConnu);

  waitFor(() => {
    expect(inputPrenom1).not.toBeDefined();
  });

  fireEvent.click(boutonsCheckboxPasDePrenomConnu);
});

test("DOIT formater correctement", () => {
  render(<HookParentForm />);

  const inputPaysStatutRefugie = screen.getByRole("textbox", {
    name: /parents.parent1.paysStatutRefugie/i
  });

  const inputPaysOrigine = screen.getByRole("textbox", {
    name: /parents.parent1.paysOrigine/i
  });

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

  const paysStatut = screen.getByLabelText(
    "Pays du statut de réfugié"
  ) as HTMLInputElement;
  const paysOrigine = screen.getByLabelText(
    "Pays d'origine du réfugié"
  ) as HTMLInputElement;

  waitFor(() => {
    expect(paysStatut.value).toBe("Algérie");
    expect(paysOrigine).toBe("Tunisie");
  });
});