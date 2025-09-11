import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, test, vi } from "vitest";
import RMCArchive from "../../../../../composants/pages/rmc/formulaire/RMCArchive";
import { EBlocsRMC, RMCContext } from "../../../../../contexts/RMCContextProvider";

const mockOnSubmit = vi.fn();

describe("RMCArchive", () => {
  const blocsRenseignesMock: (keyof typeof EBlocsRMC)[] = [EBlocsRMC.TITULAIRE, EBlocsRMC.EVENEMENT, EBlocsRMC.ACTE];

  const renderSnapshot = () => {
    const { container } = render(
      <div>
        <RMCContext.Provider value={{ blocsRenseignes: blocsRenseignesMock }}>
          <RMCArchive onSubmit={mockOnSubmit} />
        </RMCContext.Provider>
      </div>
    );

    return container.firstChild;
  };

  test("doit afficher correctement le formulaire (snapshot)", () => {
    const snapshot = renderSnapshot();
    expect(snapshot).toMatchSnapshot();
  });

  test("doit appeler onSubmit au clic sur le bouton", async () => {
    renderSnapshot();

    const boutonRechercher = screen.getByRole("button", { name: /rechercher/i });
    await userEvent.click(boutonRechercher);

    expect(mockOnSubmit).toHaveBeenCalled();
  });
});
