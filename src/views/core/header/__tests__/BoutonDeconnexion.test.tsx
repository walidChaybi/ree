import React from "react";
import { BoutonDeconnexion } from "../BoutonDeconnexion";
import { screen, render, fireEvent } from "@testing-library/react";
import officier from "../../../../api/mock/officier.json";
const ressource = require("../../../../ressources/ressource.json");

test("renders bouton utilisateur", () => {
  render(
    <BoutonDeconnexion
      nom={officier.nom}
      prenom={officier.prenom}
    ></BoutonDeconnexion>
  );

  const boutonElement = screen.getByText(/Juliette Garisson/i);
  expect(boutonElement).toBeInTheDocument();
});

test("renders click bouton utilisateur", () => {
  const handleClickButton = jest.fn();
  render(
    <BoutonDeconnexion
      nom={officier.nom}
      prenom={officier.prenom}
      onClick={handleClickButton}
    ></BoutonDeconnexion>
  );

  const boutonElement = screen.getByText(/Juliette Garisson/i);
  fireEvent.click(boutonElement);
  expect(handleClickButton).toHaveBeenCalledTimes(1);

  if (ressource.boutonDeconnexion.visible) {
    const linkElement = screen.getByText(/Déconnexion/i);
    expect(linkElement).toBeInTheDocument();
  }
});
