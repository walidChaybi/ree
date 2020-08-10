import React from "react";
import { BoutonDeconnexion } from "../BoutonDeconnexion";
import { screen, render, fireEvent } from "@testing-library/react";
import {
  OfficierContext,
  officierContextMock
} from "../../../core/contexts/OfficierContext";
const ressource = require("../../../../ressources/ressource.json");

test("renders bouton utilisateur", () => {
  render(
    <OfficierContext.Provider value={officierContextMock}>
      <BoutonDeconnexion />
    </OfficierContext.Provider>
  );
  const boutonElement = screen.getByText(/Juliette Garisson/i);
  expect(boutonElement).toBeInTheDocument();
});

test("renders click bouton utilisateur", () => {
  const handleClickButton = jest.fn();
  render(
    <OfficierContext.Provider value={officierContextMock}>
      <BoutonDeconnexion onClick={handleClickButton}></BoutonDeconnexion>
    </OfficierContext.Provider>
  );
  const boutonElement = screen.getByText(/Juliette Garisson/i);
  fireEvent.click(boutonElement);
  expect(handleClickButton).toHaveBeenCalledTimes(1);
  if (ressource.boutonDeconnexion.visible) {
    const linkElement = screen.getByText(/Déconnexion/i);
    expect(linkElement).toBeInTheDocument();
  }
});
