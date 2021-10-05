import {
  act,
  fireEvent,
  render,
  screen,
  waitFor
} from "@testing-library/react";
import React from "react";
import { BoutonNouvelleRMCActeInscription } from "../../../../../views/pages/apercuRequete/apercuRequeteEnpriseEnCharge/contenu/rechercheMultiCriteres/BoutonNouvelleRMCActeInscription";

test("renders titre bouton ajouter RMC", async () => {
  await act(async () => {
    render(
      <BoutonNouvelleRMCActeInscription
        setValuesRMCActeInscription={jest.fn()}
        setNouvelleRMCActeInscription={jest.fn()}
        setCriteresRechercheActe={jest.fn()}
        setCriteresRechercheInscription={jest.fn()}
      />
    );
  });

  const linkElement = screen.getByText("Nouvelle recherche multi-critères");

  await waitFor(() => {
    expect(linkElement).toBeInTheDocument();
  });

  await act(async () => {
    fireEvent.click(linkElement);
  });

  const dialog = screen.getByRole("dialog");

  await waitFor(() => {
    expect(dialog).toBeInTheDocument();
  });

  const closeElement = screen.getByLabelText(
    "CloseButtonNouvelleRMCActeInscription"
  );

  await waitFor(() => {
    expect(closeElement).toBeInTheDocument();
  });

  await act(async () => {
    fireEvent.click(closeElement);
  });

  await waitFor(() => {
    expect(dialog).not.toBeInTheDocument();
  });
});
