import { fireEvent, render, renderHook } from "@testing-library/react";
import { act } from "react";
import { useBlocker } from "react-router-dom";
import { beforeEach, describe, expect, test, vi } from "vitest";
import { useCreateBlocker } from "../../hooks/CreateBlocker";

vi.mock("@util/Utils", () => ({
  getLibelle: (key: string) => key
}));

vi.mock("react-router-dom", () => ({
  useBlocker: vi.fn()
}));
vi.mock("@widget/popin/ConfirmationPopin", () => ({
  ConfirmationPopin: ({ boutons }: any) => (
    <div>
      {boutons.map((bouton: any, idx: number) => (
        <button key={idx} onClick={bouton.action}>
          {bouton.label}
        </button>
      ))}
    </div>
  )
}));

describe("useCreateBlocker", () => {
  let mockBlocker: { proceed: any; reset: any; state?: string };

  beforeEach(() => {
    mockBlocker = {
      state: "unblocked",
      proceed: vi.fn(),
      reset: vi.fn()
    };
    (useBlocker as ReturnType<typeof vi.fn>).mockReturnValue(mockBlocker);
  });
  test("Doit activer le blocker et executer la fonction de redirection sans confirmation", () => {
    const blockerProps = {
      messages: ["messageMock"],
      executerApresConfirmation: vi.fn(),
      executerSiRedirectionAvecBlocageSansPopin: vi.fn()
    };

    const { result } = renderHook(() => useCreateBlocker(blockerProps));

    act(() => {
      mockBlocker.state = "blocked";
      result.current.gestionBlocker.activerBlockerSansConfirmation();
    });

    expect(mockBlocker.proceed).toHaveBeenCalledOnce();
    expect(
      blockerProps.executerSiRedirectionAvecBlocageSansPopin
    ).toHaveBeenCalled();
  });

  test("Doit activer le blocker et déclancher la popin", () => {
    const blockerProps = {
      messages: ["messageMock"],
      executerApresConfirmation: vi.fn()
    };

    const { result } = renderHook(() => useCreateBlocker(blockerProps));
    const blockerComponent = render(result.current.BlockerNavigation());

    act(() => {
      mockBlocker.state = "blocked";
      result.current.gestionBlocker.activerBlockerAvecConfirmation();
    });

    expect(blockerComponent.getByText("OK")).toBeDefined();
    expect(mockBlocker.proceed).not.toHaveBeenCalled();
  });

  test("Doit débloquer la navigation lorsque le blocker est desactivé", () => {
    const blockerProps = {
      messages: ["Test message"],
      executerApresConfirmation: vi.fn(),
      titre: "Test Title"
    };

    const { result } = renderHook(() => useCreateBlocker(blockerProps));

    act(() => {
      mockBlocker.state = "blocked";
      result.current.gestionBlocker.desactiverBlocker();
    });

    expect(mockBlocker.proceed).toHaveBeenCalledOnce();
  });

  test("Doit exécuter la fonction de confirmation lorsque le bouton OK est cliqué", () => {
    const blockerProps = {
      messages: ["messageMock"],
      executerApresConfirmation: vi.fn(),
      titre: "TitreMock"
    };

    const { result } = renderHook(() => useCreateBlocker(blockerProps));

    const blockerComponent = render(result.current.BlockerNavigation());

    act(() => {
      mockBlocker.state = "blocked";
      result.current.gestionBlocker.activerBlockerAvecConfirmation();
    });

    const boutonOk = blockerComponent.getByText("OK");
    act(() => {
      fireEvent.click(boutonOk);
    });

    expect(blockerProps.executerApresConfirmation).toHaveBeenCalled();
  });

  test("Doit reset le blocker lorsque le bouton Annuler est cliqué", () => {
    const blockerProps = {
      messages: ["messageMock"],
      executerApresConfirmation: vi.fn(),
      titre: "TitreMock"
    };

    const { result } = renderHook(() => useCreateBlocker(blockerProps));
    const blockerComponent = render(result.current.BlockerNavigation());

    act(() => {
      mockBlocker.state = "blocked";
      result.current.gestionBlocker.activerBlockerAvecConfirmation();
    });

    const boutonAnnuler = blockerComponent.getByText("Annuler");
    act(() => {
      fireEvent.click(boutonAnnuler);
    });

    expect(mockBlocker.reset).toHaveBeenCalled();
  });
});
