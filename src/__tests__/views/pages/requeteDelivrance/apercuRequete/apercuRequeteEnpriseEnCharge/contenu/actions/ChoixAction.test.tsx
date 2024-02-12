import { requeteRDCSC } from "@mock/data/requeteDelivrance";
import { ChoixAction } from "@pages/requeteDelivrance/apercuRequete/apercuRequeteEnpriseEnCharge/contenu/actions/ChoixAction";
import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

test("renders du bloc choix des actions", async () => {
  render(
    <MemoryRouter>
      <ChoixAction requete={requeteRDCSC} />
    </MemoryRouter>
  );

  await waitFor(() => {
    let menuDelivrer = screen.getByText("Délivrer");
    let menuReponseSansDelivranceCS = screen.getByText(
      "Réponse sans délivrance"
    );
    expect(menuDelivrer).toBeDefined();
    expect(menuReponseSansDelivranceCS).toBeDefined();
  });
});
