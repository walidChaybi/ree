import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { Formik } from "formik";
import { describe, expect, test } from "vitest";
import BlocParents from "../../../../../../composants/pages/requetesConsulaire/saisieProjet/formulaireSaisirProjet/BlocParents";

describe("BlocParents", () => {
  const renderComponent = () => {
    return render(
      <Formik
        initialValues={{
          parent1: {
            sexe: "Masculin",
            nom: { nom: "", secable: false, nomPartie1: "", nomPartie2: "" },
            prenoms: {},
            dateNaissance: { jour: "", mois: "", annee: "" },
            lieuNaissance: { type: "" },
            sansProfession: false,
            domicile: { type: "" },
            useAge: false,
            age: "",
            profession: ""
          },
          parent2: {
            sexe: "Masculin",
            nom: { nom: "", secable: false, nomPartie1: "", nomPartie2: "" },
            prenoms: {},
            dateNaissance: { jour: "", mois: "", annee: "" },
            lieuNaissance: { type: "" },
            sansProfession: false,
            domicile: { type: "" },
            useAge: false,
            age: "",
            profession: ""
          },
          domicileCommun: false
        }}
        onSubmit={() => {}}
        enableReinitialize={true}
      >
        <BlocParents />
      </Formik>
    );
  };

  test("doit afficher les formulaires des deux parents", () => {
    renderComponent();
    expect(screen.getByText("Parent 1")).toBeDefined();
    expect(screen.getByText("Parent 2")).toBeDefined();
  });

  test("doit gérer la sélection du sexe", async () => {
    renderComponent();

    const femininRadio = screen.getAllByLabelText("Féminin")[0] as HTMLInputElement;
    fireEvent.click(femininRadio);

    await waitFor(() => expect(femininRadio.checked).toBe(true));
  });

  test("doit gérer la saisie du nom", async () => {
    renderComponent();

    const nameInput = screen.getAllByLabelText("Nom")[0] as HTMLInputElement;

    fireEvent.change(nameInput, { target: { value: "Dupont" } });

    await waitFor(() => expect(nameInput.value).toBe("Dupont"));
  });

  test("doit gérer la saisie de la date de naissance", async () => {
    renderComponent();
    const dayInput = screen.getAllByPlaceholderText("JJ")[0] as HTMLInputElement;
    const monthInput = screen.getAllByPlaceholderText("MM")[0] as HTMLInputElement;
    const yearInput = screen.getAllByPlaceholderText("AAAA")[0] as HTMLInputElement;

    fireEvent.change(dayInput, { target: { value: "15" } });
    fireEvent.change(monthInput, { target: { value: "06" } });
    fireEvent.change(yearInput, { target: { value: "1980" } });

    await waitFor(() => {
      expect(dayInput.value).toBe("15");
      expect(monthInput.value).toBe("06");
      expect(yearInput.value).toBe("1980");
    });
  });

  test("doit gérer la case à cocher 'domicile commun'", async () => {
    renderComponent();

    const checkbox: HTMLInputElement = screen.getByLabelText("Domicile commun avec parent 1");
    fireEvent.click(checkbox);

    await waitFor(() => expect(checkbox.checked).toBe(true));
  });

  test("doit masquer les champs de domicile quand 'domicile commun' est coché", async () => {
    renderComponent();

    const checkbox: HTMLInputElement = screen.getByLabelText("Domicile commun avec parent 1");

    const franceRadios = screen.getAllByLabelText("France")[0];
    fireEvent.click(franceRadios);
    fireEvent.click(checkbox);

    await waitFor(() => {
      const parent2FranceOption = screen.queryByLabelText("France", { selector: 'input[name="parent2.domicile.type"]' });
      expect(parent2FranceOption).toBeNull();
    });
  });

  test("doit gérer les lieux étrangers", async () => {
    renderComponent();
    const typeRadio = screen.getAllByLabelText("Étranger")[0];
    fireEvent.click(typeRadio);

    await waitFor(() => {
      expect(screen.getByLabelText("Pays")).toBeDefined();
      expect(screen.getByLabelText("État, canton, province")).toBeDefined();
    });
  });

  test("doit gérer la case à cocher 'sans profession'", async () => {
    renderComponent();

    const checkbox = screen.getAllByLabelText("Sans profession")[0];
    const professionInput: HTMLInputElement = screen.getByTestId("parent1-profession");

    fireEvent.change(professionInput, { target: { value: "Ingénieur" } });

    fireEvent.click(checkbox);

    await waitFor(() => expect(professionInput.disabled).toBe(true));
  });
});
