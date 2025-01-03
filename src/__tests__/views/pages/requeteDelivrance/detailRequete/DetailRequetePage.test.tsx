import { DetailRequetePage } from "@pages/requeteDelivrance/detailRequete/DetailRequetePage";
import { render, screen, waitFor } from "@testing-library/react";
import { expect, test } from "vitest";

test("renders Page requete with all elements", async () => {
  render(<DetailRequetePage idRequeteAAfficher="a4cefb71-8457-4f6b-937e-34b49335d404" />);

  await waitFor(() => {
    expect(document.title).toBe("Détails requête");
    expect(screen.getByText("Délivrance Extrait/Copie dématérialisée")).toBeDefined();
  });
});
