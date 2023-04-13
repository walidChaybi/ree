import { BoutonNouvelleRMCActeInscription } from "@pages/rechercheMultiCriteres/autoActesInscriptions/BoutonNouvelleRMCActeInscription";
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor
} from "@testing-library/react";
import React, { useState } from "react";

const ConteneurBouton: React.FC = () => {
  const [popinAffichee, setPopinAffichee] = useState<boolean>(false);

  return (
    <BoutonNouvelleRMCActeInscription
      nouvelleRMCActeInscription={jest.fn()}
      setPopinAffichee={setPopinAffichee}
      popinAffichee={popinAffichee}
    />
  );
};

test("renders titre bouton ajouter RMC", async () => {
  await act(async () => {
    render(<ConteneurBouton />);
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
