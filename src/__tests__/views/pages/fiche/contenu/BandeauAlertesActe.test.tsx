import { BandeauAlertesActe } from "@pages/fiche/contenu/BandeauAlertesActe";
import { render, screen } from "@testing-library/react";
import { expect, test, vi } from "vitest";

test("render texte du bouton d'ajout d'alerte", () => {
  render(
    <BandeauAlertesActe
      alertes={[]}
      ajouterAlerteCallBack={vi.fn()}
      supprimerAlerteCallBack={vi.fn()}
      afficherBouton={true}
    />
  );
  const boutonElement = screen.getByText("Ajouter une alerte");
  expect(boutonElement).toBeDefined();
});
