import { AlertesActes } from "@composant/alertesActe/AlertesActes";
import { TypeAlerte } from "@model/etatcivil/enum/TypeAlerte";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { act } from "react";
import { describe, expect, test, vi } from "vitest";
import { elementAvecContexte } from "../../../../__tests__utils__/testsUtil";
import { TYPE_ALERTE } from "../../../../mock/data/NomenclatureTypeAlerte";
import { userDroitCOMEDEC } from "../../../../mock/data/mockConnectedUserAvecDroit";
import requeteDelivrance from "../../../../mock/data/requeteDelivrance";

describe("Test de AlertesActes", () => {
  TypeAlerte.init(TYPE_ALERTE);

  test("render texte du bouton d'ajout d'alerte", async () => {
    render(
      elementAvecContexte(
        <AlertesActes
          detailRequete={requeteDelivrance}
          ajoutAlerte={vi.fn()}
          addActe={{
            isChecked: true,
            idActe: "b41079a5-9e8d-478c-b04c-c4c2ac67134f"
          }}
        />,
        userDroitCOMEDEC
      )
    );

    await waitFor(() => {
      expect(screen.getByText("Alertes et informations")).toBeDefined();
      expect(screen.getAllByTitle("Supprimer l'alerte")[0]).toBeDefined();
    });

    act(() => fireEvent.click(screen.getAllByTitle("Supprimer l'alerte")[0]));

    await waitFor(() => {
      expect(screen.getByText("Alertes et informations")).toBeDefined();
    });
  });
});
