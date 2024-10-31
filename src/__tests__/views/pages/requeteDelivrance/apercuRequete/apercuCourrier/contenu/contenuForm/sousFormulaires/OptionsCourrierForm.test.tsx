import { OPTION } from "@composant/formulaire/ConstantesNomsForm";
import requeteDelivrance from "@mock/data/requeteDelivrance";
import { OptionCourrier } from "@model/requete/IOptionCourrier";
import { DocumentDelivrance } from "@model/requete/enum/DocumentDelivrance";
import OptionsCourrierForm, {
  OptionCourrierFormDefaultValues,
  OptionsCourrierSubFormProps,
  ValidationSchemaOptionCourrier
} from "@pages/requeteDelivrance/apercuRequete/apercuCourrier/contenu/contenuForm/sousFormulaires/OptionsCourrierForm";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { Form, Formik, FormikProps, FormikValues } from "formik";
import React, { useState } from "react";
import { expect, test, vi } from "vitest";

const HookOptionsCourrierForm: React.FC = () => {
  const [optionsChoisies, setOptionsChoisies] = useState<OptionCourrier[]>([]);
  const setCheckOptions = () => {};
  const optionsCourrierFormProps: OptionsCourrierSubFormProps = {
    nom: OPTION,
    documentDelivranceChoisi: DocumentDelivrance.getDocumentDelivrance("b36f9a2c-64fa-42bb-a3f6-adca6fec28f2"), //INFORMATION_DIVERSES_MANQUANTE (Courrier 117)
    titre: "Options",
    requete: requeteDelivrance,
    optionsChoisies: optionsChoisies,
    setOptionsChoisies: setOptionsChoisies,
    setCheckOptions: setCheckOptions,
    formik: {} as FormikProps<FormikValues>
  };

  return (
    <Formik
      initialValues={OptionCourrierFormDefaultValues}
      validationSchema={ValidationSchemaOptionCourrier}
      onSubmit={vi.fn()}
    >
      <Form>
        <OptionsCourrierForm {...optionsCourrierFormProps} />
      </Form>
    </Formik>
  );
};

test("renders OptionsCourrierForm DoubleClick pour ajouter, bouton moins pour supprimer", async () => {
  // "await" obligatoire pour attendre que le composant soit rendu avec les options
  render(<HookOptionsCourrierForm />);

  await waitFor(() => {
    expect(screen.getByText("Ajouter un paragraphe")).toBeDefined();
    expect(screen.getByText("Option(s) disponible(s)")).toBeDefined();
    expect(screen.getByText("Option(s) choisie(s)")).toBeDefined();
    // Libellés des options dans le tableau
    expect(screen.getByText("Conciergeries administratives")).toBeDefined();
    expect(screen.getByText("Absence de nom ou de prénom(s)")).toBeDefined();
    expect(screen.getByText("Absence de date")).toBeDefined();
  });

  // Ajouter une option à tiret au courrier (Absence de date)
  fireEvent.dblClick(screen.getByText("Absence de date"));

  // On vérifie que le libelle et le texte de l'option sont valorisées dans les inputs
  const inputLibelleOption: HTMLInputElement = screen.getByLabelText("option.libelleOption");
  const inputContenuOption: HTMLInputElement = screen.getByLabelText("option.contenu");
  const optionATiret = screen.getByText("Option à tiret");

  await waitFor(() => {
    expect(inputLibelleOption.value).toBe("Absence de date");
    expect(inputContenuOption.value).toBe("- la date de l'événement");
    expect(optionATiret).toBeDefined();
  });

  const boutonsSupprimer = screen.getAllByTitle("Supprimer");
  await waitFor(() => {
    expect(boutonsSupprimer).toBeDefined();
    expect(boutonsSupprimer.length).toEqual(2);
  });

  // Supprimer une option libre au courrier
  fireEvent.click(boutonsSupprimer[0]);
});

test("renders OptionsCourrierForm modifier le contenu d'une option libre", async () => {
  render(<HookOptionsCourrierForm />);

  await waitFor(() => {
    expect(screen.getByText("Ajout option -")).toBeDefined();
  });

  // Ajouter une option libre au courrier (Ajout option -)
  fireEvent.dblClick(screen.getByText("Ajout option -"));

  // On vérifie que le libelle et le texte de l'option sont valorisées dans les inputs
  const inputLibelleOption: HTMLInputElement = screen.getByLabelText("option.libelleOption");
  const inputContenuOption: HTMLInputElement = screen.getByLabelText("option.contenu");
  const iconeDanger = screen.getByTitle("Option non modifiée");

  await waitFor(() => {
    expect(inputLibelleOption.value).toBe("Ajout option -");
    expect(inputContenuOption.value).toBe("-");
    expect(iconeDanger).toBeDefined();
  });

  // Changement du contenu de l'option libre
  fireEvent.click(iconeDanger);
  fireEvent.input(inputContenuOption, {
    target: {
      value: "Changement du contenu de l'option libre"
    }
  });

  await waitFor(() => {
    expect(inputContenuOption.value).toBe("Changement du contenu de l'option libre");
    expect(screen.getByTitle("Option modifiée")).toBeDefined();
  });

  const boutonReinitialiser = screen.getByTitle("Rappel du modèle de l'option");

  fireEvent.click(boutonReinitialiser);

  await waitFor(() => {
    expect(inputContenuOption.value).toBe("-");
  });

  const optionLibreBis = screen.getByText("Ajout option -");

  await waitFor(() => {
    expect(optionLibreBis).toBeDefined();
  });

  fireEvent.click(optionLibreBis);
});

test("renders OptionsCourrierForm sélectionner une option, clique sur le bouton plus, doubleclic supprimer", async () => {
  render(<HookOptionsCourrierForm />);

  await waitFor(() => {
    expect(screen.getByText("Arrondissement d'Alger (événement entre le 24/04/1959 et le 31/12/1962)")).toBeDefined();
  });

  // sélectionner une option
  fireEvent.click(screen.getByText("Arrondissement d'Alger (événement entre le 24/04/1959 et le 31/12/1962)"));

  // On vérifie que le libelle et le texte de l'option sont valorisées dans les inputs
  const inputLibelleOption: HTMLInputElement = screen.getByLabelText("option.libelleOption");
  const inputContenuOption: HTMLInputElement = screen.getByLabelText("option.contenu");

  await waitFor(() => {
    expect(inputLibelleOption.value).toBe("Arrondissement d'Alger (événement entre le 24/04/1959 et le 31/12/1962)");
    expect(inputContenuOption.value).toBe("- l'arrondissement d'Alger où a été enregistré l'acte demandé");
  });

  fireEvent.click(screen.getAllByTitle("Ajouter")[0]);

  const boutonsSupprimer = screen.getAllByTitle("Supprimer");

  await waitFor(() => {
    expect(boutonsSupprimer).toBeDefined();
    expect(boutonsSupprimer.length).toEqual(2);
  });

  const optionSelectionnerBis = screen.getByText("Arrondissement d'Alger (événement entre le 24/04/1959 et le 31/12/1962)");

  fireEvent.doubleClick(optionSelectionnerBis);
});
