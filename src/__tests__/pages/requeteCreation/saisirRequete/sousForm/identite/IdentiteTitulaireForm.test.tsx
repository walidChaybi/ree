import {
  PrenomsFormDefaultValues,
  PrenomsFormValidationSchema
} from "@composant/formulaire/nomsPrenoms/PrenomsForm";
import {
  NOMS,
  PAS_DE_PRENOM_CONNU,
  PRENOMS
} from "@pages/requeteCreation/saisirRequete/modelForm/ISaisirRCTCPageModel";
import IdentiteTitulaireForm from "@pages/requeteCreation/saisirRequete/sousForm/identite/IdentiteTitulaireForm";
import {
  NomsFormDefaultValues,
  NomsFormValidationSchema
} from "@pages/requeteCreation/saisirRequete/sousForm/identite/nomsPrenoms/NomsForm";
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor
} from "@testing-library/react";
import { Field, Form, Formik } from "formik";
import React, { useState } from "react";
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
      [PRENOMS]: PrenomsFormValidationSchema
    })
  });

  return (
    <Formik
      initialValues={{
        [TITULAIRE]: {
          [NOMS]: NomsFormDefaultValues,
          [PAS_DE_PRENOM_CONNU]: "false",
          [PRENOMS]: PrenomsFormDefaultValues
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

test("DOIT rendre le composant d'identite du titulaire correctement", async () => {
  await act(async () => {
    render(<HookTitulaireForm />);
  });

  const boutonsCheckboxTitulaireNomActeEtranger = screen.getByLabelText(
    "titulaire.noms.pasdenomacteetranger.pasdenomacteetranger"
  );

  await act(async () => {
    fireEvent.click(boutonsCheckboxTitulaireNomActeEtranger);
  });

  const inputNomActeEtranger = screen.getByRole("textbox", {
    name: /titulaire.noms.nomActeEtranger/i
  });

  await waitFor(() => {
    expect(inputNomActeEtranger).toBeDisabled();
  });

  await act(async () => {
    fireEvent.click(boutonsCheckboxTitulaireNomActeEtranger);
  });

  await act(async () => {
    fireEvent.blur(inputNomActeEtranger, {
      target: {
        value: "mockNom"
      }
    });
  });

  const boutonsCheckboxTitulaireNomActeFrancais = screen.getByLabelText(
    "titulaire.noms.nomSouhaiteActeFR"
  );

  await act(async () => {
    fireEvent.blur(boutonsCheckboxTitulaireNomActeFrancais, {
      target: {
        value: "mockNomActeFrancais"
      }
    });
  });
});

test("DOIT cacher le sous formulaire des prénoms quand la checkbox 'pas de prénom connu' est coché", async () => {
  await act(async () => {
    render(<HookTitulaireForm />);
  });

  const inputPrenom1 = screen.getByLabelText("Prénom 1");

  await waitFor(() => {
    expect(inputPrenom1).toBeDefined();
  });

  await waitFor(() => {
    fireEvent.blur(inputPrenom1, {
      target: {
        value: "mockPrenomTitulaire"
      }
    });
  });

  const boutonsCheckboxPasDePrenomConnu = screen.getByLabelText(
    "titulaire.pasdeprenomconnu.pasdeprenomconnu"
  );

  await act(async () => {
    fireEvent.click(boutonsCheckboxPasDePrenomConnu);
  });

  await waitFor(() => {
    expect(screen.queryByText("Prénom 1")).not.toBeInTheDocument();
  });
});
