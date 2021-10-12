import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import React from "react";
import { BoutonNouvelleRMC } from "../../../../../views/pages/apercuRequete/apercuRequeteEnpriseEnCharge/contenu/rechercheMultiCriteres/BoutonNouvelleRMC";

test("renders titre bouton ajouter RMC", async () => {
  render(<BoutonNouvelleRMC />);

  const linkElement = screen.getByText(/Nouvelle recherche multi-critères/i);
  expect(linkElement).toBeInTheDocument();

  fireEvent.click(linkElement);
  const dialog = screen.getByRole("dialog");
  expect(dialog).toBeInTheDocument();

  const closeElement = screen.getByLabelText("CloseButtonNouvelleRMC");
  expect(closeElement).toBeInTheDocument();

  fireEvent.click(closeElement);

  await waitFor(() => {
    expect(dialog).not.toBeInTheDocument();
  });
});
