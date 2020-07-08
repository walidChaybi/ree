import React from "react";
import * as renderer from "react-test-renderer";
import { render, screen } from "@testing-library/react";

import { ResumeRequeteContent } from "../visualisation/ResumeRequeteContent";
import DONNEES_REQUETE from "./data/requete";

test("renders resumé du contenu de la requete", () => {
  const component = renderer.create(
    <ResumeRequeteContent requete={DONNEES_REQUETE} />
  );
  expect(component.toJSON()).toMatchSnapshot();
});

test("renders raison sociale, lieu évenement", () => {
  render(<ResumeRequeteContent requete={DONNEES_REQUETE} />);
  const raisonSociale = screen.getByText(/aubin/i);
  const fez = screen.getByText(/fez/i);
  expect(raisonSociale.textContent).toBe("aubin");
  expect(fez.textContent).toBe("fez, maroc");
});

test("renders tous les titulaires", () => {
  render(<ResumeRequeteContent requete={DONNEES_REQUETE} />);

  const titulaires = screen.getAllByText(/Titulaire [1-9]/i);
  expect(titulaires).toHaveLength(2);
});
