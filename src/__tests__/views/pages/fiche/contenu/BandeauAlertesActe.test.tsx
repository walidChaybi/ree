import { BandeauAlertesActe } from "@pages/fiche/contenu/BandeauAlertesActe";
import { render, screen } from "@testing-library/react";
import React from "react";

test("render texte du bouton d'ajout d'alerte", () => {
  render(
    <BandeauAlertesActe
      alertes={[]}
      ajoutAlertePossible={false}
      ajouterAlerteCallBack={jest.fn()}
      supprimerAlerteCallBack={jest.fn()}
      afficherBouton={true}
    />
  );
  const boutonElement = screen.getByText("Ajouter une alerte");
  expect(boutonElement).toBeInTheDocument();
});
