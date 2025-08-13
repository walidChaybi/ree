import { BoutonNouvelleRMCRequete } from "@pages/rechercheMultiCriteres/autoRequetes/contenu/BoutonNouvelleRMCRequete";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { expect, test, vi } from "vitest";

test("render BoutonNouvelleRMCRequete", () => {
  render(
    <BoutonNouvelleRMCRequete
      setValuesRMCRequete={vi.fn()}
      setCriteresRechercheRequete={vi.fn()}
    />
  );

  const boutonNouvelleRMC = screen.getByRole("button") as HTMLButtonElement;

  waitFor(() => {
    expect(boutonNouvelleRMC).toBeDefined();
  });

  fireEvent.click(boutonNouvelleRMC);

  const popinNouvelleRMC = screen.getByRole("dialog", {
    hidden: true
  });

  waitFor(() => {
    expect(popinNouvelleRMC).toBeDefined();
  });

  const boutonAnnuler = screen.getByLabelText("CloseButtonNouvelleRMCRequete") as HTMLButtonElement;

  fireEvent.click(boutonAnnuler);

  waitFor(() => {
    expect(popinNouvelleRMC).not.toBeDefined();
  });
});
