import { ReponseAppelDetailRequeteDelivrance } from "@mock/data/DetailRequeteDelivrance";
import { IRequeteDelivrance } from "@model/requete/IRequeteDelivrance";
import DetailRequetePage from "@pages/requeteDelivrance/detailRequete/DetailRequetePage";
import { render, screen, waitFor } from "@testing-library/react";
import { expect, test } from "vitest";

test("renders Page requete with all elements", async () => {
  render(<DetailRequetePage requete={ReponseAppelDetailRequeteDelivrance.data as unknown as IRequeteDelivrance} />);

  await waitFor(() => {
    expect(document.title).toBe("Détails requête");
    expect(screen.getByText("Délivrance Extrait/Copie dématérialisée")).toBeDefined();
  });
});
