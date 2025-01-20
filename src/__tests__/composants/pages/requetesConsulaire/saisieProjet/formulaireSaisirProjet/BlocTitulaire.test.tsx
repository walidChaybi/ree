import { act, fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Formik } from "formik";
import { describe, expect, test } from "vitest";
import BlocTitulaire from "../../../../../../composants/pages/requetesConsulaire/saisieProjet/formulaireSaisirProjet/BlocTitulaire";

describe("SaisirProjet - BlocTitulaire", () => {
  const renderComponent = (name = "test", libelle = "Date") => {
    return render(
      <Formik
        initialValues={{ titulaire: { nom: "Roberto", prenom: "Decastillo", secable: false } }}
        onSubmit={() => {}}
      >
        <BlocTitulaire />
      </Formik>
    );
  };

  test("render le composant correctement", () => {
    renderComponent();
    expect(screen.getByLabelText("Nom sur l'acte étranger")).toBeDefined();
    expect(screen.getByLabelText("Nom retenu par l'OEC")).toBeDefined();
    expect(screen.getByLabelText("Nom souhaité")).toBeDefined();
    expect(screen.getByText("Sexe")).toBeDefined();
    expect(screen.getByLabelText("Nom")).toBeDefined();
    expect(screen.getByLabelText("Prénom")).toBeDefined();
    expect(screen.getByLabelText("Date de naissance")).toBeDefined();
    expect(screen.getByText("Lieu de naissance")).toBeDefined();
    expect(screen.getByLabelText("Ville")).toBeDefined();
    expect(screen.getByLabelText("Etat, canton, province")).toBeDefined();
    expect(screen.getByLabelText("Pays")).toBeDefined();
    expect(screen.getByLabelText("Adresse")).toBeDefined();
  });
  test("Vérifier valeur des champs", async () => {
    renderComponent();
    const inputNom: HTMLInputElement = screen.getByLabelText("Nom");
    await act(() => fireEvent.change(inputNom, { target: { value: "Roberto" } }));
    await act(() => fireEvent.blur(inputNom));
    expect(inputNom.value).toBe("Roberto");
  });
  test("Vérifier la navigation à la tabulation", async () => {
    renderComponent();
    const inputNomActeEtranger: HTMLInputElement = screen.getByLabelText("Nom sur l'acte étranger");
    const inputNomOEC: HTMLInputElement = screen.getByLabelText("Nom retenu par l'OEC");
    const inputNomSouhait: HTMLInputElement = screen.getByLabelText("Nom souhaité");
    const inputNom: HTMLInputElement = screen.getByLabelText("Nom");
    const inputPrenom: HTMLInputElement = screen.getByLabelText("Prénom");
    const bouttonAjoutPrenom = screen.getByTitle("Ajouter un prénom");
    const jourInput: HTMLInputElement = screen.getByPlaceholderText("JJ");
    const moisInput: HTMLInputElement = screen.getByPlaceholderText("MM");
    const anneeInput = screen.getByPlaceholderText("AAAA");
    const heureInput: HTMLInputElement = screen.getByPlaceholderText("HH");
    const minutesInput: HTMLInputElement = screen.getByPlaceholderText("MIN");
    const inputVille: HTMLInputElement = screen.getByLabelText("Ville");
    const inputEtat: HTMLInputElement = screen.getByLabelText("Etat, canton, province");
    const inputPays: HTMLInputElement = screen.getByLabelText("Pays");
    const inputAdresse: HTMLInputElement = screen.getByLabelText("Adresse");
    const inputRadioMasculin: HTMLInputElement = screen.getByLabelText("Masculin");
    await userEvent.tab();
    expect(document.activeElement).toBe(inputNomActeEtranger);

    await userEvent.tab();
    expect(document.activeElement).toStrictEqual(inputNomOEC);

    await userEvent.tab();
    expect(document.activeElement).toStrictEqual(inputNomSouhait);

    /* Radio boutton genre */
    await userEvent.tab();
    expect(document.activeElement).toStrictEqual(inputRadioMasculin);
    await userEvent.tab();
    expect(document.activeElement).toStrictEqual(inputNom);

    await userEvent.tab();
    expect(document.activeElement).toStrictEqual(inputPrenom);

    await userEvent.tab();
    expect(document.activeElement).toStrictEqual(bouttonAjoutPrenom);

    await userEvent.tab();
    expect(document.activeElement).toStrictEqual(jourInput);

    await userEvent.tab();
    expect(document.activeElement).toStrictEqual(moisInput);

    await userEvent.tab();
    expect(document.activeElement).toStrictEqual(anneeInput);

    await userEvent.tab();
    expect(document.activeElement).toStrictEqual(heureInput);

    await userEvent.tab();
    expect(document.activeElement).toStrictEqual(minutesInput);

    await userEvent.tab();
    expect(document.activeElement).toStrictEqual(inputVille);

    await userEvent.tab();
    expect(document.activeElement).toStrictEqual(inputEtat);

    await userEvent.tab();
    expect(document.activeElement).toStrictEqual(inputPays);

    await userEvent.tab();
    expect(document.activeElement).toStrictEqual(inputAdresse);
  });
});
