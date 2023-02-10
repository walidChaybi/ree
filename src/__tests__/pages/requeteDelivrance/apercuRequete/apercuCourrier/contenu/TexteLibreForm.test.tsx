import { TEXTE, TEXTE_LIBRE } from "@composant/formulaire/ConstantesNomsForm";
import { DocumentDelivrance } from "@model/requete/enum/DocumentDelivrance";
import { ValidationSchemaChoixCourrier } from "@pages/requeteDelivrance/apercuRequete/apercuCourrier/contenu/contenuForm/sousFormulaires/ChoixCourrierForm";
import TexteLibreForm from "@pages/requeteDelivrance/apercuRequete/apercuCourrier/contenu/contenuForm/sousFormulaires/TexteLibreForm";
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor
} from "@testing-library/react";
import { SubFormProps } from "@widget/formulaire/utils/FormUtil";
import { Form, Formik, FormikProps, FormikValues } from "formik";
import React from "react";
import request from "superagent";
import requeteDelivrance from "../../../../../../mock/data/requeteDelivrance";
import { configRequetes } from "../../../../../../mock/superagent-config/superagent-mock-requetes";

const superagentMock = require("superagent-mock")(request, configRequetes);

beforeAll(() => {
  DocumentDelivrance.init();
});

const HookTexteLibreForm: React.FC = () => {
  const texteLibreFormProps = {
    nom: TEXTE_LIBRE,
    requete: requeteDelivrance,
    formik: {} as FormikProps<FormikValues>,
    onChange: jest.fn(),
    options: []
  } as SubFormProps;

  const texteLibreFormDefaultValues = {
    [TEXTE]: ""
  };

  return (
    <Formik
      initialValues={texteLibreFormDefaultValues}
      validationSchema={ValidationSchemaChoixCourrier}
      onSubmit={jest.fn()}
    >
      <Form>
        <TexteLibreForm {...texteLibreFormProps} />
      </Form>
    </Formik>
  );
};

test("renders OptionsCourrierForm", async () => {
  act(() => {
    render(<HookTexteLibreForm />);
  });

  const inputTexteLibre = screen.getByLabelText(
    "texteLibre.texte"
  ) as HTMLInputElement;

  await waitFor(() => {
    expect(inputTexteLibre.value).toBe(""); //"Informations diverses manquantes (117)"
  });

  await act(async () => {
    fireEvent.change(inputTexteLibre, {
      target: {
        value: "Je change le texte libre" // "Mandat généalogiste manquant (18)"
      }
    });
  });

  await waitFor(() => {
    expect(inputTexteLibre.value).toBe("Je change le texte libre");
  });
});

afterAll(() => {
  superagentMock.unset();
});
