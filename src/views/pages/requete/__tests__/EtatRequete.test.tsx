import React from "react";
import * as renderer from "react-test-renderer";
import { render } from "@testing-library/react";

import { EtatRequete } from "../visualisation/EtatRequete";
import DONNEES_REQUETE from "./data/requete";

test("renders informations sur l'état de la requete", () => {
  const component = renderer.create(<EtatRequete requete={DONNEES_REQUETE} />);
  expect(component.toJSON()).toMatchSnapshot();
});

test("renders titre et numero requete", () => {
  const { getByText } = render(<EtatRequete requete={DONNEES_REQUETE} />);
  const titre = getByText(/Délivrance d'extrait d'acte de/i);
  const numeroRequete = getByText(/Requête n°/i);
  expect(titre.textContent).toBe(
    "Délivrance d'extrait d'acte de naissance dématérialisé"
  );
  expect(numeroRequete.textContent).toBe("Requête n°11982");
});
