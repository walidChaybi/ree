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
import requeteDelivrance from "../../../../../mock/data/requeteDelivrance";
import { configRequetesV2 } from "../../../../../mock/superagent-config/superagent-mock-requetes-v2";
import { DocumentDelivrance } from "../../../../../model/requete/v2/enum/DocumentDelivrance";
import OptionsCourrierForm, {
  OptionCourrierFormDefaultValues,
  OptionsCourrierSubFormProps,
  ValidationSchemaOptionCourrier
} from "../../../../../views/pages/apercuRequete/apercuCourrier/contenu/contenuForm/sousFormulaires/OptionsCourrierForm";
import { OPTION } from "../../../../../views/pages/apercuRequete/apercuCourrier/contenu/modelForm/ISaisiePageModel";

const superagentMock = require("superagent-mock")(request, configRequetesV2);

beforeAll(() => {
  DocumentDelivrance.init();
});

const HookOptionsCourrierForm: React.FC = () => {
  const optionsCourrierFormProps = {
    nom: OPTION,
    documentDelivranceChoisi: DocumentDelivrance.getDocumentDelivrance(
      "b36f9a2c-64fa-42bb-a3f6-adca6fec28f2"
    ), //INFORMATION_DIVERSES_MANQUANTE (Courrier 117)
    titre: "Options",
    requete: requeteDelivrance,
    formik: {} as FormikProps<FormikValues>
  } as OptionsCourrierSubFormProps;

  return (
    <Formik
      initialValues={OptionCourrierFormDefaultValues}
      validationSchema={ValidationSchemaOptionCourrier}
      onSubmit={jest.fn()}
    >
      <Form>
        <OptionsCourrierForm {...optionsCourrierFormProps} />
      </Form>
    </Formik>
  );
};

test("renders OptionsCourrierForm DoubleClick pour ajouter, bouton moins pour supprimer", async () => {
  await act(async () => {
    render(<HookOptionsCourrierForm />);
  });

  const optionAbsenceFiliation = screen.getByText("Absence de date");

  await waitFor(() => {
    expect(screen.getByText("Ajouter un paragraphe")).toBeDefined();
    expect(screen.getByText("Option(s) disponibles(s)")).toBeDefined();
    expect(screen.getByText("Option(s) choisie(s)")).toBeDefined();
    // Libellés des options dans le tableau
    expect(screen.getByText("Conciergeries administratives")).toBeDefined();
    expect(screen.getByText("Absence de nom ou de prénom(s)")).toBeDefined();
    expect(optionAbsenceFiliation).toBeDefined();
  });

  // Ajouter une option à puces au courrier (Absence de date)
  await act(async () => {
    fireEvent.dblClick(optionAbsenceFiliation);
  });

  // On vérifie que le libelle et le texte de l'option sont valorisées dans les inputs
  const inputLibelleOption = screen.getByLabelText(
    "option.libelleOption"
  ) as HTMLInputElement;
  const inputContenuOption = screen.getByLabelText(
    "option.contenu"
  ) as HTMLInputElement;
  const optionAPuce = screen.getByText("Option à puces");

  await waitFor(() => {
    expect(inputLibelleOption.value).toBe("Absence de date");
    expect(inputContenuOption.value).toBe("- la date de l'événement");
    expect(optionAPuce).toBeDefined();
  });

  const boutonsSupprimer = screen.getAllByTitle("Supprimer");
  await waitFor(() => {
    expect(boutonsSupprimer).toBeDefined();
    expect(boutonsSupprimer.length).toEqual(2);
  });

  // Supprimer une option libre au courrier
  await act(async () => {
    fireEvent.click(boutonsSupprimer[0]);
  });
});

test("renders OptionsCourrierForm modifier le contenu d'une option libre", async () => {
  await act(async () => {
    render(<HookOptionsCourrierForm />);
  });

  const optionLibre = screen.getByText("Ajout option -");

  await waitFor(() => {
    expect(optionLibre).toBeDefined();
  });

  // Ajouter une option libre au courrier (Ajout option -)
  await act(async () => {
    fireEvent.dblClick(optionLibre);
  });

  // On vérifie que le libelle et le texte de l'option sont valorisées dans les inputs
  const inputLibelleOption = screen.getByLabelText(
    "option.libelleOption"
  ) as HTMLInputElement;
  const inputContenuOption = screen.getByLabelText(
    "option.contenu"
  ) as HTMLInputElement;
  const iconeDanger = screen.getByTitle("Option non modifié");

  await waitFor(() => {
    expect(inputLibelleOption.value).toBe("Ajout option -");
    expect(inputContenuOption.value).toBe("-");
    expect(iconeDanger).toBeDefined();
  });

  // Changement du contenu de l'option libre
  await act(async () => {
    fireEvent.click(iconeDanger);
    fireEvent.input(inputContenuOption, {
      target: {
        value: "Changement du contenu de l'option libre"
      }
    });
  });
  const iconeValider = screen.getByTitle("Option modifié");

  await waitFor(() => {
    expect(inputContenuOption.value).toBe(
      "Changement du contenu de l'option libre"
    );
    expect(iconeValider).toBeDefined();
  });

  const boutonReinitialiser = screen.getByText("Réinitialiser");

  await act(async () => {
    fireEvent.click(boutonReinitialiser);
  });

  await waitFor(() => {
    expect(inputContenuOption.value).toBe("-");
  });

  const optionLibreBis = screen.getByText("Ajout option -");

  await waitFor(() => {
    expect(optionLibreBis).toBeDefined();
  });

  await act(async () => {
    fireEvent.click(optionLibreBis);
  });
});

test("renders OptionsCourrierForm sélectionner une option, clique sur le bouton plus, doubleclic supprimer", async () => {
  await act(async () => {
    render(<HookOptionsCourrierForm />);
  });

  const optionSelectionner = screen.getByText(
    "Arrondissement d'Alger (événement entre le 24/04/1959 et le 31/12/1962)"
  );

  await waitFor(() => {
    expect(optionSelectionner).toBeDefined();
  });

  // sélectionner une option
  await act(async () => {
    fireEvent.click(optionSelectionner);
  });

  // On vérifie que le libelle et le texte de l'option sont valorisées dans les inputs
  const inputLibelleOption = screen.getByLabelText(
    "option.libelleOption"
  ) as HTMLInputElement;
  const inputContenuOption = screen.getByLabelText(
    "option.contenu"
  ) as HTMLInputElement;

  await waitFor(() => {
    expect(inputLibelleOption.value).toBe(
      "Arrondissement d'Alger (événement entre le 24/04/1959 et le 31/12/1962)"
    );
    expect(inputContenuOption.value).toBe(
      "- l'arrondissement d'Alger où a été enregistré l'acte demandé"
    );
  });

  const boutonsAjouter = screen.getAllByTitle("Ajouter");

  await act(async () => {
    fireEvent.click(boutonsAjouter[0]);
  });

  const boutonsSupprimer = screen.getAllByTitle("Supprimer");

  await waitFor(() => {
    expect(boutonsSupprimer).toBeDefined();
    expect(boutonsSupprimer.length).toEqual(2);
  });

  const optionSelectionnerBis = screen.getByText(
    "Arrondissement d'Alger (événement entre le 24/04/1959 et le 31/12/1962)"
  );

  await act(async () => {
    fireEvent.doubleClick(optionSelectionnerBis);
  });
});

afterAll(() => {
  superagentMock.unset();
});
