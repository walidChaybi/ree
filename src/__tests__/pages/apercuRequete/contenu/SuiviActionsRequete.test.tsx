import { act, render, screen } from "@testing-library/react";
import { mount } from "enzyme";
import React from "react";
import request from "superagent";
import DONNEES_REQUETE from "../../../../mock/data/requete";
import { configAgent } from "../../../../mock/superagent-config/superagent-mock-agent";
import { SuiviActionsRequete } from "../../../../views/pages/apercuRequete/contenu/SuiviActionsRequete";

const superagentMock = require("superagent-mock")(request, configAgent);

test("renders suivi des actions requete", () => {
  act(() => {
    render(<SuiviActionsRequete actions={DONNEES_REQUETE.actions} />);
    const ligne = screen.getByText(/Suivi/i);
    expect(ligne.textContent).toBe("Suivi des actions");
  });
});

test("renders liste des actions requete", () => {
  act(() => {
    render(<SuiviActionsRequete actions={DONNEES_REQUETE.actions} />);
    const element = screen.getByText(/Saisie de la requête/i);
    expect(element).toBeDefined;
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
