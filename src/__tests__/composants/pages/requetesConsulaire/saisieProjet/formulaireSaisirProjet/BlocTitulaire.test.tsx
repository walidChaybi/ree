import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Formik } from "formik";
import { describe, expect, test } from "vitest";
import BlocTitulaire from "../../../../../../composants/pages/requetesConsulaire/saisieProjet/formulaireSaisieProjet/BlocTitulaire";

describe("SaisirProjet - BlocTitulaire", () => {
  const renderComponent = (name = "test", libelle = "Date") => {
    return render(
      <Formik
        initialValues={{ titulaire: { nomNaissance: "Roberto Dos Santos", prenomsChemin: { prenom1: "Decastillo" }, secable: false } }}
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

    const inputNomRetenuOEC: HTMLInputElement = screen.getByRole("textbox", { name: /titulaire.nomRetenuOEC/i });
    await userEvent.type(inputNomRetenuOEC, "Roberto Dos Santos");
    fireEvent.blur(inputNomRetenuOEC);
    await waitFor(() => {
      expect(inputNomRetenuOEC.value).toBe("Roberto Dos Santos");
    });
  });

  test("Vérifier la navigation à la tabulation", async () => {
    renderComponent();
    const inputNomActeEtranger: HTMLInputElement = screen.getByLabelText("Nom sur l'acte étranger");
    const inputNomSouhait: HTMLInputElement = screen.getByLabelText("Nom souhaité");
    const inputNomRetenuOEC: HTMLInputElement = screen.getByRole("textbox", { name: /titulaire.nomRetenuOEC/i });
    const checkboxSecable = screen.getAllByRole("checkbox")[0] as HTMLInputElement;
    const inputPrenom: HTMLInputElement = screen.getByRole("textbox", { name: /titulaire.prenomsChemin.prenom1/i });
    const bouttonAjoutPrenom = screen.getByTitle(/Ajouter un prénom/i);

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
    const selectPreposition = screen.getByLabelText("Préposition");

    await userEvent.tab();
    expect(document.activeElement).toBe(inputNomActeEtranger);

    expect(inputNomSouhait.disabled).toBeTruthy();

    await userEvent.tab();
    expect(document.activeElement).toStrictEqual(inputNomRetenuOEC);
    await userEvent.type(inputNomRetenuOEC, "Xi phun bin");

    await userEvent.tab();

    expect(checkboxSecable.checked).toBeFalsy();

    await userEvent.click(checkboxSecable);

    await waitFor(() => {
      expect(checkboxSecable.checked).toBeTruthy();
      expect(document.activeElement).toStrictEqual(checkboxSecable);
    });

    await userEvent.tab();
    const inputNomPartie1: HTMLInputElement = screen.getByRole("textbox", { name: /titulaire.nomSecable.nomPartie1/i });
    const inputNomPartie2: HTMLInputElement = screen.getByRole("textbox", { name: /titulaire.nomSecable.nomPartie2/i });
    const boutonDéplacerVocable = screen.getByTitle("Déplacer le premier vocable");

    await waitFor(() => {
      expect(document.activeElement).toStrictEqual(inputNomPartie1);
    });

    await userEvent.tab();

    await waitFor(() => {
      expect(document.activeElement).toStrictEqual(inputNomPartie2);
    });

    await userEvent.tab();
    await waitFor(() => {
      expect(document.activeElement).toStrictEqual(boutonDéplacerVocable);
    });

    await userEvent.tab();
    await waitFor(() => {
      expect(document.activeElement).toStrictEqual(inputPrenom);
    });

    await userEvent.tab();
    await waitFor(() => {
      expect(document.activeElement).toStrictEqual(bouttonAjoutPrenom);
    });

    /* Radio boutton genre */
    await userEvent.tab();
    await waitFor(() => {
      expect(document.activeElement).toStrictEqual(inputRadioMasculin);
    });

    await userEvent.tab();
    await waitFor(() => {
      expect(document.activeElement).toStrictEqual(jourInput);
    });

    await userEvent.tab();
    await waitFor(() => {
      expect(document.activeElement).toStrictEqual(moisInput);
    });

    await userEvent.tab();
    await waitFor(() => {
      expect(document.activeElement).toStrictEqual(anneeInput);
    });

    await userEvent.tab();
    await waitFor(() => {
      expect(document.activeElement).toStrictEqual(heureInput);
    });

    await userEvent.tab();
    await waitFor(() => {
      expect(document.activeElement).toStrictEqual(minutesInput);
    });

    await userEvent.tab();
    await waitFor(() => {
      expect(document.activeElement).toStrictEqual(selectPreposition);
    });

    await userEvent.tab();
    await waitFor(() => {
      expect(document.activeElement).toStrictEqual(inputVille);
    });

    await userEvent.tab();
    await waitFor(() => {
      expect(document.activeElement).toStrictEqual(inputEtat);
    });

    await userEvent.tab();
    await waitFor(() => {
      expect(document.activeElement).toStrictEqual(inputPays);
    });

    await userEvent.tab();
    await waitFor(() => {
      expect(document.activeElement).toStrictEqual(inputAdresse);
    });
  });
});
