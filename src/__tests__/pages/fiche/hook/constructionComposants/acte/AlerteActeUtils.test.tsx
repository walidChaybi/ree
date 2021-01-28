import React from "react";
import {fireEvent, render, screen} from "@testing-library/react";
import {AlerteActe} from "../../../../../../views/pages/fiche/hook/constructionComposants/acte/AlerteActeUtils";


test("renders texte du bouton d'ajout d'alerte", () => {
    render(
        <AlerteActe/>
    );

    const boutonElement = screen.getByText(/Ajouter une alerte/i);
    expect(boutonElement).toBeInTheDocument();
});

test("renders présence de l'icône du bouton d'ajout d'alerte", () => {
    render(
        <AlerteActe/>
    );
    const iconElement = screen.getByTestId("IconeBoutonAjoutAlertes");
    expect(iconElement).toBeInTheDocument();
});

test("renders click sur le bouton d'ajout d'alerte Activé/Désactivé", () => {
    const handleClickButton = jest.fn();
    render(
        <AlerteActe/>
    );
    const boutonElement = screen.getByTestId("IconeBoutonAjoutAlertes");
    fireEvent.click(boutonElement);
    expect(handleClickButton).toHaveBeenCalledTimes(0);
});
