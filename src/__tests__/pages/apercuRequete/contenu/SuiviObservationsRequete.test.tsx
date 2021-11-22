import { render, screen, waitFor } from "@testing-library/react";
import { mount } from "enzyme";
import React from "react";
import DONNEES_REQUETE from "../../../../mock/data/requete";
import { SuiviObservationsRequete } from "../../../../views/pages/apercuRequete/contenu/SuiviObservationRequete";

test("renders suivi des actions requete", async () => {
  render(
    <SuiviObservationsRequete observations={DONNEES_REQUETE.observations} />
  );
  const titre = screen.getByText(/Observations requête/i);
  let elem1: HTMLElement;
  let elem2: HTMLElement;

  await waitFor(() => {
    expect(titre.textContent).toBeDefined();
    elem1 = screen.getByText(/LOS/i);
    expect(elem1).toBeDefined();
    expect(elem1.innerHTML).toBe(
      "C'est vraiment dur de pouvo... - 02/01/1970 - LOS"
    );
    elem2 = screen.getByText(/BTC/i);
    expect(elem2).toBeDefined();
    expect(elem2.innerHTML).toBe(
      "Je fais pas 30 charactères - 02/01/1970 - BTC"
    );
  });
});

test("renders suivi actions hidding", async () => {
  const suiviActionsRequete = mount(
    <SuiviObservationsRequete observations={DONNEES_REQUETE.observations} />
  );
  await waitFor(() => {
    expect(suiviActionsRequete.find(".Mui-expanded")).toBeDefined();
  });
  suiviActionsRequete
    .find(".MuiAccordionSummary-expandIcon")
    .first()
    .simulate("click");
  await waitFor(() => {
    expect(suiviActionsRequete.find(".Mui-expanded")).toHaveLength(0);
  });
});
