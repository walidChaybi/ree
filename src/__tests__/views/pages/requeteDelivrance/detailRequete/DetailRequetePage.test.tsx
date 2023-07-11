import { DetailRequetePage } from "@pages/requeteDelivrance/detailRequete/DetailRequetePage";
import { render, waitFor } from "@testing-library/react";
import { act } from "react-dom/test-utils";

test("renders Page requete with all elements", async () => {
  act(() => {
    render(
      <DetailRequetePage idRequeteAAfficher="a4cefb71-8457-4f6b-937e-34b49335d404" />
    );
  });
  await waitFor(() => {
    expect(document.title).toBe("Détails requête");
  });
});


