import { BoutonNouvelleRMCActeInscription } from "@pages/rechercheMultiCriteres/autoActesInscriptions/BoutonNouvelleRMCActeInscription";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import React, { useState } from "react";
import { expect, test, vi } from "vitest";

const ConteneurBouton: React.FC = () => {
  const [popinAffichee, setPopinAffichee] = useState<boolean>(false);

  return (
    <BoutonNouvelleRMCActeInscription
      nouvelleRMCActeInscription={vi.fn()}
      setPopinAffichee={setPopinAffichee}
      popinAffichee={popinAffichee}
    />
  );
};

test("renders titre bouton ajouter RMC", () => {
  render(<ConteneurBouton />);

  const linkElement = screen.getByText("Nouvelle recherche multi-critères");

  waitFor(() => {
    expect(linkElement).toBeDefined();
  });

  fireEvent.click(linkElement);

  const dialog = screen.getByRole("dialog");

  waitFor(() => {
    expect(dialog).toBeDefined();
  });

  const closeElement = screen.getByLabelText(
    "CloseButtonNouvelleRMCActeInscription"
  );

  waitFor(() => {
    expect(closeElement).toBeDefined();
  });

  fireEvent.click(closeElement);

  waitFor(() => {
    expect(dialog).not.toBeDefined();
  });
});
