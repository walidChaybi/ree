import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Formik } from "formik";
import { describe, expect, test } from "vitest";
import BlocTitulaire from "../../../../../../composants/pages/requetesConsulaire/saisieProjet/formulaireSaisieProjet/BlocTitulaire";
/** TODO: Réparation des TU le Lundi 31 Mars @ Adrien_Bonvin */

describe.skip("SaisirProjet - BlocTitulaire", () => {
  const renderComponent = (name = "test", libelle = "Date") => {
    return render(
      <Formik
        initialValues={{ titulaire: { nomNaissance: "Roberto", prenomsChemin: { prenom1: "Decastillo" }, secable: false } }}
        onSubmit={() => {}}
      >
        <BlocTitulaire />
      </Formik>
    );
  };

  test("render le composant correctement", () => {
    renderComponent();
    expect(screen.getByLabelText("Nom sur l'acte étranger")).toBeDefined();
    expect(screen.getByLabelText("Nom retenu par l'OEC*")).toBeDefined();
    expect(screen.getByLabelText("Nom souhaité")).toBeDefined();
    expect(screen.getByText("Sexe")).toBeDefined();
    expect(screen.getByLabelText("Prénom")).toBeDefined();
    expect(screen.getByLabelText("Date de naissance(année)*")).toBeDefined();
    expect(screen.getByText("Lieu de naissance")).toBeDefined();
    expect(screen.getByLabelText("Ville")).toBeDefined();
    expect(screen.getByLabelText("État, canton, province")).toBeDefined();
    expect(screen.getByLabelText("Pays")).toBeDefined();
    expect(screen.getByLabelText("Adresse")).toBeDefined();
  });

  test("Vérifier valeur des champs", async () => {
    renderComponent();

    await waitFor(() => {
      const inputNom: HTMLInputElement = screen.getByLabelText("Nom sur l'acte étranger");
      act(() => fireEvent.change(inputNom, { target: { value: "Roberto" } }));
      act(() => fireEvent.blur(inputNom));
      expect(inputNom.value).toBe("Roberto");
    });
  });

  test.skip("Vérifier la navigation à la tabulation", async () => {
    renderComponent();
    const inputNomActeEtranger: HTMLInputElement = screen.getByLabelText("Nom sur l'acte étranger");
    const inputNomSouhait: HTMLInputElement = screen.getByLabelText("Nom souhaité");
    const inputNomRetenuOEC: HTMLInputElement = screen.getByLabelText("Nom retenu par l'OEC*");
    const checkboxSecable = screen.getAllByRole("checkbox")[0] as HTMLInputElement;
    const inputPrenom: HTMLInputElement = screen.getByLabelText("Prénom");
    const bouttonAjoutPrenom = screen.getByTitle("Ajouter un prénom");
    const jourInput: HTMLInputElement = screen.getByPlaceholderText("JJ");
    const moisInput: HTMLInputElement = screen.getByPlaceholderText("MM");
    const anneeInput = screen.getByPlaceholderText("AAAA");
    const heureInput: HTMLInputElement = screen.getByPlaceholderText("HH");
    const minutesInput: HTMLInputElement = screen.getByPlaceholderText("MN");
    const inputVille: HTMLInputElement = screen.getByLabelText("Ville");
    const inputEtat: HTMLInputElement = screen.getByLabelText("État, canton, province");
    const inputPays: HTMLInputElement = screen.getByLabelText("Pays");
    const inputAdresse: HTMLInputElement = screen.getByLabelText("Adresse");
    const inputRadioMasculin: HTMLInputElement = screen.getByLabelText("Masculin");
    const inputRadioFeminin: HTMLInputElement = screen.getByLabelText("Féminin");
    await userEvent.tab();
    expect(document.activeElement).toBe(inputNomActeEtranger);

    expect(inputNomSouhait.disabled).toBeTruthy();

    await userEvent.tab();
    expect(document.activeElement).toStrictEqual(inputNomRetenuOEC);

    await userEvent.tab();

    expect(checkboxSecable.checked).toBeFalsy();

    fireEvent.keyPress(checkboxSecable, {
      key: "Escape",
      code: "Escape",
      keyCode: 27,
      charCode: 27
    });

    await waitFor(() => {
      expect(checkboxSecable.checked).toBeTruthy();
      userEvent.tab();
      expect(document.activeElement).toStrictEqual(inputPrenom);

      userEvent.tab();
      expect(document.activeElement).toStrictEqual(bouttonAjoutPrenom);

      /* Radio boutton genre */
      userEvent.tab();
      expect(document.activeElement).toStrictEqual(inputRadioMasculin);
      fireEvent.keyPress(inputRadioMasculin, {
        key: "ArrowRight",
        code: "ArrowRight",
        keyCode: 39,
        charCode: 39
      });
      expect(document.activeElement).toStrictEqual(inputRadioFeminin);

      userEvent.tab();
      expect(document.activeElement).toStrictEqual(jourInput);

      userEvent.tab();
      expect(document.activeElement).toStrictEqual(moisInput);

      userEvent.tab();
      expect(document.activeElement).toStrictEqual(anneeInput);

      userEvent.tab();
      expect(document.activeElement).toStrictEqual(heureInput);

      userEvent.tab();
      expect(document.activeElement).toStrictEqual(minutesInput);

      userEvent.tab();
      expect(document.activeElement).toStrictEqual(inputVille);

      userEvent.tab();
      expect(document.activeElement).toStrictEqual(inputEtat);

      userEvent.tab();
      expect(document.activeElement).toStrictEqual(inputPays);

      userEvent.tab();
      expect(document.activeElement).toStrictEqual(inputAdresse);
    });
  });
});
