import React from "react";
import { render, screen } from "@testing-library/react";

import DONNEES_REQUETE from "./data/requete";
import { ResumeRequete } from "../visualisation/ResumeRequete";
import { act } from "react-dom/test-utils";
import { mount } from "enzyme";

test("renders titre résumé requete", () => {
  act(() => {
    render(<ResumeRequete requete={DONNEES_REQUETE} />);
    const titre = screen.getByText(/Résumé de/i);
    expect(titre.textContent).toBe("Résumé de la requête");
  });
});

test("renders résumé requete hidding", () => {
  const resumeRequete = mount(<ResumeRequete requete={DONNEES_REQUETE} />);
  expect(resumeRequete.find(".resume-requete-content")).toHaveLength(1);

  resumeRequete
    .find(".MuiExpansionPanelSummary-expandIcon")
    .first()
    .simulate("click");

  expect(resumeRequete.find(".resume-requete-content")).toHaveLength(0);
});
