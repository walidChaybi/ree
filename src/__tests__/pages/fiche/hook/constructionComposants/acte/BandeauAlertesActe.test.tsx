import { render, screen } from "@testing-library/react";
import React from "react";
import { BandeauAlertesActe } from "../../../../../../views/pages/fiche/contenu/BandeauAlertesActe";

test("renders texte du bouton d'ajout d'alerte", () => {
  render(
    <BandeauAlertesActe
      alertes={[]}
      ajoutAlertePossible={false}
      ajouterAlerteCallBack={() => {}}
      supprimerAlerteCallBack={() => {}}
    />
  );
  const boutonElement = screen.getByText(/Ajouter une alerte/i);
  expect(boutonElement).toBeInTheDocument();
});
