import { CHOIX_COURRIER } from "@composant/formulaire/ConstantesNomsForm";
import {
  getDefaultValuesCourrier,
  getTypesCourrier
} from "@pages/requeteDelivrance/apercuRequete/apercuCourrier/contenu/contenuForm/CourrierFonctions";
import ChoixCourrierForm, {
  ChoixCourrierSubFormProps,
  ValidationSchemaChoixCourrier
} from "@pages/requeteDelivrance/apercuRequete/apercuCourrier/contenu/contenuForm/sousFormulaires/ChoixCourrierForm";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { Form, Formik, FormikProps, FormikValues } from "formik";
import React from "react";
import { expect, test, vi } from "vitest";
import requeteDelivrance from "../../../../../../../../mock/data/requeteDelivrance";

const HookChoixCourrierForm: React.FC = () => {
  const typesCourrier = getTypesCourrier(requeteDelivrance);

  const choixCourrierFormProps = {
    nom: CHOIX_COURRIER,
    requete: requeteDelivrance,
    formik: {} as FormikProps<FormikValues>,
    typesCourrier,
    onChange: vi.fn(),
    options: []
  } as ChoixCourrierSubFormProps;

  return (
    <Formik
      initialValues={getDefaultValuesCourrier(requeteDelivrance)}
      validationSchema={ValidationSchemaChoixCourrier}
      onSubmit={vi.fn()}
    >
      <Form>
        <ChoixCourrierForm {...choixCourrierFormProps} />
      </Form>
    </Formik>
  );
};

test("renders ChoixCourrierForm", () => {
  render(<HookChoixCourrierForm />);

  const inputDelivrance = screen.getByLabelText("choixCourrier.delivrance") as HTMLInputElement;
  const inputCourrier = screen.getByTestId("choixCourrier.courrier") as HTMLSelectElement;

  waitFor(() => {
    expect(inputDelivrance.value).toBe("Réponse sans délivrance E/C - Requête incomplète");
    expect(inputCourrier.value).toBe("b36f9a2c-64fa-42bb-a3f6-adca6fec28f2"); //"Informations diverses manquantes (117)"
  });

  fireEvent.change(inputCourrier, {
    target: {
      value: "0296fc7a-fb81-4eb7-a72f-94286b8d8301" // "Mandat généalogiste manquant (18)"
    }
  });

  waitFor(() => {
    expect(inputCourrier.value).toBe("0296fc7a-fb81-4eb7-a72f-94286b8d8301");
  });
});
