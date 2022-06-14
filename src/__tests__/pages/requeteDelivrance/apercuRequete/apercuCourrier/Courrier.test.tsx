import {
  act,
  fireEvent,
  render,
  screen,
  waitFor
} from "@testing-library/react";
import React from "react";
import request from "superagent";
import { userDroitnonCOMEDEC } from "../../../../../mock/data/connectedUserAvecDroit";
import { LISTE_UTILISATEURS } from "../../../../../mock/data/ListeUtilisateurs";
import { requeteDelivranceRDC } from "../../../../../mock/data/requeteDelivrance";
import { configComposition } from "../../../../../mock/superagent-config/superagent-mock-composition";
import { configRequetes } from "../../../../../mock/superagent-config/superagent-mock-requetes";
import { DocumentDelivrance } from "../../../../../model/requete/enum/DocumentDelivrance";
import { storeRece } from "../../../../../views/common/util/storeRece";
import { Courrier } from "../../../../../views/pages/requeteDelivrance/apercuRequete/apercuCourrier/contenu/Courrier";

const superagentMock = require("superagent-mock")(request, [
  configRequetes[0],
  configComposition[0]
]);

beforeAll(() => {
  storeRece.listeUtilisateurs = LISTE_UTILISATEURS;
  storeRece.utilisateurCourant = userDroitnonCOMEDEC;
  DocumentDelivrance.init();
});

test("renders courrier", async () => {
  await act(async () => {
    render(
      <Courrier
        requete={requeteDelivranceRDC}
        handleDocumentEnregistre={jest.fn()}
      />
    );
  });

  const boutonValider = screen.getByText(/Valider/i) as HTMLButtonElement;
  const inputCourrier = screen.getByTestId("choixCourrier.courrier")
    .childNodes[0] as HTMLSelectElement;

  await waitFor(() => {
    expect(screen.getAllByText(/Modification du courrier/i)).toBeDefined();
    expect(screen.getByText(/Numéro, type et nom de la voie/i)).toBeDefined();
    expect(screen.getByText(/Nombre d'exemplaires/i)).toBeDefined();
    expect(boutonValider).toBeDefined();
    expect(screen.getByText(/Réinitialiser/i)).toBeDefined();
    expect(inputCourrier).toBeDefined();
  });

  expect(boutonValider.disabled).toBeFalsy();

  fireEvent.change(inputCourrier, {
    target: { value: "4b60aab4-2e9f-479c-bec6-f38edbd6e647" }
  });

  await act(async () => {
    fireEvent.click(screen.getByText(/Valider/i));
  });

  expect(
    screen.getByText(
      "Le choix d'une option standard est obligatoire pour ce courrier"
    )
  ).toBeDefined();
});

test("créer courrier", async () => {
  await act(async () => {
    render(
      <Courrier
        requete={requeteDelivranceRDC}
        handleDocumentEnregistre={jest.fn()}
      />
    );
  });

  await act(async () => {
    fireEvent.doubleClick(
      screen.getByText(
        "Arrondissement d'Alger (événement entre le 24/04/1959 et le 31/12/1962)"
      )
    );
  });

  await act(async () => {
    fireEvent.click(screen.getByText(/Valider/i));
  });
});

afterAll(() => {
  superagentMock.unset();
});
