import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Mock, beforeEach, describe, expect, test, vi } from "vitest";

import * as Formik from "formik";
import { BloqueurNavigationSaisieProjet } from "../../../../../composants/pages/requetesConsulaire/saisieProjet/formulaireSaisieProjet/BloqueurNavigationSaisieProjet";

import * as ReactRouter from "react-router";

vi.mock("react-router", async () => {
  const mod = await vi.importActual<typeof import("react-router")>("react-router");
  return {
    ...mod,
    useBlocker: vi.fn(),
    useBeforeUnload: vi.fn()
  };
});

vi.mock("formik", async () => {
  const actual = await vi.importActual("formik");
  return {
    ...actual,
    useFormikContext: vi.fn()
  };
});

describe("GestionnaireNavigationFormik", () => {
  const mockBlocker = {
    state: "blocked",
    proceed: vi.fn(),
    reset: vi.fn()
  };

  beforeEach(() => {
    vi.clearAllMocks();
    (ReactRouter.useBlocker as Mock).mockReturnValue(mockBlocker);

    (Formik.useFormikContext as Mock).mockReturnValue({
      values: { nomOEC: "" },
      dirty: true,
      validateForm: () => Promise.resolve({})
    });
  });

  const onEnregistrer = vi.fn();

  function renderComponent() {
    return render(
      <BloqueurNavigationSaisieProjet onEnregistrer={onEnregistrer}>
        <button data-testid="child-button">Test</button>
      </BloqueurNavigationSaisieProjet>
    );
  }

  test("ouvre la modale quand blocker.state est 'blocked' et dirty=true", () => {
    renderComponent();
    expect(screen.getByText("Modifications à enregistrer")).toBeDefined();

    expect(screen.getByText("Des modifications ont été apportées au projet. Que souhaitez-vous faire ?")).toBeDefined();
  });

  test("Le bouton 'Enregistrer et quitter' appelle onEnregistrer puis blocker.proceed()", async () => {
    renderComponent();

    const btnSave = screen.getByRole("button", { name: /Enregistrer et quitter/i });
    await userEvent.click(btnSave);

    expect(onEnregistrer).toHaveBeenCalledWith({ nomOEC: "" });
    expect(mockBlocker.proceed).toHaveBeenCalled();
  });

  test("Le bouton 'Quitter sans enregistrer' appelle blocker.proceed() sans onEnregistrer", async () => {
    renderComponent();

    const btnQuit = screen.getByRole("button", { name: /Quitter sans enregistrer/i });
    await userEvent.click(btnQuit);

    expect(onEnregistrer).not.toHaveBeenCalled();
    expect(mockBlocker.proceed).toHaveBeenCalled();
  });

  test("Le bouton 'Annuler' appelle blocker.reset() et ferme la modale", async () => {
    renderComponent();

    const btnCancel = screen.getByRole("button", { name: /Annuler/i });
    await userEvent.click(btnCancel);

    expect(mockBlocker.reset).toHaveBeenCalled();
    expect(screen.queryByText("Modifications à enregistrer")).toBeNull();
  });
});
