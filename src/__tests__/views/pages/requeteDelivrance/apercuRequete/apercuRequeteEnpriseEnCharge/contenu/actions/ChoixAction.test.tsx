import { ChoixAction } from "@pages/requeteDelivrance/apercuRequete/apercuRequeteEnpriseEnCharge/contenu/actions/ChoixAction";
import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { expect, test } from "vitest";
import { requeteRDCSC } from "../../../../../../../mock/data/requeteDelivrance";

test("renders du bloc choix des actions", () => {
  render(
    <MemoryRouter>
      <ChoixAction requete={requeteRDCSC} />
    </MemoryRouter>
  );

  waitFor(() => {
    let menuDelivrer = screen.getByText("Délivrer");
    let menuReponseSansDelivranceCS = screen.getByText("Réponse sans délivrance");
    expect(menuDelivrer).toBeDefined();
    expect(menuReponseSansDelivranceCS).toBeDefined();
  });
});
