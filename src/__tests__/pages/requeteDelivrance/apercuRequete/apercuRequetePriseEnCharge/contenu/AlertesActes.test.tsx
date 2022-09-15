import { AlertesActes } from "@composant/alertesActe/AlertesActes";
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor
} from "@testing-library/react";
import { storeRece } from "@util/storeRece";
import React from "react";
import request from "superagent";
import { userDroitCOMEDEC } from "../../../../../../mock/data/connectedUserAvecDroit";
import requeteDelivrance from "../../../../../../mock/data/requeteDelivrance";
import { configEtatcivil } from "../../../../../../mock/superagent-config/superagent-mock-etatcivil";

const superagentMock = require("superagent-mock")(request, [
  configEtatcivil[0]
]);

beforeAll(() => {
  storeRece.utilisateurCourant = userDroitCOMEDEC;
});

afterAll(() => {
  superagentMock.unset();
});

test("render texte du bouton d'ajout d'alerte", async () => {
  render(
    <AlertesActes
      detailRequete={requeteDelivrance}
      ajoutAlerte={jest.fn()}
      ajoutAlertePossible={true}
      addActe={{
        isChecked: true,
        idActe: "b41079a5-9e8d-478c-b04c-c4c2ac67134f"
      }}
    />
  );

  await waitFor(() => {
    expect(screen.getByText("Alertes et informations")).toBeDefined();
  });

  act(() => {
    fireEvent.click(screen.getAllByTitle("Supprimer l'alerte")[0]);
  });

  await waitFor(() => {
    expect(screen.getByText("Alertes et informations")).toBeDefined();
  });
});
