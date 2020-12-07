import React from "react";
import { render, screen, act } from "@testing-library/react";
import DONNEES_REQUETE from "../../../../mock/data/requete";
import { mount } from "enzyme";
import { ResumeRequete } from "../../../../views/pages/apercuRequete/contenu/ResumeRequete";

test("renders titre résumé requete", () => {
  act(() => {
    render(<ResumeRequete requete={DONNEES_REQUETE} />);
    const titre = screen.getByText(/Résumé de/i);
    expect(titre.textContent).toBe("Résumé de la requête11982");
  });
});

test("renders résumé requete hidding", () => {
  const resumeRequete = mount(<ResumeRequete requete={DONNEES_REQUETE} />);
  expect(resumeRequete.find(".Mui-expanded")).toBeDefined();

  resumeRequete
    .find(".MuiAccordionSummary-expandIcon")
    .first()
    .simulate("click");

  expect(resumeRequete.find(".Mui-expanded")).toHaveLength(0);
});
