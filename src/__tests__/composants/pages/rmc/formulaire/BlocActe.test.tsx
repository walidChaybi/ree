import { RMCActeInscriptionForm } from "@model/form/rmc/RMCActeInscriptionForm";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Formik } from "formik";
import { describe, expect, test } from "vitest";
import BlocActe from "../../../../../composants/pages/rmc/formulaire/BlocActe";

describe("RMC - BlocActe", () => {
  const renderComponent = () => {
    const valeursInitiales = RMCActeInscriptionForm.valeursInitiales();
    const schemaValidation = RMCActeInscriptionForm.schemaValidation();

    return render(
      <Formik
        initialValues={valeursInitiales}
        schemaValidation={schemaValidation}
        onSubmit={() => {}}
      >
        <BlocActe />
      </Formik>
    );
  };

  test("render le composant correctement", () => {
    renderComponent();

    expect(screen.getByLabelText("Famille de registre")).toBeDefined();
    expect(screen.getByLabelText("Nature de l'acte")).toBeDefined();
    expect(screen.getByLabelText("Type / Poste / Commune / Pays")).toBeDefined();
    expect(screen.getByLabelText("Année")).toBeDefined();
    expect(screen.getByLabelText("Registre (support)")).toBeDefined();
    expect(screen.getByLabelText("N° d'acte")).toBeDefined();
    expect(screen.getByLabelText("Et les actes suivants du registre")).toBeDefined();
  });

  test("Vérifier valeur des champs", async () => {
    renderComponent();

    // récupération des champs du formulaire
    const selectFamilleDeRegistre: HTMLSelectElement = screen.getByRole("combobox", {
      name: /Famille de registre/i
    });

    const selectNatureActe: HTMLSelectElement = screen.getByRole("combobox", {
      name: /Nature de l'acte/i
    });

    const inputAnnee: HTMLInputElement = screen.getByRole("textbox", { name: /annee/i });
    const inputSupportUn: HTMLInputElement = screen.getByLabelText("registreRepertoire.registre.registreSupport.supportUn");
    const inputSupportDeux: HTMLInputElement = screen.getByLabelText("registreRepertoire.registre.registreSupport.supportDeux");
    const inputNumeroActe: HTMLInputElement = screen.getByLabelText("registreRepertoire.registre.numeroActe.numeroActeOuOrdre");
    const inputNumeroBisTer: HTMLInputElement = screen.getByLabelText("registreRepertoire.registre.numeroActe.numeroBisTer");
    const checkBoxActesSuivants: HTMLInputElement = screen.getByRole("checkbox", { name: /actes suivants/i });

    // changement des valeurs
    fireEvent.change(selectFamilleDeRegistre, { target: { value: "ACQ" } });
    fireEvent.change(selectNatureActe, { target: { value: "NAISSANCE" } });

    await userEvent.type(inputAnnee, "2001");
    fireEvent.blur(inputAnnee);

    await userEvent.type(inputSupportUn, "4284");
    fireEvent.blur(inputSupportUn);

    await userEvent.type(inputSupportDeux, "5349");
    fireEvent.blur(inputSupportDeux);

    await userEvent.type(inputNumeroActe, "6525");
    fireEvent.blur(inputNumeroActe);

    await userEvent.type(inputNumeroBisTer, "7959");
    fireEvent.blur(inputNumeroBisTer);

    await userEvent.click(checkBoxActesSuivants);
    fireEvent.blur(checkBoxActesSuivants);

    // vérification des résultats
    await waitFor(() => {
      expect(selectFamilleDeRegistre.value).toBe("ACQ");
      expect(selectNatureActe.value).toBe("NAISSANCE");
      expect(inputAnnee.value).toBe("2001");
      expect(inputSupportUn.value).toBe("4284");
      expect(inputSupportDeux.value).toBe("5349");
      expect(inputNumeroActe.value).toBe("6525");
      expect(inputNumeroBisTer.value).toBe("7959");
      expect(checkBoxActesSuivants.value).toBe("true");
    });
  });

  test("RG - Si la famille de registre sélectionnée est CSL, le champ support 2 est désactivé", async () => {
    renderComponent();

    const selectFamilleDeRegistre: HTMLSelectElement = screen.getByRole("combobox", {
      name: /Famille de registre/i
    });

    const inputSupportDeux: HTMLInputElement = screen.getByLabelText("registreRepertoire.registre.registreSupport.supportDeux");

    fireEvent.change(selectFamilleDeRegistre, { target: { value: "CSL" } });

    expect(selectFamilleDeRegistre.value).toBe("CSL");
    expect(inputSupportDeux.disabled).toBe(true);
  });

  test("RG - Si la famille de registre sélectionnée est DEP, le champ support 2 est désactivé", async () => {
    renderComponent();

    const selectFamilleDeRegistre: HTMLSelectElement = screen.getByRole("combobox", {
      name: /Famille de registre/i
    });

    const inputSupportDeux: HTMLInputElement = screen.getByLabelText("registreRepertoire.registre.registreSupport.supportDeux");

    fireEvent.change(selectFamilleDeRegistre, { target: { value: "DEP" } });

    expect(selectFamilleDeRegistre.value).toBe("DEP");
    expect(inputSupportDeux.disabled).toBe(true);
  });

  test("RG - Si la famille de registre sélectionnée est AR2, le champ support 2 est désactivé", async () => {
    renderComponent();

    const selectFamilleDeRegistre: HTMLSelectElement = screen.getByRole("combobox", {
      name: /Famille de registre/i
    });

    const inputSupportDeux: HTMLInputElement = screen.getByLabelText("registreRepertoire.registre.registreSupport.supportDeux");

    fireEvent.change(selectFamilleDeRegistre, { target: { value: "AR2" } });

    expect(selectFamilleDeRegistre.value).toBe("AR2");
    expect(inputSupportDeux.disabled).toBe(true);
  });

  test("RG - Si la famille de registre sélectionnée est AR3, le champ support 2 est désactivé", async () => {
    renderComponent();

    const selectFamilleDeRegistre: HTMLSelectElement = screen.getByRole("combobox", {
      name: /Famille de registre/i
    });

    const inputSupportDeux: HTMLInputElement = screen.getByLabelText("registreRepertoire.registre.registreSupport.supportDeux");

    fireEvent.change(selectFamilleDeRegistre, { target: { value: "AR3" } });

    expect(selectFamilleDeRegistre.value).toBe("AR3");
    expect(inputSupportDeux.disabled).toBe(true);
  });

  test("RG - Si la famille de registre sélectionnée est JUG, le champ support 2 est désactivé", async () => {
    renderComponent();

    const selectFamilleDeRegistre: HTMLSelectElement = screen.getByRole("combobox", {
      name: /Famille de registre/i
    });

    const inputSupportDeux: HTMLInputElement = screen.getByLabelText("registreRepertoire.registre.registreSupport.supportDeux");

    fireEvent.change(selectFamilleDeRegistre, { target: { value: "JUG" } });

    expect(selectFamilleDeRegistre.value).toBe("JUG");
    expect(inputSupportDeux.disabled).toBe(true);
  });

  test("RG - Si la famille de registre sélectionnée est MAR, le champ support 2 est désactivé", async () => {
    renderComponent();

    const selectFamilleDeRegistre: HTMLSelectElement = screen.getByRole("combobox", {
      name: /Famille de registre/i
    });

    const inputSupportDeux: HTMLInputElement = screen.getByLabelText("registreRepertoire.registre.registreSupport.supportDeux");

    fireEvent.change(selectFamilleDeRegistre, { target: { value: "MAR" } });

    expect(selectFamilleDeRegistre.value).toBe("MAR");
    expect(inputSupportDeux.disabled).toBe(true);
  });

  test("RG - Si la famille de registre sélectionnée est OP2, les champs pocopa, année et support 2 sont désactivés", async () => {
    renderComponent();

    const selectFamilleDeRegistre: HTMLSelectElement = screen.getByRole("combobox", {
      name: /Famille de registre/i
    });

    const inputAnnee: HTMLInputElement = screen.getByRole("textbox", { name: /annee/i });
    const inputPocopa: HTMLInputElement = screen.getByRole("combobox", { name: /type/i });
    const inputSupportDeux: HTMLInputElement = screen.getByLabelText("registreRepertoire.registre.registreSupport.supportDeux");

    fireEvent.change(selectFamilleDeRegistre, { target: { value: "OP2" } });

    expect(selectFamilleDeRegistre.value).toBe("OP2");
    expect(inputAnnee.disabled).toBe(true);
    expect(inputPocopa.disabled).toBe(true);
    expect(inputSupportDeux.disabled).toBe(true);
  });

  test("RG - Si la famille de registre sélectionnée est OP3, les champs pocopa, année et support 2 sont désactivés", async () => {
    renderComponent();

    const selectFamilleDeRegistre: HTMLSelectElement = screen.getByRole("combobox", {
      name: /Famille de registre/i
    });

    const inputAnnee: HTMLInputElement = screen.getByRole("textbox", { name: /annee/i });
    const inputPocopa: HTMLInputElement = screen.getByRole("combobox", { name: /type/i });
    const inputSupportDeux: HTMLInputElement = screen.getByLabelText("registreRepertoire.registre.registreSupport.supportDeux");

    fireEvent.change(selectFamilleDeRegistre, { target: { value: "OP3" } });

    expect(selectFamilleDeRegistre.value).toBe("OP3");
    expect(inputAnnee.disabled).toBe(true);
    expect(inputPocopa.disabled).toBe(true);
    expect(inputSupportDeux.disabled).toBe(true);
  });

  test("RG - Si la famille de registre sélectionnée est CPN, les champs pocopa, support 1, support 2, N°bis et nature sont désactivés", async () => {
    renderComponent();

    const selectFamilleDeRegistre: HTMLSelectElement = screen.getByRole("combobox", {
      name: /Famille de registre/i
    });

    const selectNatureActe: HTMLSelectElement = screen.getByRole("combobox", {
      name: /Nature de l'acte/i
    });

    const inputPocopa: HTMLInputElement = screen.getByRole("combobox", { name: /type/i });
    const inputSupportUn: HTMLInputElement = screen.getByLabelText("registreRepertoire.registre.registreSupport.supportUn");
    const inputSupportDeux: HTMLInputElement = screen.getByLabelText("registreRepertoire.registre.registreSupport.supportDeux");
    const inputNumeroBis: HTMLInputElement = screen.getByLabelText("registreRepertoire.registre.numeroActe.numeroBisTer");

    fireEvent.change(selectFamilleDeRegistre, { target: { value: "CPN" } });

    expect(selectFamilleDeRegistre.value).toBe("CPN");
    expect(inputPocopa.disabled).toBe(true);
    expect(inputSupportUn.disabled).toBe(true);
    expect(inputSupportDeux.disabled).toBe(true);
    expect(inputNumeroBis.disabled).toBe(true);
    expect(selectNatureActe.disabled).toBe(true);
  });
});
