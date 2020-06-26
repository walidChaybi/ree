import React from "react";
import { BoutonDeconnexion } from "../BoutonDeconnexion";
import { screen, render, fireEvent } from "@testing-library/react";
const ressource = require("../../../../ressources/ressource.json");

test("renders bouton bouton utilisateur", () => {
  const nom = "Garisson";
  const prenom = "Juliette";
  render(<BoutonDeconnexion nom={nom} prenom={prenom}></BoutonDeconnexion>);

  const boutonElement = screen.getByText(/Juliette Garisson/i);
  expect(boutonElement).toBeInTheDocument();
});

test("renders click bouton déconnexion", () => {
  const handleClickButton = jest.fn();
  render(
    <BoutonDeconnexion
      nom=""
      prenom=""
      onClick={handleClickButton}
    ></BoutonDeconnexion>
  );

  if (ressource.boutonDeconnexion.visible) {
    const boutonElement = screen.getByTestId("UtilisateurBouton");
    fireEvent.click(boutonElement);
    const linkElement = screen.getByText(/Déconnexion/i);
    fireEvent.click(linkElement);
    expect(handleClickButton).toHaveBeenCalledTimes(1);
  }
});
