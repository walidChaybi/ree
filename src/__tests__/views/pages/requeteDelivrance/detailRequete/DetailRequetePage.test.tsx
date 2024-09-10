import { DetailRequetePage } from "@pages/requeteDelivrance/detailRequete/DetailRequetePage";
import { render, waitFor } from "@testing-library/react";
import { expect, test } from "vitest";

test("renders Page requete with all elements", () => {
  render(
    <DetailRequetePage idRequeteAAfficher="a4cefb71-8457-4f6b-937e-34b49335d404" />
  );
  waitFor(() => {
    expect(document.title).toBe("Détails requête");
  });
});


