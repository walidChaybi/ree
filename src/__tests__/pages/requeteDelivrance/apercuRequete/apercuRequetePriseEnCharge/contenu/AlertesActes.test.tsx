import { render, screen } from "@testing-library/react";
import React from "react";
import { Alertes } from "../../../../../../mock/data/Alertes";
import { AlertesActes } from "../../../../../../views/pages/requeteDelivrance/apercuRequete/apercuRequeteEnpriseEnCharge/contenu/alertesActes/AlertesActes";

test("render texte du bouton d'ajout d'alerte", () => {
  render(
    <AlertesActes
      alertes={new Map([["fakeId", Alertes]])}
      ajoutAlertePossible={false}
      ajouterAlerteCallBack={jest.fn()}
      supprimerAlerteCallBack={jest.fn()}
    />
  );
  const boutonElement = screen.queryByText("Ajouter une alerte");
  expect(boutonElement).toBeInTheDocument();
});
