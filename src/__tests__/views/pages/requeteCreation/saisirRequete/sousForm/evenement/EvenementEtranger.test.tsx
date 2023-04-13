import { NAISSANCE } from "@composant/formulaire/ConstantesNomsForm";
import EvenementEtrangerForm, {
  EvenementEtrangerFormDefaultValues,
  EvenementEtrangerFormValidationSchema
} from "@pages/requeteCreation/saisirRequete/sousForm/evenement/EvenementEtranger";
import { act, fireEvent, render, screen } from "@testing-library/react";
import { Field, Form, Formik } from "formik";
import React, { useState } from "react";

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

test("DOIT rendre le composant d'évènement étranger correctement", async () => {
  await act(async () => {
    render(<HookEvenementForm />);
  });

  const inputVilleNaissance = screen.getByRole("textbox", {
    name: /naissance.villeNaissance/i
  });

  const inputRegionNaissance = screen.getByRole("textbox", {
    name: /naissance.regionNaissance/i
  });

  const inputPaysNaissance = screen.getByRole("textbox", {
    name: /naissance.paysNaissance/i
  });

  await act(async () => {
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
        value: "tunisie"
      }
    });
  });

  expect(screen.getByLabelText("Ville de naissance")).toHaveValue("Tunis");

  expect(screen.getByLabelText("Région/état de naissance")).toHaveValue(
    "Région"
  );

  expect(screen.getByLabelText("Pays de naissance")).toHaveValue("Tunisie");
});
