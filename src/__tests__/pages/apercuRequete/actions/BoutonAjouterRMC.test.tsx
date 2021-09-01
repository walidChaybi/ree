import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import React from "react";
import { getLibelle } from "../../../../views/common/widget/Text";
import { BoutonAjouterRMC } from "../../../../views/pages/apercuRequete/apercuRequeteEnpriseEnCharge/contenu/BoutonAjouterRMC";

test("renders titre bouton ajouter RMC", async () => {
  render(
    <BoutonAjouterRMC
      libelle={getLibelle("Ajouter une recherche multicritères")}
    />
  );
  const linkElement = screen.getByText(/Ajouter une recherche multicritères/i);
  expect(linkElement).toBeInTheDocument();
  fireEvent.click(linkElement);
  const dialog = screen.getByRole("dialog");
  expect(dialog).toBeInTheDocument();
  const closeElement = screen.getByTestId("CloseButtonAjouterRMC");
  expect(closeElement).toBeInTheDocument();
  fireEvent.click(closeElement);
  await waitFor(() => {
    expect(dialog).not.toBeInTheDocument();
  });
});
