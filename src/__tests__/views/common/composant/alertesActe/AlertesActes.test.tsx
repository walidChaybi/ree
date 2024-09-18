import { AlertesActes } from "@composant/alertesActe/AlertesActes";
import { userDroitCOMEDEC } from "@mock/data/mockConnectedUserAvecDroit";
import requeteDelivrance from "@mock/data/requeteDelivrance";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { storeRece } from "@util/storeRece";
import { beforeAll, expect, test, vi } from "vitest";

beforeAll(() => {
  storeRece.utilisateurCourant = userDroitCOMEDEC;
});

test("render texte du bouton d'ajout d'alerte", async () => {
  render(
    <AlertesActes
      detailRequete={requeteDelivrance}
      ajoutAlerte={vi.fn()}
      addActe={{
        isChecked: true,
        idActe: "b41079a5-9e8d-478c-b04c-c4c2ac67134f"
      }}
    />
  );

  await waitFor(() => {
    expect(screen.getByText("Alertes et informations")).toBeDefined();
    expect(screen.getAllByTitle("Supprimer l'alerte")[0]).toBeDefined();
  });

  fireEvent.click(screen.getAllByTitle("Supprimer l'alerte")[0]);

    waitFor(() => {
      expect(screen.getByText("Alertes et informations")).toBeDefined();
    });
});
