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
import {
  DataRMCActeAvecResultat,
  DataTableauActe
} from "../../../../../mock/data/RMCActe";
import {
  DataRMCInscriptionAvecResultat,
  DataTableauInscription
} from "../../../../../mock/data/RMCInscription";
import {
  configEtatcivil,
  NORESULT
} from "../../../../../mock/superagent-config/superagent-mock-etatcivil";
import { ApercuRequetePriseEnChargePartieDroite } from "../../../../../views/pages/apercuRequete/apercuRequeteEnpriseEnCharge/contenu/ApercuRequetePriseEnChargePartieDroite";

const superagentMock = require("superagent-mock")(request, configEtatcivil);

test("render ApercuRequetePriseEnChargePartieDroite", async () => {
  const history = createMemoryHistory();

  await act(async () => {
    render(
      <Router history={history}>
        <ApercuRequetePriseEnChargePartieDroite
          detailRequete={requeteDelivrance}
          dataRMCAutoActe={DataRMCActeAvecResultat}
          dataTableauRMCAutoActe={DataTableauActe}
          dataRMCAutoInscription={DataRMCInscriptionAvecResultat}
          dataTableauRMCAutoInscription={DataTableauInscription}
        />
      </Router>
    );
  });

  await act(async () => {
    const linkElement = screen.getByText("Nouvelle recherche multi-critères");
    expect(linkElement).toBeInTheDocument();
    fireEvent.click(linkElement);
  });

  const dialog = screen.getByRole("dialog");
  const nomTitulaire = screen.getByLabelText(
    "titulaire.nom"
  ) as HTMLInputElement;
  const boutonRechercher = screen.getByText("Rechercher") as HTMLButtonElement;

  await waitFor(() => {
    expect(dialog).toBeInTheDocument();
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
    expect(dialog).not.toBeInTheDocument();
    const resultatRMCActe = screen.getByText("Aucun acte n'a été trouvé");
    const resultatRMCInscription = screen.getByText(
      "Aucune inscription n'a été trouvée"
    );
    expect(resultatRMCActe).toBeInTheDocument();
    expect(resultatRMCInscription).toBeInTheDocument();
  });
});

afterAll(() => {
  superagentMock.unset();
});
