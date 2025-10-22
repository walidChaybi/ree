import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Mock, beforeEach, describe, expect, test, vi } from "vitest";

import BloqueurNavigationSaisieProjet from "../../../../../composants/pages/requetesConsulaire/saisieProjet/formulaireSaisieProjet/BloqueurNavigationSaisieProjet";

import { EActionFormulaireProjetActeTranscrit } from "@model/form/creation/transcription/IProjetActeTranscritForm";

import * as ReactRouter from "react-router";

vi.mock("react-router", async () => {
  const mod = await vi.importActual<typeof import("react-router")>("react-router");
  return {
    ...mod,
    useBlocker: vi.fn(),
    useBeforeUnload: vi.fn()
  };
});

const mockSubmitForm = vi.fn();
const mockSetFieldValue = vi.fn().mockResolvedValue(undefined);

vi.mock("formik", () => ({
  useFormikContext: () => ({
    submitForm: mockSubmitForm,
    setFieldValue: mockSetFieldValue,
    dirty: true
  })
}));

describe("GestionnaireNavigationFormik", () => {
  const mockBlocker = {
    state: "blocked",
    proceed: vi.fn(),
    reset: vi.fn()
  };

  beforeEach(() => {
    vi.clearAllMocks();
    (ReactRouter.useBlocker as Mock).mockReturnValue(mockBlocker);
  });

  function renderComponent() {
    return render(
      <BloqueurNavigationSaisieProjet doitBloquer>
        <div>Saisie projet</div>
      </BloqueurNavigationSaisieProjet>
    );
  }

  test("ouvre la modale quand blocker.state est 'blocked' et dirty=true", () => {
    renderComponent();
    expect(screen.getByText("Modifications à enregistrer")).toBeDefined();

    expect(screen.getByText("Des modifications ont été apportées au projet. Que souhaitez-vous faire ?")).toBeDefined();
  });

  test("Le bouton 'Enregistrer et quitter' appelle la fonction enregistrer", async () => {
    renderComponent();

    const btnSave = screen.getByRole("button", { name: /Enregistrer et quitter/i });
    await userEvent.click(btnSave);

    expect(mockSetFieldValue).toHaveBeenCalledWith("soumissionFormulaire", {
      action: EActionFormulaireProjetActeTranscrit.ENREGISTRER,
      avecEnregistrement: true,
      apresEnregistrement: expect.any(Function)
    });

    await waitFor(() => {
      expect(mockSetFieldValue).toHaveBeenCalled();
      expect(mockSubmitForm).toHaveBeenCalled();
    });
  });

  test("Le bouton 'Quitter sans enregistrer' appelle blocker.proceed()", async () => {
    renderComponent();

    const btnQuit = screen.getByRole("button", { name: /Quitter sans enregistrer/i });
    await userEvent.click(btnQuit);

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
