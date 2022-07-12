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
import { userDroitCreerActeEtabliPerimetreMEAE } from "../../../mock/data/connectedUserAvecDroit";
import { configRequetesCreation } from "../../../mock/superagent-config/superagent-mock-requetes-creation";
import { TypeRequete } from "../../../model/requete/enum/TypeRequete";
import { getUrlWithParam } from "../../../views/common/util/route/routeUtil";
import { storeRece } from "../../../views/common/util/storeRece";
import BoutonPrendreEnChargePlusAncienneCreation from "../../../views/pages/requeteCreation/EspaceCreation/BoutonPrendreEnChargePlusAncienneCreation";
import {
  URL_MES_REQUETES_CREATION,
  URL_MES_REQUETES_CREATION_APERCU_REQUETE_ID
} from "../../../views/router/ReceUrls";

const superagentMock = require("superagent-mock")(
  request,
  configRequetesCreation
);

test("Attendu: BoutonPrendreEnChargeAleatoirement fonctionne correctement dans l'espace création", async () => {
  const history = createMemoryHistory();
  storeRece.utilisateurCourant = userDroitCreerActeEtabliPerimetreMEAE;
  history.push(URL_MES_REQUETES_CREATION);
  render(
    <Router history={history}>
      <BoutonPrendreEnChargePlusAncienneCreation
        typeRequete={TypeRequete.CREATION}
      />
    </Router>
  );

  const bouttonPrendreEnCharge = screen.getByText(
    "Prendre en charge requête suivante"
  ) as HTMLButtonElement;

  await waitFor(() => {
    expect(bouttonPrendreEnCharge.disabled).toBeFalsy();
  });

  await act(async () => {
    fireEvent.click(bouttonPrendreEnCharge);
  });

  await waitFor(() => {
    expect(history.location.pathname).toBe(
      getUrlWithParam(
        URL_MES_REQUETES_CREATION_APERCU_REQUETE_ID,
        "54ddf213-d9b7-4747-8e92-68c220f66de3"
      )
    );
  });
});

afterAll(() => {
  superagentMock.unset();
});
