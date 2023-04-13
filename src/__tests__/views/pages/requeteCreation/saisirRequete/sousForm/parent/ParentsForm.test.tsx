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
import { ParentSubFormProps } from "@pages/requeteCreation/saisirRequete/sousForm/parent/IdentiteParentForm";
import ParentsForm, {
  ParentFormValidationSchema
} from "@pages/requeteCreation/saisirRequete/sousForm/parent/ParentsForm";
import { act, render } from "@testing-library/react";
import { DateDefaultValues } from "@widget/formulaire/champsDate/DateComposeForm";
import { NationalitesFormDefaultValues } from "@widget/formulaire/nationalites/Nationalites";
import { Field, Form, Formik } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";

const PARENTS = "parents";

const HookParentsForm: React.FC = () => {
  const [result, setResult] = useState("");

  const ParentsFormProps = {
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
        <ParentsForm {...ParentsFormProps} />
        <button type="submit">Submit</button>
        <Field as="textarea" value={result} data-testid="result" />
      </Form>
    </Formik>
  );
};

test("DOIT rendre le composant formulaire des parents correctement", async () => {
  await act(async () => {
    render(<HookParentsForm />);
  });
});
