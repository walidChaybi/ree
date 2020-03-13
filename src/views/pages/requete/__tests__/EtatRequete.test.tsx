import React from "react";
import * as renderer from "react-test-renderer";
import { render } from "@testing-library/react";

import { EtatRequete } from "../visualisation/EtatRequete";
import requete from "./data/requete";
import { IDataTable } from "../RequeteTableauHeaderCell";

test("renders informations sur l'état de la requete", () => {
  const component = renderer.create(
    <EtatRequete requete={requete as IDataTable} />
  );
  expect(component.toJSON()).toMatchSnapshot();
});

test("renders titre et numero requete", () => {
  const { getByText } = render(<EtatRequete requete={requete as IDataTable} />);
  const titre = getByText(/Délivrance d'extrait d'acte de/i);
  const numeroRequete = getByText(/Requête n°/i);
  expect(titre.textContent).toBe(
    "Délivrance d'extrait d'acte de naissance dématérialisé"
  );
  expect(numeroRequete.textContent).toBe("Requête n°11982");
});
