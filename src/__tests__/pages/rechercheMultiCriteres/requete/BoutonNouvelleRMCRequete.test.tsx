import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import React from "react";
import { act } from "react-test-renderer";
import { BoutonNouvelleRMCRequete } from "../../../../views/pages/rechercheMultiCriteres/autoRequetes/contenu/BoutonNouvelleRMCRequete";

test("render BoutonNouvelleRMCRequete", async () => {
  await act(async () => {
    render(
      <BoutonNouvelleRMCRequete
        setNouvelleRMCRequete={jest.fn()}
        setValuesRMCRequete={jest.fn()}
        setCriteresRechercheRequete={jest.fn()}
      />
    );
  });

  const boutonNouvelleRMC = screen.getByRole("button") as HTMLButtonElement;

  await waitFor(() => {
    expect(boutonNouvelleRMC).toBeInTheDocument();
  });

  await act(async () => {
    fireEvent.click(boutonNouvelleRMC);
  });

  const popinNouvelleRMC = screen.getByRole("dialog", {
    hidden: true
  });

  await waitFor(() => {
    expect(popinNouvelleRMC).toBeInTheDocument();
  });

  const boutonAnnuler = screen.getByLabelText(
    "CloseButtonNouvelleRMCRequete"
  ) as HTMLButtonElement;

  await act(async () => {
    fireEvent.click(boutonAnnuler);
  });

  await waitFor(() => {
    expect(popinNouvelleRMC).not.toBeInTheDocument();
  });
});
