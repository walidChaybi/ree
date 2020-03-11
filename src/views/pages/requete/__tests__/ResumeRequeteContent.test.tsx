import React from "react";
import * as renderer from "react-test-renderer";
import { render } from "@testing-library/react";

import { ResumeRequeteContent } from "../visualisation/ResumeRequeteContent";
import DONNEES_REQUETE from "./data/requete";

test("renders resumé du contenu de la requete", () => {
  const component = renderer.create(
    <ResumeRequeteContent requete={DONNEES_REQUETE} />
  );
  expect(component.toJSON()).toMatchSnapshot();
});

test("renders raison sociale, lieu évenement", () => {
  const { getByText } = render(
    <ResumeRequeteContent requete={DONNEES_REQUETE} />
  );
  const raisonSociale = getByText(/aubin/i);
  const fez = getByText(/fez/i);
  expect(raisonSociale.textContent).toBe("aubin nicolas");
  expect(fez.textContent).toBe("fez, maroc");
});

test("renders tous les titulaires", () => {
  const { getAllByText } = render(
    <ResumeRequeteContent requete={DONNEES_REQUETE} />
  );

  const titulaires = getAllByText(/Titulaire [1-9]/i);
  expect(titulaires).toHaveLength(2);
});
