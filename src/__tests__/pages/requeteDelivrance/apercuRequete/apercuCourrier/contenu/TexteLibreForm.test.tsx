import {
    act,
    fireEvent,
    render,
    screen,
    waitFor
} from "@testing-library/react";
import { Form, Formik, FormikProps, FormikValues } from "formik";
import React from "react";
import request from "superagent";
import requeteDelivrance from "../../../../../../mock/data/requeteDelivrance";
import { configRequetes } from "../../../../../../mock/superagent-config/superagent-mock-requetes";
import { DocumentDelivrance } from "../../../../../../model/requete/enum/DocumentDelivrance";
import { SubFormProps } from "../../../../../../views/common/widget/formulaire/utils/FormUtil";
import { ValidationSchemaChoixCourrier } from "../../../../../../views/pages/requeteDelivrance/apercuRequete/apercuCourrier/contenu/contenuForm/sousFormulaires/ChoixCourrierForm";
import TexteLibreForm from "../../../../../../views/pages/requeteDelivrance/apercuRequete/apercuCourrier/contenu/contenuForm/sousFormulaires/TexteLibreForm";
import {
    TEXTE,
    TEXTE_LIBRE
} from "../../../../../../views/pages/requeteDelivrance/apercuRequete/apercuCourrier/contenu/modelForm/ISaisiePageModel";

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
