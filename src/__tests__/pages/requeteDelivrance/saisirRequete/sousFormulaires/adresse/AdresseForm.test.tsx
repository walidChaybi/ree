import {
  act,
  fireEvent,
  render,
  screen,
  waitFor
} from "@testing-library/react";
import { Field, Form, Formik } from "formik";
import React, { useState } from "react";
import AdresseForm, {
  AdresseFormDefaultValues,
  AdresseFormValidationSchema
} from "../../../../../../views/common/widget/formulaire/adresse/AdresseForm";
import { SubFormProps } from "../../../../../../views/common/widget/formulaire/utils/FormUtil";
import { ADRESSE } from "../../../../../../views/pages/requeteDelivrance/saisirRequete/modelForm/ISaisirRDCSCPageModel";

const HookAdresseForm: React.FC = () => {
  const [result, setResult] = useState("");

  const adresseFormProps = {
    nom: ADRESSE
  } as SubFormProps;

  const handleClickButton = (values: any) => {
    setResult(JSON.stringify(values));
  };

  return (
    <Formik
      initialValues={{
        [ADRESSE]: { ...AdresseFormDefaultValues }
      }}
      validationSchema={AdresseFormValidationSchema}
      onSubmit={handleClickButton}
    >
      <Form>
        <AdresseForm {...adresseFormProps} />
        <button type="submit">Submit</button>
        <Field as="textarea" value={result} data-testid="result" />
      </Form>
    </Formik>
  );
};

test("render composant Adresse Formulaire", async () => {
  await act(async () => {
    render(<HookAdresseForm />);
  });

  const inputVoie = screen.getByLabelText("adresse.voie") as HTMLInputElement;
  const inputLieuDit = screen.getByLabelText(
    "adresse.lieuDit"
  ) as HTMLInputElement;
  const inputComplementDestinataire = screen.getByLabelText(
    "adresse.complementDestinataire"
  ) as HTMLInputElement;
  const inputComplementPointGeo = screen.getByLabelText(
    "adresse.complementPointGeo"
  ) as HTMLInputElement;
  const inputCodePostal = screen.getByLabelText(
    "adresse.codePostal"
  ) as HTMLInputElement;
  const inputCommune = screen.getByLabelText(
    "adresse.commune"
  ) as HTMLInputElement;
  const inputPays = screen.getByLabelText("adresse.pays") as HTMLInputElement;
  const inputAdresseCourriel = screen.getByLabelText(
    "adresse.adresseCourriel"
  ) as HTMLInputElement;
  const inputNumeroTelephone = screen.getByLabelText(
    "adresse.numeroTelephone"
  ) as HTMLInputElement;

  act(() => {
    fireEvent.change(inputVoie, {
      target: {
        value: "mocklieuDit"
      }
    });
    fireEvent.change(inputLieuDit, {
      target: {
        value: "mockcomplementDestinataire"
      }
    });
    fireEvent.change(inputComplementDestinataire, {
      target: {
        value: "mockcomplementPointGeo"
      }
    });
    fireEvent.change(inputComplementPointGeo, {
      target: {
        value: "mockcomplementPointGeo"
      }
    });
    fireEvent.change(inputCodePostal, {
      target: {
        value: "12345"
      }
    });
    fireEvent.change(inputCommune, {
      target: {
        value: "mockcommune"
      }
    });
    fireEvent.change(inputPays, {
      target: {
        value: "mockpays"
      }
    });
    fireEvent.change(inputAdresseCourriel, {
      target: {
        value: "mockadresseCourriel"
      }
    });
    fireEvent.change(inputNumeroTelephone, {
      target: {
        value: "mocknumeroTelephone"
      }
    });
  });

  const submit = screen.getByText(/Submit/i);
  await act(async () => {
    fireEvent.blur(inputVoie);
    fireEvent.blur(inputLieuDit);
    fireEvent.blur(inputComplementDestinataire);
    fireEvent.blur(inputComplementPointGeo);
    fireEvent.blur(inputCommune);
    fireEvent.blur(inputPays);
    fireEvent.click(submit);
  });

  const result = screen.getByTestId("result");

  await waitFor(() => {
    expect(result.innerHTML).toBe(
      '{"adresse":{"voie":"MOCKLIEUDIT","lieuDit":"MOCKCOMPLEMENTDESTINATAIRE","complementDestinataire":"MOCKCOMPLEMENTPOINTGEO","complementPointGeo":"MOCKCOMPLEMENTPOINTGEO","codePostal":"12345","commune":"MOCKCOMMUNE","pays":"MOCKPAYS","adresseCourriel":"mockadresseCourriel","numeroTelephone":"mocknumeroTelephone"}}'
    );
  });
});
