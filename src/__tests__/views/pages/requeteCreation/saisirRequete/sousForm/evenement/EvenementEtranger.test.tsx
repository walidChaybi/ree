import { NAISSANCE } from "@composant/formulaire/ConstantesNomsForm";
import EvenementEtrangerForm, {
  EvenementEtrangerFormDefaultValues,
  EvenementEtrangerFormValidationSchema
} from "@pages/requeteCreation/saisirRequete/sousForm/evenement/EvenementEtranger";
import { fireEvent, render, screen } from "@testing-library/react";
import { Field, Form, Formik } from "formik";
import React, { useState } from "react";
import { expect, test } from "vitest";

const HookEvenementForm: React.FC = () => {
  const [result, setResult] = useState("");

  const handleClickButton = (values: any) => {
    setResult(JSON.stringify(values));
  };

  return (
    <Formik
      initialValues={{
        [NAISSANCE]: {
          ...EvenementEtrangerFormDefaultValues
        }
      }}
      validationSchema={EvenementEtrangerFormValidationSchema}
      onSubmit={handleClickButton}
    >
      <Form>
        <EvenementEtrangerForm nom={NAISSANCE} />
        <button type="submit">Submit</button>
        <Field as="textarea" value={result} data-testid="result" />
      </Form>
    </Formik>
  );
};

test("DOIT rendre le composant d'évènement étranger correctement", () => {
  render(<HookEvenementForm />);

  const inputVilleNaissance = screen.getByRole("textbox", {
    name: /naissance.villeNaissance/i
  });

  const inputRegionNaissance = screen.getByRole("textbox", {
    name: /naissance.regionNaissance/i
  });

  const inputPaysNaissance = screen.getByRole("textbox", {
    name: /naissance.paysNaissance/i
  });

  fireEvent.blur(inputVilleNaissance, {
    target: {
      value: "tunis"
    }
  });

  fireEvent.blur(inputRegionNaissance, {
    target: {
      value: "région"
    }
  });

  fireEvent.blur(inputPaysNaissance, {
    target: {
      value: "Tunisie"
    }
  });

  const ville = screen.getByLabelText("Ville de naissance") as HTMLInputElement;
  const region = screen.getByLabelText(
    "Région/état de naissance"
  ) as HTMLInputElement;
  const pays = screen.getByLabelText("Pays de naissance") as HTMLInputElement;

  expect(ville.value).toBe("Tunis");

  expect(region.value).toBe("Région");

  expect(pays.value).toBe("Tunisie");
});
