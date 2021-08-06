import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { AlerteActe } from "../../../../../../views/pages/fiche/contenu/AlerteActe";

test("renders texte du bouton d'ajout d'alerte", () => {
  render(<AlerteActe dataFiche={{ data: {} }} ajouterAlerte={true} />);
  const boutonElement = screen.getByText(/Ajouter une alerte/i);
  expect(boutonElement).toBeInTheDocument();
});

test("renders présence de l'icône du bouton d'ajout d'alerte", () => {
  render(<AlerteActe dataFiche={{ data: {} }} ajouterAlerte={true} />);
  const iconElement = screen.getByTestId("IconeBoutonAjoutAlertes");
  expect(iconElement).toBeInTheDocument();
});

test("renders click sur le bouton d'ajout d'alerte Activé/Désactivé", () => {
  const handleClickButton = jest.fn();
  render(<AlerteActe dataFiche={{ data: {} }} ajouterAlerte={true} />);
  const boutonElement = screen.getByTestId("IconeBoutonAjoutAlertes");
  fireEvent.click(boutonElement);
  expect(handleClickButton).toHaveBeenCalledTimes(0);
});
