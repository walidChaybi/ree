import { BoutonNouvelleRMCActeInscription } from "@pages/rechercheMultiCriteres/autoActesInscriptions/BoutonNouvelleRMCActeInscription";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import React, { useState } from "react";
import { expect, test, vi } from "vitest";

test("renders titre bouton ajouter RMC", async () => {
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

  render(<ConteneurBouton />);

  const linkElement = screen.getByText("Nouvelle recherche multi-critères");

  await waitFor(() => {
    expect(linkElement).toBeDefined();
  });

  fireEvent.click(linkElement);

  const dialog = screen.getByRole("dialog");

  await waitFor(() => {
    expect(dialog).toBeDefined();
  });

  const closeElement = screen.getByLabelText("CloseButtonNouvelleRMCActeInscription");

  await waitFor(() => {
    expect(closeElement).toBeDefined();
  });

  fireEvent.click(closeElement);

  await waitFor(() => {
    expect(screen.queryByRole("dialog")).toBeNull();
  });
});
