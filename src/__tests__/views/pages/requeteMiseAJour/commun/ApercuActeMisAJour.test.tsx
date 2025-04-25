import { ApercuActeMisAJour } from "@pages/requeteMiseAJour/apercuRequete/commun/ApercuActeMisAjour";
import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { expect, test } from "vitest";

test("DOIT afficher l'onglet ApercuActeMisAjour correctement", async () => {
  render(
    <MemoryRouter>
      <ApercuActeMisAJour
        idActeAAfficher="d8708d77-a359-4553-be72-1eb5f246d4da"
        doitMettreAJourApercu={true}
      />
    </MemoryRouter>
  );

  await waitFor(() => {
    expect(screen.getByTitle("Visionneuse acte mis à jour")).toBeDefined();
  });
});
