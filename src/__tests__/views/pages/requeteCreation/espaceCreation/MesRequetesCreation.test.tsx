import { IQueryParametersPourRequetes } from "@api/appels/requeteApi";
import { userDroitCreerActeTranscritPerimetreMEAE } from "@mock/data/connectedUserAvecDroit";
import { MesRequetesCreation } from "@pages/requeteCreation/espaceCreation/MesRequetesCreation";
import { statutsRequetesCreation } from "@pages/requeteCreation/espaceCreation/params/EspaceCreationParams";
import { URL_MES_REQUETES_CREATION } from "@router/ReceUrls";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { storeRece } from "@util/storeRece";
import { NB_LIGNES_PAR_APPEL_DEFAUT } from "@widget/tableau/TableauRece/TableauPaginationConstantes";
import { createMemoryHistory } from "history";
import React from "react";
import { act } from "react-dom/test-utils";
import { Router } from "react-router-dom";

const history = createMemoryHistory();
history.push(URL_MES_REQUETES_CREATION);

storeRece.utilisateurCourant = userDroitCreerActeTranscritPerimetreMEAE;

const queryParametersPourRequetes = {
  statuts: statutsRequetesCreation,
  tri: "dateCreation",
  sens: "ASC",
  range: `0-${NB_LIGNES_PAR_APPEL_DEFAUT}`
} as IQueryParametersPourRequetes;

test("Doit rendre le tableau des requêtes création", async () => {
  act(() => {
    render(
      <Router history={history}>
        <MesRequetesCreation
          queryParametersPourRequetes={queryParametersPourRequetes}
        />
      </Router>
    );
  });

  await waitFor(() => {
    expect(screen.getByText("N°")).toBeDefined();
    expect(screen.getByText("Sous-type")).toBeDefined();
    expect(screen.getByText("Postulant/Déclarant")).toBeDefined();
    expect(screen.getByText("Requérant")).toBeDefined();
    expect(screen.getByText("Initialisation")).toBeDefined();
    expect(screen.getByText("Dernière action")).toBeDefined();
    expect(screen.getByText("Statut")).toBeDefined();
  });
});

test("DOIT passer dans la fonction onClickOnLine QUAND je click sur une requête", async () => {
  act(() => {
    render(
      <Router history={history}>
        <MesRequetesCreation
          queryParametersPourRequetes={queryParametersPourRequetes}
        />
      </Router>
    );
  });

  let requete: HTMLElement;

  await waitFor(() => {
    requete = screen.getByText("IWSZGB / 46478614");
    fireEvent.click(requete);
  });
});
