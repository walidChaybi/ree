import React from "react";
import * as renderer from "react-test-renderer";
import { render, screen } from "@testing-library/react";

import { IDataTable } from "../../../../views/pages/espaceDelivrance/MesRequetesPage";
import DONNEES_REQUETE from "../../../../api/mock/data/requete";
import { ResumeRequeteContent } from "../../../../views/pages/apercuRequete/contenu/ResumeRequeteContent";

test("renders resumé du contenu de la requete", () => {
  const component = renderer.create(
    <ResumeRequeteContent requete={DONNEES_REQUETE as IDataTable} />
  );
  expect(component.toJSON()).toMatchSnapshot();
});

test("renders nom de famille, lieu évenement", () => {
  render(<ResumeRequeteContent requete={DONNEES_REQUETE as IDataTable} />);
  const nomFamille = screen.getByText(/aubin/i);
  const fez = screen.getByText(/fez/i);
  expect(nomFamille.textContent).toBe("aubin");
  expect(fez.textContent).toBe("fez, maroc");
});

test("renders tous les titulaires", () => {
  render(<ResumeRequeteContent requete={DONNEES_REQUETE as IDataTable} />);

  const titulaires = screen.getAllByText(/Titulaire [1-9]/i);
  expect(titulaires).toHaveLength(2);
});
