import React from "react";
import * as renderer from "react-test-renderer";
import { render, screen } from "@testing-library/react";

import { IDataTable } from "../../../../views/pages/espaceDelivrance/MesRequetesPage";
import DONNEES_REQUETE from "../../../../mock/data/requete";
import requetes from "../../../../mock/data/requetes.json";
import { ResumeRequeteContent } from "../../../../views/pages/apercuRequete/contenu/ResumeRequeteContent";

test("renders resumé du contenu de la requete", () => {
  const component = renderer.create(
    <ResumeRequeteContent requete={DONNEES_REQUETE as IDataTable} />
  );
  expect(component.toJSON()).toMatchSnapshot();
});

test("renders nom de famille, lieu évènement", () => {
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

test("renders QualiteRequerant Mandataire Habilité", () => {
  render(<ResumeRequeteContent requete={requetes.data[2] as IDataTable} />);

  const requerant = screen.getByText(/Maitre/i);
  expect(requerant.textContent).toEqual("Maitre");
});

test("renders QualiteRequerant Institutionnel", () => {
  render(<ResumeRequeteContent requete={requetes.data[1] as IDataTable} />);

  const requerant = screen.getAllByText(/HECTOR/i);
  expect(requerant[1].textContent).toEqual("HECTOR");
});
