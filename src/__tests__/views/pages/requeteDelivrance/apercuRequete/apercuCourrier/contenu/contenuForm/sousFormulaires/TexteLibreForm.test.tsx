import { TEXTE, TEXTE_LIBRE } from "@composant/formulaire/ConstantesNomsForm";
import requeteDelivrance from "@mock/data/requeteDelivrance";
import { ValidationSchemaChoixCourrier } from "@pages/requeteDelivrance/apercuRequete/apercuCourrier/contenu/contenuForm/sousFormulaires/ChoixCourrierForm";
import TexteLibreForm from "@pages/requeteDelivrance/apercuRequete/apercuCourrier/contenu/contenuForm/sousFormulaires/TexteLibreForm";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { SubFormProps } from "@widget/formulaire/utils/FormUtil";
import { Form, Formik, FormikProps, FormikValues } from "formik";
import React from "react";
import { expect, test, vi } from "vitest";

const HookTexteLibreForm: React.FC = () => {
  const texteLibreFormProps = {
    nom: TEXTE_LIBRE,
    requete: requeteDelivrance,
    formik: {} as FormikProps<FormikValues>,
    onChange: vi.fn(),
    options: []
  } as SubFormProps;

  const texteLibreFormDefaultValues = {
    [TEXTE]: ""
  };

  return (
    <Formik
      initialValues={texteLibreFormDefaultValues}
      validationSchema={ValidationSchemaChoixCourrier}
      onSubmit={vi.fn()}
    >
      <Form>
        <TexteLibreForm {...texteLibreFormProps} />
      </Form>
    </Formik>
  );
};

test("renders OptionsCourrierForm", () => {
  render(<HookTexteLibreForm />);

  const inputTexteLibre = screen.getByLabelText(
    "texteLibre.texte"
  ) as HTMLInputElement;

  waitFor(() => {
    expect(inputTexteLibre.value).toBe(""); //"Informations diverses manquantes (117)"
  });

  fireEvent.change(inputTexteLibre, {
    target: {
      value: "Je change le texte libre" // "Mandat généalogiste manquant (18)"
    }
  });

    waitFor(() => {
      expect(inputTexteLibre.value).toBe("Je change le texte libre");
    });
});
