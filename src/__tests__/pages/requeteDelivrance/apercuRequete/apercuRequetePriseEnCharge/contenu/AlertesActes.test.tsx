import { AlertesActes } from "@composant/alertesActe/AlertesActes";
import { render, screen } from "@testing-library/react";
import React from "react";
import requeteDelivrance from "../../../../../../mock/data/requeteDelivrance";

test("render texte du bouton d'ajout d'alerte", () => {
  render(
    <AlertesActes
      detailRequete={requeteDelivrance}
      idActes={["b41079a5-9e8d-478c-b04c-c4c4ey86537g"]}
      setAlertesParent={jest.fn()}
      ajoutAlertePossible={true}
    />
  );
  const boutonElement = screen.getByText("Alertes et informations");
  expect(boutonElement).toBeDefined();
});
