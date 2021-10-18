import {
  act,
  fireEvent,
  render,
  screen,
  waitFor
} from "@testing-library/react";
import { createMemoryHistory } from "history";
import React from "react";
import { Router } from "react-router-dom";
import request from "superagent";
import requeteDelivrance from "../../../../../mock/data/requeteDelivrance";
import { idRequeteRDCSC } from "../../../../../mock/data/RequeteV2";
import { DataRMCRequeteAvecResultat } from "../../../../../mock/data/RMCRequete";
import {
  configRequetesV2,
  NORESULT
} from "../../../../../mock/superagent-config/superagent-mock-requetes-v2";
import { TypePieceJustificative } from "../../../../../model/requete/v2/enum/TypePieceJustificative";
import { ApercuRequetePriseEnChargePartieGauche } from "../../../../../views/pages/apercuRequete/apercuRequeteEnpriseEnCharge/contenu/ApercuRequetePriseEnChargePartieGauche";

const superagentMock = require("superagent-mock")(request, configRequetesV2);

beforeEach(() => {
  TypePieceJustificative.init();
});

const history = createMemoryHistory();

test("render ApercuRequetePriseEnChargePartieGauche", async () => {
  await act(async () => {
    render(
      <Router history={history}>
        <ApercuRequetePriseEnChargePartieGauche
          idRequete={idRequeteRDCSC}
          detailRequete={requeteDelivrance}
          dataRequetes={DataRMCRequeteAvecResultat}
          openFenetre={jest.fn()}
        />
      </Router>
    );
  });

  const boutonNouvelleRMC = screen.getByLabelText(
    "NouvelleRMCRequete"
  ) as HTMLButtonElement;
  expect(boutonNouvelleRMC).toBeInTheDocument();

  await act(async () => {
    fireEvent.click(boutonNouvelleRMC);
  });

  const popinNouvelleRMC = screen.getByRole("dialog", {
    hidden: true
  });
  const nomTitulaire = screen.getByLabelText(
    "titulaire.nom"
  ) as HTMLInputElement;
  const boutonRechercher = screen.getByText("Rechercher") as HTMLButtonElement;

  await waitFor(() => {
    expect(popinNouvelleRMC).toBeInTheDocument();
    expect(nomTitulaire).toBeInTheDocument();
    expect(boutonRechercher).toBeInTheDocument();
    expect(boutonRechercher.disabled).toBeTruthy();
  });

  await act(async () => {
    fireEvent.change(nomTitulaire, {
      target: { value: NORESULT }
    });
  });

  await waitFor(() => {
    expect(nomTitulaire.value).toEqual(NORESULT);
  });

  await act(async () => {
    expect(boutonRechercher.disabled).toBeFalsy();
    fireEvent.click(boutonRechercher);
  });

  await waitFor(() => {
    expect(popinNouvelleRMC).not.toBeInTheDocument();
    expect(screen.getByText("Aucune requête n'a été trouvée")).toBeDefined();
  });
});

afterAll(() => {
  superagentMock.unset();
});
