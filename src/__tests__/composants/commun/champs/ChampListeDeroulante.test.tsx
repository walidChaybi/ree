import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { Form, Formik } from "formik";
import { describe, expect, it as test, vi } from "vitest";
import ChampListeDeroulante from "../../../../composants/commun/champs/ChampListeDeroulante";

const mockOptions = [
  { cle: "", libelle: "" },
  { cle: "option1", libelle: "Option 1" },
  { cle: "option2", libelle: "Option 2" }
];

describe("ChampListeDeroulante", () => {
  const renderAvecFormulaire = (pendantChargement?: () => void) => {
    return render(
      <Formik
        initialValues={{ champ: "" }}
        onSubmit={vi.fn()}
      >
        <Form>
          <ChampListeDeroulante
            name="champ"
            libelle="Test Label"
            options={mockOptions}
            pendantChangement={pendantChargement}
          />
        </Form>
      </Formik>
    );
  };

  test("Gere le onChange correctement", () => {
    const mockPendantChangement = vi.fn();
    renderAvecFormulaire(mockPendantChangement);

    const selectElement: HTMLSelectElement = screen.getByRole("combobox");

    fireEvent.change(selectElement, { target: { value: "option1" } });

    expect(selectElement.value).toBe("option1");
    expect(mockPendantChangement).toHaveBeenCalled();
  });

  test("Affiche un champ vide par defaut", async () => {
    renderAvecFormulaire();

    const selectElement: HTMLSelectElement = screen.getByRole("combobox");
    expect(selectElement.value).toBe("");
  });

  test("handles onChange correctly", async () => {
    const mockPendantChangement = vi.fn();
    renderAvecFormulaire(mockPendantChangement);

    const selectElement: HTMLSelectElement = screen.getByRole("combobox");

    fireEvent.change(selectElement, { target: { value: "option1" } });

    await waitFor(() => {
      expect(selectElement.value).toBe("option1");
      expect(mockPendantChangement).toHaveBeenCalled();
    });
  });

  test("Affiche un message d'erreur", async () => {
    render(
      <Formik
        initialValues={{ champ: "" }}
        initialErrors={{ champ: "Required field" }}
        initialTouched={{ champ: true }}
        onSubmit={vi.fn()}
      >
        <Form>
          <ChampListeDeroulante
            name="champ"
            libelle="Test Label"
            options={mockOptions}
          />
        </Form>
      </Formik>
    );

    expect(screen.getByText("Required field")).toBeDefined();
    expect(screen.getByLabelText("Test Label").classList.contains("border-rouge")).toBeTruthy();
  });

  test("Applique les bonnes classes aux elements valides et invalides", () => {
    render(
      <Formik
        initialValues={{ champ: "option1" }}
        initialErrors={{ champ: "" }}
        initialTouched={{ champ: true }}
        onSubmit={vi.fn()}
      >
        <Form>
          <ChampListeDeroulante
            name="champ"
            libelle="Test Label"
            options={mockOptions}
          />
        </Form>
      </Formik>
    );

    const selectElement = screen.getByRole("combobox");
    expect(selectElement.classList.contains("border-gris")).toBeTruthy();
  });
});
