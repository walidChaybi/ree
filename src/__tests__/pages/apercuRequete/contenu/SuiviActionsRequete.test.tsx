import { render, screen, waitFor } from "@testing-library/react";
import { mount } from "enzyme";
import React from "react";
import request from "superagent";
import DONNEES_REQUETE from "../../../../mock/data/requete";
import { configAgent } from "../../../../mock/superagent-config/superagent-mock-agent";
import { SuiviActionsRequete } from "../../../../views/pages/apercuRequete/contenu/SuiviActionsRequete";

const superagentMock = require("superagent-mock")(request, configAgent);

test("renders suivi des actions requete", async () => {
  render(<SuiviActionsRequete actions={DONNEES_REQUETE.actions} />);
  const titre = screen.getByText(/Suivi/i);
  expect(titre.textContent).toBe("Suivi des actions");

  let elem1: HTMLElement;
  let elem2: HTMLElement;
  await waitFor(() => {
    elem1 = screen.getByText(/LOY/i);
    expect(elem1).toBeInTheDocument();
    expect(elem1.innerHTML).toBe("Saisie de la requête - 10/03/2020 - LOY");
    elem2 = screen.getByText(/ESH/i);
    expect(elem2).toBeInTheDocument();
    expect(elem2.innerHTML).toBe("A traiter - 10/03/2020 - ESH");
  });
});

test("renders suivi actions hidding", () => {
  const suiviActionsRequete = mount(
    <SuiviActionsRequete actions={DONNEES_REQUETE.actions} />
  );
  expect(suiviActionsRequete.find(".Mui-expanded")).toBeDefined();

  suiviActionsRequete
    .find(".MuiAccordionSummary-expandIcon")
    .first()
    .simulate("click");

  expect(suiviActionsRequete.find(".Mui-expanded")).toHaveLength(0);
});

afterAll(() => {
  superagentMock.unset();
});
