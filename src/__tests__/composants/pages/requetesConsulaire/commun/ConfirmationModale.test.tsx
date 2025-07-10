import { act, fireEvent, render, renderHook, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import { IConfigPopin, useModaleConfirmation } from "../../../../../composants/pages/requetesConsulaire/commun/ConfirmationModale";

vi.mock("@mui/icons-material/Loop", () => ({
  default: () => <div data-testid="loop-icon">LoopIcon</div>
}));

describe("useModaleConfirmation", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  test("Doit initialiser avec des valeurs par défaut", () => {
    const { result } = renderHook(() => useModaleConfirmation());

    expect(result.current.estOuvert).toBe(false);
    expect(result.current.ModaleAlerte).toBeNull();
  });

  test("Doit ouvrir la modale avec la configuration fournie", () => {
    const { result } = renderHook(() => useModaleConfirmation());

    const config: IConfigPopin = {
      titre: "Test Modal",
      messages: ["Message de test"],
      boutons: [
        {
          libelle: "OK",
          action: vi.fn()
        }
      ]
    };

    act(() => {
      result.current.ouvrir(config);
    });

    expect(result.current.estOuvert).toBe(true);
    expect(result.current.ModaleAlerte).not.toBeNull();
  });

  test("Doit fermer la modale", () => {
    const { result } = renderHook(() => useModaleConfirmation());

    const config: IConfigPopin = {
      messages: ["Test"],
      boutons: [{ libelle: "OK", action: vi.fn() }]
    };

    act(() => {
      result.current.ouvrir(config);
    });

    expect(result.current.estOuvert).toBe(true);

    act(() => {
      result.current.fermer();
    });

    expect(result.current.estOuvert).toBe(false);
    expect(result.current.ModaleAlerte).toBeNull();
  });

  test("Doit afficher la modale avec le titre et les messages", () => {
    const { result } = renderHook(() => useModaleConfirmation());

    const config: IConfigPopin = {
      titre: "Titre de test",
      messages: ["Premier message", "Deuxième message"],
      boutons: [{ libelle: "OK", action: vi.fn() }]
    };

    act(() => {
      result.current.ouvrir(config);
    });

    const { container } = render(result.current.ModaleAlerte);

    expect(container.firstChild).toMatchSnapshot();
  });

  test("Doit afficher les boutons avec les bonnes variantes", () => {
    const { result } = renderHook(() => useModaleConfirmation());

    const actionMock = vi.fn();
    const config: IConfigPopin = {
      messages: ["Test"],
      boutons: [
        { libelle: "Primaire", action: actionMock, variante: "primaire" },
        { libelle: "Danger", action: actionMock, variante: "danger" },
        { libelle: "Succès", action: actionMock, variante: "succes" },
        { libelle: "Secondaire", action: actionMock, variante: "secondaire" }
      ]
    };

    act(() => {
      result.current.ouvrir(config);
    });

    const { container } = render(result.current.ModaleAlerte);

    expect(container.firstChild).toMatchSnapshot();
  });

  test("Doit exécuter l'action du bouton et fermer la modale", async () => {
    const { result } = renderHook(() => useModaleConfirmation());

    const actionMock = vi.fn();
    const config: IConfigPopin = {
      messages: ["Test"],
      boutons: [{ libelle: "Enregistrer projet", action: actionMock }]
    };

    act(() => {
      result.current.ouvrir(config);
    });

    render(result.current.ModaleAlerte);

    const bouton = screen.getByRole("button", { name: "Enregistrer projet" });

    await act(async () => {
      fireEvent.click(bouton);
    });

    expect(actionMock).toHaveBeenCalledOnce();
    expect(result.current.estOuvert).toBe(false);
  });

  test("Doit gérer les erreurs dans les actions", async () => {
    const { result } = renderHook(() => useModaleConfirmation());

    const consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    const errorMock = new Error("Test erreur");
    const actionMock = vi.fn().mockRejectedValue(errorMock);

    const config: IConfigPopin = {
      messages: ["Test"],
      boutons: [{ libelle: "Action Erreur", action: actionMock }]
    };

    act(() => {
      result.current.ouvrir(config);
    });

    render(result.current.ModaleAlerte);

    const bouton = screen.getByRole("button", { name: "Action Erreur" });

    await act(async () => {
      fireEvent.click(bouton);
    });

    expect(consoleErrorSpy).toHaveBeenCalledWith("Erreur lors de l'exécution de l'action:", errorMock);
    expect(result.current.estOuvert).toBe(true);

    consoleErrorSpy.mockRestore();
  });
});
